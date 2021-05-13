import maps from './assets/maps.json';

export default class Map {
  constructor(map) {
    this.coords = maps[`map${map}`];
    this.mapCount = Object.keys(maps).length;
  }
}
