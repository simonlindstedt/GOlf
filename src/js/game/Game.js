import Matter from 'matter-js';
import Ball from './Ball';
import Wall from './Wall';
import * as PIXI from 'pixi.js';
import { Sprite, Texture } from 'pixi.js';
import grassImage from 'url:~src/js/game/assets/textures/grass.jpeg';
import Hole from './Hole.js';

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
      backgroundColor: 0xffffff,
    });
    this.engine = Matter.Engine.create();
    this.engine.gravity = {
      x: 0,
      y: 0,
    };
    this.addBodies();
    this.setupEvents();
  }

  addBodies() {
    const grass = Sprite.from(Texture.from(grassImage));
    grass.width = this.width;
    grass.height = this.height;
    this.app.stage.addChild(grass);

    // this.ball = new Ball(100, 100, 100);
    // this.app.stage.addChild(this.ball.sprite);

    this.wall = new Wall(200, 200, 100, 10, 0, 0.5);
    this.app.stage.addChild(this.wall.sprite);

    this.hole = new Hole(400, 100, 25);
    this.app.stage.addChild(this.hole.sprite);

    this.ball = new Ball(100, 100, 20);
    this.app.stage.addChild(this.ball.sprite);
    this.app.stage.addChild(this.ball.powerDisplay);
    this.app.stage.addChild(this.ball.aimLine);

    Matter.World.add(this.engine.world, [this.ball.body, this.wall.body]);
    console.log(this.hole.sprite);
  }

  setupEvents() {
    this.mouseDown = false;
    this.mousePos = { x: 0, y: 0 };

    window.addEventListener('mousedown', () => {
      this.mouseDown = true;
    });

    window.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.x;
      this.mousePos.y = e.y;
      this.ball.distanceFromMouse(this.mousePos);
    });

    window.addEventListener('mouseup', () => {
      this.mouseDown = false;
      this.ball.shoot(this.mousePos);
    });
  }

  start(debug, stats) {
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
      if (stats) debugRenderer.options.showDebug = true;
    }
    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    Matter.Engine.update(this.engine);
    this.ball.moveBall();
    this.ball.drawAimDisplay(this.mousePos, this.mouseDown);
    this.ball.isInHole(this.hole, this.engine);
  }
}
