import Game from './js/game/Game';

const gameWrapper = document.querySelector('div#game-wrapper');

const debug = false;
const stats = false;
const game = new Game(gameWrapper.clientWidth, gameWrapper.clientHeight);

game.start(debug, stats);
