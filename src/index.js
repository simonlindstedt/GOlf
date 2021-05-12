import Game from './js/game/Game';

const gameWrapper = document.querySelector('div#game-wrapper');

const debug = false;
const stats = false;
const game = new Game(gameWrapper, window.localStorage.level | 1);

game.start(debug, stats);
