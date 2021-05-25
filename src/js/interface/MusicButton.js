import audioFile from 'url:~src/js/game/assets/elise.mp3';

export default class MusicButton {
  constructor() {
    this.isToggled = false;
    this.audio = new Audio(audioFile);
    if (typeof this.audio.loop == 'boolean') {
      this.audio.loop = true;
    } else {
      this.audio.addEventListener(
        'ended',
        function () {
          this.currentTime = 0;
          this.play();
        },
        false
      );
    }
    this.parent = document.querySelector('main#app-container');
  }

  render() {
    this.active = true;
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.classList.add('button-container');
    this.buttonEl = document.createElement('button');
    this.buttonEl.classList.add('music-button');
    this.buttonEl.classList.add('music-not-playing');
    this.buttonContainer.appendChild(this.buttonEl);
    this.parent.appendChild(this.buttonContainer);
    this.buttonContainer.addEventListener('click', this.toggle.bind(this));
    if (!this.isToggled) {
      this.buttonEl.classList.add('music-not-playing');
      this.buttonEl.classList.remove('music-playing');
    } else {
      this.buttonEl.classList.add('music-playing');
      this.buttonEl.classList.remove('music-not-playing');
    }
  }

  toggle() {
    if (this.isToggled) {
      this.isToggled = false;
      this.audio.pause();
      this.buttonEl.classList.add('music-not-playing');
      this.buttonEl.classList.remove('music-playing');
    } else {
      this.isToggled = true;
      this.audio.play();
      this.buttonEl.classList.add('music-playing');
      this.buttonEl.classList.remove('music-not-playing');
    }
  }

  remove() {
    this.buttonEl?.remove();
    this.buttonContainer.remove();
    this.active = false;
  }
}
