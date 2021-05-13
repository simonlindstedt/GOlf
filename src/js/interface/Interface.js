import Game from './../game/Game';
import StartMenu from './StartMenu';
import SelectMap from './SelectMap';
import PauseMenu from './PauseMenu';
import PauseButton from './PauseButton';
import GameWrapper from './GameWrapper';

export default class Interface {
  constructor() {
    this.parent = document.querySelector('main#app-container');

    this.menuOptions = [
      [
        'Resume',
        () => {
          this.components.pauseMenu.paused = false;
          this.components.pauseMenu.remove();
        },
      ],
      [
        'To start',
        () => {
          this.clear();
          this.game.clear();
          this.init();
        },
      ],
      ['option3', () => console.log('option3')],
    ];

    this.components = {
      startMenu: new StartMenu(),
      selectMap: new SelectMap(),
      pauseMenu: new PauseMenu(),
      pauseButton: new PauseButton(),
      gameWrapper: new GameWrapper(),
    };
  }
  init() {
    this.clear();

    const loadMap = (e) => {
      this.components.selectMap.remove();
      this.components.gameWrapper.render();
      this.game = new Game(
        this.components.gameWrapper.div,
        e.target.dataset.map
      );
      this.game.start(false, false);
      const clickHandler = () => {
        if (this.components.pauseMenu.paused) {
          this.components.pauseMenu.paused = false;
          this.components.pauseMenu.remove();
        } else {
          this.components.pauseMenu.paused = true;
          this.components.pauseMenu.render();
        }
      };
      this.components.pauseMenu.options = this.menuOptions;
      this.components.pauseButton.render(clickHandler);
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
