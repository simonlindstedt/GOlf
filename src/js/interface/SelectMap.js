export default class selectMap {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.levels = [];
  }
  render(mapClick, levelCount) {
    this.mapClick = mapClick;
    this.section = document.createElement('section');
    this.section.classList.add('select-map-container');

    this.mapSelector = document.createElement('div');
    this.mapSelector.classList.add('map-selector');

    this.heading = document.createElement('h1');
    this.heading.textContent = 'Select map';
    this.heading.classList.add('select-map');

    for (let i = 0; i < levelCount; i++) {
      const mapButton = document.createElement('button');
      mapButton.classList.add('ball');
      mapButton.dataset.map = mapButton.textContent = i + 1;
      mapButton.addEventListener('click', this.mapClick);
      this.levels.push(mapButton);
      this.mapSelector.appendChild(mapButton);
    }

    this.section.appendChild(this.heading);
    this.section.appendChild(this.mapSelector);
    this.parent.appendChild(this.section);
    this.active = true;
  }
  remove() {
    for (let i = 0; i < this.levelCount; i++) {
      this.levels[i].removeEventListener('click', this.mapClick);
    }
    this.section.remove();
    this.active = false;
  }
}
