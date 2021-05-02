import Matter from 'matter-js';
import PIXI, { Sprite, Texture } from 'pixi.js';
import hole from 'url:~src/js/game/assets/textures/hole.png';

export default class Hole {
  constructor(x, y, radius) {
    this.sprite = Sprite.from(Texture.from(hole));
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.height = radius * 2;
    this.sprite.width = radius * 2;
    this.sprite.anchor.set(0.5);
  }
}
