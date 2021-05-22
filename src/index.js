import Game from './js/game/Game';
import GameWrapper from './js/interface/GameWrapper';
import Interface from './js/interface/Interface';

const interface = new Interface();
interface.init();

// const gameWrapper = new GameWrapper();
// gameWrapper.render();
// const game = new Game(gameWrapper.div, 7);
// game.start();

// const startMenu = new StartMenu();
// startMenu.Render();

// const gameWrapper = document.querySelector('div#game-wrapper');

// const startGame = document.createElement('button');
// startGame.addEventListener('click', () => {
//   console.log('start');
// });
// startGame.innerText = 'Start';
// document.body.appendChild(startGame);

// const gameWrapper = document.createElement('div');
// gameWrapper.id = 'game-wrapper';
// document.body.appendChild(gameWrapper);

// const debug = false;
// const stats = false;
// const game = new Game(gameWrapper, window.localStorage.level | 1);

// game.start(debug, stats);
