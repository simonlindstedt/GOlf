export default class StartMenu {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
  }
  render() {
    this.section = document.createElement('section');
    this.section.id = 'intro-screen';

    this.startButton = document.createElement('button');
    this.startButton.textContent = 'GOlf';
    this.startButton.classList.add('ball');

    this.text = document.createElement('p');
    this.text.textContent = 'tap to start';

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
