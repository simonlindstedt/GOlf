export default class pauseButton {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.paused = false;
  }
  render(clickHandler) {
    this.pauseButton = document.createElement('button');
    this.pauseButton.classList.add('pause-button');
    document.body.appendChild(this.pauseButton);

    this.pauseButton.addEventListener('click', clickHandler);
  }
  remove() {
    this.section.remove();
    this.active = false;
  }
}
