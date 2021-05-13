export default class selectMap {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.isPaused = false;
    this.options = [
      ['option1', () => console.log('option1')],
      ['option2', () => console.log('option2')],
      ['option3', () => console.log('option3')],
    ];
  }
  render() {
    this.section = document.createElement('section');
    this.section.classList.add('pause-container');
    this.menuContainer = document.createElement('div');
    this.menuContainer.classList.add('menu-container');
    this.options.forEach((option) => {
      this.option = document.createElement('div');
      this.option.classList.add('pause-option');
      this.option.textContent = option[0];
      this.section.addChild(this.option);
      this.option.addEventListener('click', option[1]);
    });
    this.pauseButton = document.createElement('button')
    this.pauseButton.classList.add('pause-button')
    }
  }

  remove() {
    
  }
}
