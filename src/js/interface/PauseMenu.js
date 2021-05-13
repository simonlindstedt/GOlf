export default class pauseMenu {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.paused = false;
    this.options = [
      ['option1', () => console.log('option1')],
      ['option2', () => console.log('option2')],
      ['option3', () => console.log('option3')],
    ];
  }
  render() {
    this.active = true;
    this.section = document.createElement('section');
    this.section.classList.add('pause-container');
    console.log(this.paused);
    if (this.paused) {
      console.log(`Paused: ${this.paused}`);
      this.menuContainer = document.createElement('div');
      this.menuContainer.classList.add('menu-container');
      this.options.forEach((option) => {
        this.option = document.createElement('div');
        this.option.classList.add('pause-option');
        this.option.textContent = option[0];
        this.menuContainer.appendChild(this.option);
        this.option.addEventListener('click', option[1]);
      });
      this.section.appendChild(this.menuContainer);
      this.parent.appendChild(this.section);
    }
  }
  remove() {
    this.section.remove();
    this.active = false;
  }
}
