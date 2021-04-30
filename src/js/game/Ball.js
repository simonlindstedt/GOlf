import { Texture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import ballSprite from 'url:~src/js/game/assets/textures/ball.png';
import Matter from 'matter-js';

export default class Ball {
  constructor(x, y, r, options) {
    // this.graphic = new Graphics();
    this.sprite = Sprite.from(Texture.from(ballSprite));
    this.sprite.interactive = true;
    this.sprite.cursor = 'pointer';
    this.sprite.anchor.set(0.5);
    this.sprite.height = r * 2;
    this.sprite.width = r * 2;
    this.powerDisplay = new Graphics();
    this.aimLine = new Graphics();
    this.body = Matter.Bodies.circle(x, y, r, options);
  }

  drawTargetDisplay() {}

  moveBall() {
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
    this.sprite.rotation = this.body.angle;
  }
}
