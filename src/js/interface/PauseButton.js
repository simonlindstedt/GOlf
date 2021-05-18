export default class pauseButton {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.paused = false;
  }
  render(clickHandler) {
    this.active = true;
    this.pauseButton = document.createElement('button');
    this.pauseButton.classList.add('pause-button');
    // document.body.appendChild(this.pauseButton);
    this.parent.appendChild(this.pauseButton);

    this.pauseButton.addEventListener('click', clickHandler);
  }
  remove() {
    this.pauseButton.remove();
    this.active = false;
  }
}
