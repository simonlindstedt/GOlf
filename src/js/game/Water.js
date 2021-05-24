import { Sprite, Texture } from 'pixi.js';
import water from 'url:~src/js/game/assets/textures/water.png';

export default class Water {
  constructor(x, y, width, height) {
    //Sprite
    this.sprite = Sprite.from(Texture.from(water));

    this.sprite.anchor.set(0.5);
    this.sprite.height = height;
    this.sprite.width = width;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }
}
