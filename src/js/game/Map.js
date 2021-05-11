import { World, Composite } from 'matter-js';
import { Sprite, Texture } from 'pixi.js';
import wallPng from 'url:~src/js/game/assets/textures/white.png';
import maps from './assets/maps.json';
import Wall from './Wall';
import Hole from './Hole';
import Ball from './ball';

export default class Map {
  constructor() {
    this.bodies = [];
    this.sprites = [];
    this.ballSettings;
    this.holeSettings;
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
