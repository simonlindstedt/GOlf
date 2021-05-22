export default class StartMenu {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    window.sessionStorage.totalStrikes = 0;
  }
  render() {
    this.section = document.createElement('section');
    this.section.id = 'strike-count';

    this.flex = document.createElement('div');
    this.flex.classList.add('strike-count-flex-container');

    this.strikeCountEl = document.createElement('h1');
    this.strikeCountEl.classList.add('strikeCount');

    this.totalStrikesEl = document.createElement('h1');
    this.totalStrikesEl.classList.add('totalStrikes');

    this.flex.appendChild(this.strikeCountEl);
    this.flex.appendChild(this.totalStrikesEl);
    this.section.appendChild(this.flex);
    this.parent.appendChild(this.section);
    this.active = true;
  }

  setStrikes(currentStrikes) {
    this.strikeCount = currentStrikes;
    this.totalStrikes =
      Number(window.sessionStorage.totalStrikes) + currentStrikes;
    console.log(
      `Totalstikes: ${this.totalStrikes} strikes: ${this.strikeCount}`
    );
  }

  updateTotalStrikes(currentStrikes) {
    window.sessionStorage.totalStrikes =
      parseInt(window.sessionStorage.totalStrikes) + currentStrikes;
  }

  remove() {
    this.section.remove();
    this.active = false;
  }
}
