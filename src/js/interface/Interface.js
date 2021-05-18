import Game from './../game/Game';
import StartMenu from './StartMenu';
import SelectMap from './SelectMap';
import PauseMenu from './PauseMenu';
import PauseButton from './PauseButton';
import GameWrapper from './GameWrapper';
import Map from '../game/Map';

export default class Interface {
  constructor() {
    this.parent = document.querySelector('main#app-container');

    this.menuOptions = [
      [
        'Resume',
        () => {
          this.components.pauseMenu.paused = false;
          this.game.paused = false;
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
          this.game.paused = false;
          this.components.pauseMenu.remove();
        } else {
          this.components.pauseMenu.paused = true;
          this.game.paused = true;
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
      //Room for optimizations due to duplicate maps.json import
      this.components.selectMap.render(loadMap, new Map(1).mapCount);
    };

    this.components.startMenu.render();
    this.components.startMenu.startButton.addEventListener(
      'click',
      selectMapScreen
    );
  }

  clear() {
    Object.keys(this.components).forEach((key) => {
      if (this.components[key].active) {
        this.components[key].remove();
      }
    });
  }
}
