import * as PIXI from 'pixi.js';
import PixiApp from './js/pixi-app';
import Matter from 'matter-js';
import Game from './js/game/Game';

const app = new PIXI.Application({
  width: 800,
  height: 800,
  backgroundAlpha: 0.1,
});

const game = new Game(app.stage);
const render = Matter.Render.create({
  engine: game.engine,
  element: document.body,
  options: {
    height: 800,
    width: 800,
    wireframeBackground: 'transparent',
  },
});
Matter.Render.run(render);
app.ticker.add(() => {
  game.update();
});

document.body.appendChild(app.view);

// window.onload = () => {
//   const gameContainer = document.querySelector('.game');
//   const game = new PixiApp(gameContainer);
//   game.init(gameContainer);
// };
