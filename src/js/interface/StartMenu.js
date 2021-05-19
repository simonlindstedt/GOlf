export default class StartMenu {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
  }
  render() {
    this.section = document.createElement('section');
    this.section.id = 'intro-screen';

    this.startButton = document.createElement('button');
    this.h1 = document.createElement('h1');
    this.h1.textContent = 'GOlf';
    this.startButton.appendChild(this.h1);
    this.startButton.classList.add('ball');

    this.text = document.createElement('p');
    this.text.textContent = 'Press anywhere to start';

    this.section.appendChild(this.startButton);
    this.section.appendChild(this.text);
    this.parent.appendChild(this.section);
    this.active = true;
  }
  remove() {
    this.section.remove();
    this.active = false;
  }
}
