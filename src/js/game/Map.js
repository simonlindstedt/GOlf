import maps from './assets/maps.json';
import Wall from './Wall';

export default class Map {
  constructor(map) {
    this.coords = maps[`map${map}`];
    // this.walls = this.data.walls;
    // this.holeSettings = {
    //   x: this.data.hole.x,
    //   y: this.data.hole.y,
    //   r: this.data.hole.r,
    // };
    // this.ballSettings = {
    //   x: this.data.start.x,
    //   y: this.data.start.y,
    // };
    // this.bodies = [];
    // this.sprites = [];
    // this.ballSettings;
    // this.holeSettings;
  }

  renderMap(level) {
    const map = maps[`map${level}`];

    //Walls
    for (let i = 0; i < map.walls.length; i++) {
      const wall = new Wall(
        map.walls[i].x,
        map.walls[i].y,
        map.walls[i].w,
        map.walls[i].h
      );
      this.bodies.push(wall.body);
      this.sprites.push(wall.sprite);
    }
    //Hole
    this.holeSettings = { x: map.hole.x, y: map.hole.y, r: map.hole.r };

    //Ball
    this.ballSettings = { x: map.start.x, y: map.start.y };
  }
}
