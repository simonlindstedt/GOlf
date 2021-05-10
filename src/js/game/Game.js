import Matter from 'matter-js';
import Ball from './Ball';
import * as PIXI from 'pixi.js';
import Hole from './Hole.js';
import Map from './Map';
import FlatBall from './FlatBall';

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
      this.app.stage.addChild(this.map.sprites[i]);
    }

    for (let i = 0; i < this.map.bodies.length; i++) {
      Matter.World.add(this.engine.world, [this.map.bodies[i]]);
    }

    this.hole = new Hole(
      this.map.holeSettings.x,
      this.map.holeSettings.y,
      this.map.holeSettings.r
    );
    this.app.stage.addChild(this.hole.sprite);

    this.ball = new FlatBall(
      this.map.ballSettings.x,
      this.map.ballSettings.y,
      15,
      { restitution: 1 }
    );
    this.app.stage.addChild(this.ball.graphic);
    this.app.stage.addChild(this.ball.powerDisplay);
    this.app.stage.addChild(this.ball.aimLine);

    Matter.World.add(this.engine.world, [this.ball.body]);
  }

  setupEvents() {
    this.ballDown = false;
    this.mousePos = { x: 0, y: 0 };

    this.ball.graphic.on('mousedown', () => {
      this.ballDown = true;
    });

    this.app.view.addEventListener('mousemove', (e) => {
      this.mousePos = {
        x: e.offsetX / this.app.stage.scale.x,
        y: e.offsetY / this.app.stage.scale.y,
      };
      this.ball.distanceFromMouse(this.mousePos);
    });

    this.app.view.addEventListener('mouseup', () => {
      if (this.ballDown) {
        this.ballDown = false;
        this.ball.shoot(this.mousePos);
      }
    });

    const zoomIn = document.querySelector('button#zoomIn');
    const zoomOut = document.querySelector('button#zoomOut');

    zoomIn.addEventListener('click', () => {
      this.app.stage.scale.x *= 1.5;
      this.app.stage.scale.y *= 1.5;
    });
    zoomOut.addEventListener('click', () => {
      this.app.stage.scale.x /= 1.5;
      this.app.stage.scale.y /= 1.5;
    });

    window.addEventListener('resize', () => {
      const parent = this.app.view.parentNode;
      const ratio = Math.min(
        parent.clientWidth / this.width,
        parent.clientHeight / this.height
      );
      this.app.stage.scale.x = this.app.stage.scale.y = ratio;
      // this.app.renderer.resize(
      //   Math.ceil(this.width * ratio),
      //   Math.ceil(this.height * ratio)
      // );
      this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    });
  }

  start(debug, stats) {
    // document.body.appendChild(this.app.view);
    const gameWrapper = document.querySelector('div#game-wrapper');
    gameWrapper.appendChild(this.app.view);
    if (debug) {
      const debugRenderer = Matter.Render.create({
        engine: this.engine,
        element: document.body,
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
    Matter.Engine.update(this.engine);
    this.ball.moveBall();
    this.ball.drawAimDisplay(this.mousePos, this.ballDown);
    this.ball.isInHole(this.hole, this.engine);
  }
}
