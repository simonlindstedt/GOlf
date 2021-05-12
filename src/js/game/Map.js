import maps from './assets/maps.json';

export default class Map {
  constructor(map) {
    this.coords = maps[`map${map}`];
  }
}
