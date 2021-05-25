import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import Ball from './Ball';
import Hole from './Hole.js';
import Map from './Map';
import Wall from './Wall';
import Sand from './Sand';
import WinScreen from '../interface/WinScreen';
import Water from './Water';
import { fadeAway, resetAnimationClass } from './assets/Utility';

export default class Game {
  constructor(parentElement, level, strikeCount) {
    this.strikeCount = strikeCount;
    this.parentElement = parentElement;
    this.width = this.parentElement.clientWidth;
    this.height = this.parentElement.clientHeight;
    this.level = parseInt(level);
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0,
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
    this.winScreen = new WinScreen();
    this.strikes = 0;
    this.load();
    this.strikeCount.updateCurrentStrikes(this.strikes, this.level);
  }

  load() {
    // Clear
    this.viewport.removeChildren();
    Matter.Composite.clear(this.engine.world);

    // Load graphics, bodies and setup events
    if (this.paused) {
      this.paused = false;
    }
    this.map = new Map(this.level);
    this.addBodies();
    this.setupGameEvents();

    this.viewport.center = this.ball.body.position;
    this.viewport.scaled = 0.7;
  }

  addBodies() {
    // Sand
    this.sands = [];
    this.map.coords.sands?.forEach((s) => {
      const sand = new Sand(s.x, s.y, s.w, s.h);
      this.sands.push(sand);
      this.viewport.addChild(sand.sprite);
    });

    // Water
    this.waters = [];
    this.map.coords.waters?.forEach((w) => {
      const water = new Water(w.x, w.y, w.w, w.h);
      this.waters.push(water);
      this.viewport.addChild(water.sprite);
    });

    // Walls / Bounds
    this.walls = [];
    this.map.coords.walls.forEach((w) => {
      const wall = new Wall(
        w.x,
        w.y,
        w.w,
        w.h,
        w.a ?? 0,
        w.r ?? 0.5,
        w.s ?? 1,
        w.isYrgo ?? 0
      );
      this.walls.push(wall);
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
      this.viewport.plugins.pause('drag');
      if (this.ball.body.speed < 0.2) {
        this.ballDown = true;
      }
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
      this.viewport.plugins.resume('drag');
      if (this.ballDown) {
        this.ballDown = false;
        this.ball.shoot(this.mousePos);
        this.strikes++;
        this.strikeCount.updateCurrentStrikes(this.strikes, this.level);
      }
    });
  }

  start(debug, stats) {
    this.parentElement.appendChild(this.app.view);
    this.app.stage.addChild(this.viewport);
    this.viewport.clampZoom({
      minScale: 0.5,
      maxScale: 2,
    });

    this.viewport.drag().pinch().wheel().decelerate();

    this.handleResize = () => {
      this.app.renderer.resize(
        this.parentElement.clientWidth,
        this.parentElement.clientHeight
      );
      this.viewport.screenWidth = this.parentElement.clientWidth;
      this.viewport.screenHeight = this.parentElement.clientHeight;
    };

    window.addEventListener('resize', this.handleResize);

    if (debug) {
      const renderWrapper = document.createElement('div');
      renderWrapper.id = 'debug-container';
      const appContainer = document.querySelector('main#app-container');
      renderWrapper.style.position = 'absolute';
      renderWrapper.style.top = '0';
      renderWrapper.style.pointerEvents = 'none';
      appContainer.insertAdjacentElement('afterend', renderWrapper);
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

  cameraOutOfBounds(maxDistance) {
    const distance = Math.sqrt(
      Math.pow(this.viewport.center.x - this.ball.body.position.x, 2) +
        Math.pow(this.viewport.center.y - this.ball.body.position.y, 2)
    );
    return distance > maxDistance;
  }

  async update() {
    if (!this.paused) {
      if (this.cameraOutOfBounds(2000)) {
        this.viewport.animate({
          position: this.ball.body.position,
          time: 1500,
          ease: 'easeOutQuint',
        });
      }

      Matter.Engine.update(this.engine);
      this.ball.moveBall();
      this.walls.forEach((wall) => wall.moveWall());
      this.ball.drawAimDisplay(this.mousePos, this.ballDown);
      this.sands.forEach((sand) => this.ball.isInSand(sand));
      this.waters.forEach((water) => {
        if (this.ball.isInWater(water, this)) {
          this.strikes += 1;
        }
      });
      this.ball.isInHole(this.hole, this.engine);
      if (this.ball.inHole) {
        this.paused = true;
        this.winScreen.render(this.strikes, this.level + 1 > this.map.mapCount);
        this.strikeCount.updateTotalStrikes(this.strikes, this.level);
      }
    }
    if (this.winScreen.continue) {
      this.winScreen.continue = false;
      this.paused = false;
      this.strikes = 0;
      this.level++;
      if (this.level > this.map.mapCount) {
        this.level = 1;
      }
      this.load(this.level);
      this.strikeCount.updateCurrentStrikes(this.strikes, this.level);
      await fadeAway(this.winScreen.section);
      this.winScreen.remove();
    }
  }

  clear() {
    this.strikes = 0;
    this.viewport.removeChildren();
    Matter.Composite.clear(this.engine.world);
    this.app.destroy();
    document.querySelector('#game-wrapper').remove();
    if (document.querySelector('div#debug-container')) {
      document.querySelector('div#debug-container').remove();
    }
    window.removeEventListener('resize', this.handleResize);
  }
}
