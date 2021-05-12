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
    restitution = 0.5,
    isStatic = true,
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
    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    //Body
    this.body = Matter.Bodies.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      {
        restitution: this.restitution,
        isStatic: this.isStatic,
      }
    );
  }
}
