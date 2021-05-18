export default class StartMenu {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
  }
  render() {
    this.section = document.createElement('section');
    this.section.id = 'intro-screen';

    // this.heading = document.createElement('h1');
    // this.heading.textContent = 'GOlf';

    this.startButton = document.createElement('button');
    this.startButton.textContent = 'GOlf';
    this.startButton.classList.add('ball');

    // this.section.appendChild(this.heading);
    this.section.appendChild(this.startButton);
    this.parent.appendChild(this.section);
    this.active = true;
  }
  remove() {
    this.section.remove();
    this.active = false;
  }
}
