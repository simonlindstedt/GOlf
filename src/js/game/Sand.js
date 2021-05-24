import { Sprite, Texture } from 'pixi.js';
import sand from 'url:~src/js/game/assets/textures/sand.png';

export default class Sand {
  constructor(x, y, width, height) {
    //Sprite
    this.sprite = Sprite.from(Texture.from(sand));
    this.sprite.anchor.set(0.5);
    this.sprite.height = height;
    this.sprite.width = width;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
  }
}
