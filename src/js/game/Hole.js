import Matter from 'matter-js';
import PIXI, { Sprite, Texture } from 'pixi.js';
import hole from 'url:~src/js/game/assets/textures/hole.png';

export default class Hole {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.sprite = Sprite.from(Texture.from(hole));
    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;
    this.sprite.height = this.radius * 2;
    this.sprite.width = this.radius * 2;
    this.sprite.anchor.set(0.5);
  }
}
