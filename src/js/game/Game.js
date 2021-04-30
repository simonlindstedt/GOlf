import Matter from 'matter-js';
import Ball from './Ball';
import Wall from './Wall';
import * as PIXI from 'pixi.js';
import { Sprite, Texture } from 'pixi.js';
import grassImage from 'url:~src/js/game/assets/textures/grass.jpeg';

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
    const grass = Sprite.from(Texture.from(grassImage));
    grass.width = this.width;
    grass.height = this.height;
    this.app.stage.addChild(grass);

    this.ball = new Ball(100, 100, 100);
    this.app.stage.addChild(this.ball.sprite);

    this.wall = new Wall(200, 200, 100, 10, 0, 0.5);
    this.app.stage.addChild(this.wall.sprite);

    Matter.World.add(this.engine.world, [this.ball.body, this.wall.body]);
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