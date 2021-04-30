import { Application } from 'pixi.js';
import storage from './utils/storage.js';
import Game from './game/Game';

export default class PixiApp {
  init(htmlElement) {
    this.htmlElement = htmlElement;
    this.width = htmlElement.clientWidth;
    this.height = htmlElement.clientHeight;
    this.setupGame();
    this.start();
  }

  setupGame() {
    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0xffffff,
    });

    storage.app = this.app;
    storage.height = this.height;
    storage.width = this.width;

    this.htmlElement.appendChild(this.app.view);
    this.display = this.app.stage;
  }

  start() {
    this.game = new Game(this.display);
    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    this.game.update();
  }

  // onResize = () => {
  //   const parent = this.app.view.parentNode;
  //   if (this.app) {
  //     this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
  //   }
  // };
}
