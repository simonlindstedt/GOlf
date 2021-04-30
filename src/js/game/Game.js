import Matter from 'matter-js';
import Ball from './Ball';
import * as PIXI from 'pixi.js';

export default class Game {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      backgroundAlpha: 0.1,
    });
    this.engine = Matter.Engine.create();
    this.addBodies();
  }

  addBodies() {
    this.ball = new Ball(100, 100, 100);
    this.app.stage.addChild(this.ball.sprite);
    Matter.World.add(this.engine.world, this.ball.body);
  }

  setupEvents() {}

  start(debug) {
    document.body.appendChild(this.app.view);
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
    }
    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    Matter.Engine.update(this.engine);
    this.ball.moveBall();
  }
}
