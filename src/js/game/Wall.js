import Matter from 'matter-js';
import { Sprite, Texture } from 'pixi.js';
import wallPng from 'url:~src/js/game/assets/textures/white.png';

export default class Wall {
  constructor(
    x,
    y,
    width,
    height,
    angle,
    restitution,
    isStatic,
    image = wallPng
  ) {
    //Sprite
    this.sprite = Sprite.from(Texture.from(image));
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
        restitution: this.restitution,
        isStatic: this.isStatic,
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
