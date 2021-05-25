import Matter from 'matter-js';
import { Sprite, Texture } from 'pixi.js';
import wood from 'url:~src/js/game/assets/textures/wood.jpg';

export default class Wall {
  constructor(x, y, width, height, angle, restitution, isStatic, isYrgo) {
    if (isStatic || isYrgo) {
      this.sprite = Sprite.from(Texture.WHITE);
      if (isYrgo) this.sprite.tint = 0xef1d30;
    } else {
      this.sprite = Sprite.from(Texture.from(wood));
    }

    this.height = height;
    this.width = width;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.restitution = restitution;
    this.isStatic = isStatic;

    this.sprite.anchor.set(0.5);
    this.sprite.height = this.height;
    this.sprite.width = this.width;
    this.sprite.angle = this.angle;
    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    //Body
    this.body = Matter.Bodies.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      {
        angle: this.angle * (Math.PI / 180),
        restitution: isYrgo ? 2 : this.restitution,
        isStatic: this.isStatic,
        frictionAir: isYrgo ? 0.000001 : 0.04,
        friction: 0.001,
        density: isYrgo ? 0.000005 : 0.0005,
      }
    );
  }
  moveWall() {
    if (!this.isStatic) {
      this.sprite.position.x = this.body.position.x;
      this.sprite.position.y = this.body.position.y;
      this.sprite.angle = this.body.angle * (180 / Math.PI);
    }
  }
}
