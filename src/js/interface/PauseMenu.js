export default class pauseMenu {
  constructor(options = []) {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.paused = false;
    this.options = options;
    this.buttons = [];
  }
  render() {
    this.active = true;
    this.section = document.createElement('section');
    this.section.classList.add('pause-container');
    const menu = document.createElement('h1');
    menu.textContent = 'Menu';
    this.section.appendChild(menu);
    if (this.paused) {
      this.options.forEach((option) => {
        const button = document.createElement('button');
        button.classList.add('ball');
        button.textContent = option[0];
        button.addEventListener('click', option[1]);
        this.buttons.push(button);
        this.section.appendChild(button);
      });
      // this.section.appendChild(this.menuContainer);
      this.parent.appendChild(this.section);
    }
  }
  remove() {
    for (let i = 0; i < this.options.length; i++) {
      this.buttons[i].removeEventListener('click', this.options[i][1]);
    }
    this.section.remove();
    this.active = false;
    this.paused = false;
  }
}
