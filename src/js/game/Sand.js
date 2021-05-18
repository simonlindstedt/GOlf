import { Sprite, Texture } from 'pixi.js';
import sand from 'url:~src/js/game/assets/textures/sand.png';

export default class Sand {
  constructor(x, y, width, height) {
    //Sprite
    this.sprite = Sprite.from(Texture.from(sand));
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.sprite.anchor.set(0.5);
    this.sprite.height = this.height;
    this.sprite.width = this.width;
    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;
  }
}
