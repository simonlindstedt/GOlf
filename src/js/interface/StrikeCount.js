export default class StartMenu {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    window.sessionStorage.totalStrikes = '{}';
    window.sessionStorage.totalStrikeCount = 0;
    this.scoreObject = JSON.parse(window.sessionStorage.totalStrikes);
    this.totalStrikes = 0;
  }
  render() {
    this.section = document.createElement('section');
    this.section.id = 'strike-count';

    this.flex = document.createElement('div');
    this.flex.classList.add('strike-count-flex-container');

    this.prevRecEl = document.createElement('h1');
    this.prevRecEl.classList.add('prevRec');

    this.strikeCountEl = document.createElement('h1');
    this.strikeCountEl.classList.add('strikeCount');

    this.totalStrikesEl = document.createElement('h1');
    this.totalStrikesEl.classList.add('totalStrikes');

    this.flex.appendChild(this.prevRecEl);
    this.flex.appendChild(this.strikeCountEl);
    this.flex.appendChild(this.totalStrikesEl);
    this.section.appendChild(this.flex);
    this.parent.appendChild(this.section);
    this.active = true;
  }

  updateCurrentStrikes(currentStrikes, mapNumber) {
    this.prevRecord = this.scoreObject[`map${mapNumber}`];
    this.prevRecEl.textContent = `Previous course record: ${this.prevRecord}`;
    this.strikeCount = currentStrikes;
    this.strikeCountEl.textContent = `Current strikes: ${this.strikeCount}`;
    this.totalCurrentStrikes =
      parseInt(window.sessionStorage.totalStrikeCount) + currentStrikes;
    this.totalStrikesEl.textContent = `Total strikes: ${this.totalCurrentStrikes}`;
  }

  updateTotalStrikes(currentStrikes, mapNumber) {
    if (this.scoreObject[`map${mapNumber}`]) {
      if (currentStrikes < this.scoreObject[`map${mapNumber}`]) {
        this.scoreObject[`map${mapNumber}`] = currentStrikes;
      }
    } else {
      this.scoreObject[`map${mapNumber}`] = currentStrikes;
    }
    window.sessionStorage.totalStrikes = JSON.stringify(this.scoreObject);
    let add = 0;
    Object.keys(this.scoreObject).forEach((key) => {
      add += this.scoreObject[key];
      window.sessionStorage.totalStrikeCount = add;
    });
  }

  remove() {
    this.section.remove();
    this.active = false;
  }
}
