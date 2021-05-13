import Game from './../game/Game';
import StartMenu from './StartMenu';
import SelectMap from './SelectMap';
import PauseMenu from './PauseMenu';
import GameWrapper from './GameWrapper';

export default class Interface {
  constructor() {
    this.parent = document.querySelector('main#app-container');
    this.components = {
      startMenu: new StartMenu(),
      selectMap: new SelectMap(),
      pauseMenu: new PauseMenu(),
      gameWrapper: new GameWrapper(),
    };
  }
  init() {
    this.clear();

    const loadMap = (e) => {
      console.log(this.components);
      this.components.selectMap.remove();
      this.components.gameWrapper.render();
      this.game = new Game(
        this.components.gameWrapper.div,
        e.target.dataset.map
      );
      this.game.start(false, false);
      this.components.pauseMenu.render(); // click / touch events doesn't workd
    };

    const selectMapScreen = () => {
      this.components.startMenu.remove();
      this.components.startMenu.startButton.removeEventListener(
        'click',
        selectMapScreen
      );
      this.components.selectMap.render(loadMap);
    };

    this.components.startMenu.render();
    this.components.startMenu.startButton.addEventListener(
      'click',
      selectMapScreen
    );
  }
  mapScreen() {
    this.clear();
    this.components.selectMap.render();
  }

  clear() {
    Object.keys(this.components).forEach((key) => {
      if (this.components[key].active) {
        this.components[key].remove();
      }
    });
  }
}

// (e) => {
// console.log(e.target.dataset.map);
// this.components.selectMap.remove();
// const gameWrapper = document.createElement('div');
// gameWrapper.id = 'game-wrapper';
// this.parent.appendChild(gameWrapper);
// const game = new Game(gameWrapper, e.target.dataset.map);
// game.start(false, false);
// this.components.pauseMenu.render();
// }
