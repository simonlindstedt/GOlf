import Matter from 'matter-js';
import Ball from './Ball';
import * as PIXI from 'pixi.js';
import Hole from './Hole.js';
import Map from './Map';
import FlatBall from './FlatBall';
import { Viewport } from 'pixi-viewport';

export default class Game {
  constructor(w, h) {
    this.width = w;
    this.height = h;
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
    this.map = new Map();
    this.map.renderMap('1');
    this.addBodies();
    this.setupEvents();
  }

  addBodies() {
    for (let i = 0; i < this.map.sprites.length; i++) {
      this.viewport.addChild(this.map.sprites[i]);
    }

    for (let i = 0; i < this.map.bodies.length; i++) {
      // Matter.World.add(this.engine.world, [this.map.bodies[i]]);
      Matter.Composite.add(this.engine.world, [this.map.bodies[i]]);
    }

    this.hole = new Hole(
      this.map.holeSettings.x,
      this.map.holeSettings.y,
      this.map.holeSettings.r
    );

    this.viewport.addChild(this.hole.sprite);

    this.ball = new FlatBall(
      this.map.ballSettings.x,
      this.map.ballSettings.y,
      15,
      { restitution: 1 }
    );

    this.viewport.addChild(this.ball.graphic);
    this.viewport.addChild(this.ball.powerDisplay);
    this.viewport.addChild(this.ball.aimLine);

    // Matter.World.add(this.engine.world, [this.ball.body]);
    Matter.Composite.add(this.engine.world, [this.ball.body]);
  }

  setupEvents() {
    this.ballDown = false;
    this.mousePos = { x: 0, y: 0 };

    this.ball.graphic.on('pointerdown', () => {
      this.ballDown = true;
      this.viewport.plugins.pause('drag');
    });

    this.viewport.on('pointermove', (e) => {
      this.mousePos = {
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

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  start(debug, stats) {
    // document.body.appendChild(this.app.view);
    const gameWrapper = document.querySelector('div#game-wrapper');
    const renderWrapper = document.querySelector('div#render-wrapper');
    gameWrapper.appendChild(this.app.view);
    this.app.stage.addChild(this.viewport);
    this.viewport.clampZoom({
      minScale: 0.5,
      maxScale: 2,
    });
    this.viewport.drag().pinch().wheel().decelerate();

    // const disableDrag = (t) => {
    //   if (t.ballDown) {
    //     t.viewport.drag({ pressDrag: false });
    //   }
    // };
    // const enableDrag = (t) => {
    //   if (!t.ballDown) {
    //     t.viewport.drag({ pressDrag: true });
    //   }
    // };
    // gameWrapper.addEventListener('mousedown', (e) => {
    //   disableDrag(this);
    // });
    // gameWrapper.addEventListener('mouseup', (e) => {
    //   enableDrag(this);
    // });

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

  handleResize() {
    const parent = this.app.view.parentNode;
    // const ratio = Math.min(
    //   parent.clientWidth / this.width,
    //   parent.clientHeight / this.height
    // );
    // this.app.stage.scale.x = this.app.stage.scale.y = ratio;
    // this.app.renderer.resize(
    //   Math.ceil(this.width * ratio),
    //   Math.ceil(this.height * ratio)
    // );
    this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
  }

  update() {
    Matter.Engine.update(this.engine);
    this.ball.moveBall();
    this.ball.drawAimDisplay(this.mousePos, this.ballDown);
    this.ball.isInHole(this.hole, this.engine);
  }
}
