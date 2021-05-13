export default class selectMap {
  constructor() {
    this.active = false;
    this.parent = document.querySelector('main#app-container');
    this.levelCount = 9;
    this.levels = [];
  }
  render(mapClick) {
    this.mapClick = mapClick;
    this.section = document.createElement('section');
    this.section.classList.add('select-map-container');

    this.mapSelector = document.createElement('div');
    this.mapSelector.classList.add('map-selector');

    this.heading = document.createElement('h1');
    this.heading.textContent = 'Select map';
    this.heading.classList.add('select-map');

    for (let i = 0; i < this.levelCount; i++) {
      const mapButton = document.createElement('button');
      mapButton.dataset.map = mapButton.textContent = i + 1;
      mapButton.addEventListener('click', this.mapClick);
      this.levels.push(mapButton);
      this.mapSelector.appendChild(mapButton);
    }

    this.section.appendChild(this.heading);
    this.section.appendChild(this.mapSelector);
    this.parent.appendChild(this.section);
    this.active = true;

    // const div = document.createElement('div');
    // div.classList.add('select-map-container');
    // div.innerHTML =
    //   '<h1 class="select-map">Select map</h1><div class="map-selector"><div class="map">1</div><div class="map">2</div><div class="map">3</div><div class="map">4</div><div class="map">5</div><div class="map">6</div><div class="map">7</div><div class="map">8</div><div class="map">9</div></div><button class="start-button">Start</button>';
    // const container = document.querySelector('#app-container');
    // container.appendChild(div);
  }
  remove() {
    for (let i = 0; i < this.levelCount; i++) {
      this.levels[i].removeEventListener('click', this.mapClick);
    }
    this.section.remove();
    this.active = false;
  }
}
