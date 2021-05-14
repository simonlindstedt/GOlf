import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Ball from './Ball';
import Hole from './Hole.js';
import Map from './Map';
import Wall from './Wall';

export default class Game {
  constructor(parentElement, level) {
    this.parentElement = parentElement;
    this.width = this.parentElement.clientWidth;
    this.height = this.parentElement.clientHeight;
    this.level = level;
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0x00ff00,
    });
    this.viewport = new Viewport({
      interaction: this.app.renderer.plugins.interaction,
    });
    this.engine = Matter.Engine.create();
    this.engine.gravity = {
      x: 0,
      y: 0,
    };
    this.paused = false;
    this.load();
  }

  load() {
    // Clear
    this.viewport.removeChildren();
    Matter.Composite.clear(this.engine.world);

    // Load graphics, bodies and setup events
    this.map = new Map(this.level);
    this.addBodies();
    this.setupGameEvents();
  }

  addBodies() {
    // Walls / Bounds
    this.map.coords.walls.forEach((w) => {
      const wall = new Wall(w.x, w.y, w.w, w.h);
      this.viewport.addChild(wall.sprite);
      Matter.Composite.add(this.engine.world, [wall.body]);
    });
    // Hole
    this.hole = new Hole(
      this.map.coords.hole.x,
      this.map.coords.hole.y,
      this.map.coords.hole.r
    );
    this.viewport.addChild(this.hole.sprite);
    // Ball
    this.ball = new Ball(this.map.coords.start.x, this.map.coords.start.y, 20, {
      restitution: 1,
    });
    this.viewport.addChild(this.ball.graphic);
    this.viewport.addChild(this.ball.powerDisplay);
    this.viewport.addChild(this.ball.aimLine);
    Matter.Composite.add(this.engine.world, [this.ball.body]);
  }

  setupGameEvents() {
    // clear events on each mapload?
    this.ballDown = false;
    this.mousePos = { x: 0, y: 0 };

    this.ball.graphic.on('pointerdown', () => {
      this.ballDown = true;
      this.viewport.plugins.pause('drag');
    });

    this.viewport.on('pointermove', (e) => {
      this.mousePos = {
        // Mouse coords relative to gameworld/viewport
        x: e.data.global.x / this.viewport.scaled + this.viewport.corner.x,
        y: e.data.global.y / this.viewport.scaled + this.viewport.corner.y,
      };
      this.ball.distanceFromMouse(this.mousePos);
    });

    this.viewport.on('pointerup', () => {
      if (this.ballDown) {
        this.ballDown = false;
        this.ball.shoot(this.mousePos);
        this.viewport.plugins.resume('drag');
      }
    });
  }

  start(debug, stats) {
    const renderWrapper = document.querySelector('div#render-wrapper');
    this.parentElement.appendChild(this.app.view);
    this.app.stage.addChild(this.viewport);
    this.viewport.clampZoom({
      minScale: 0.5,
      maxScale: 2,
    });

    this.viewport.drag().pinch().wheel().decelerate();

    window.addEventListener('resize', () => {
      this.app.renderer.resize(
        this.parentElement.clientWidth,
        this.parentElement.clientHeight
      );
    });

    if (debug) {
      const debugRenderer = Matter.Render.create({
        engine: this.engine,
        element: renderWrapper,
        options: {
          width: this.width,
          height: this.height,
          wireframeBackground: 'transparent',
        },
      });
      Matter.Render.run(debugRenderer);
      if (stats) debugRenderer.options.showDebug = true;
    }
    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    if (!this.paused) {
      Matter.Engine.update(this.engine);
      this.ball.moveBall();
      this.ball.drawAimDisplay(this.mousePos, this.ballDown);
      this.ball.isInHole(this.hole, this.engine);
      if (this.ball.inHole) {
        this.level += 1;
        if (this.level > 2) {
          this.level = 1;
        }
        // window.localStorage.level = this.level;
        this.load(this.level);
      }
    }
  }

  clear() {
    this.viewport.removeChildren();
    Matter.Composite.clear(this.engine.world);
    this.app.destroy();
    document.querySelector('#game-wrapper').remove();
  }
}
