import Matter from 'matter-js';
import Ball from './Ball';

export default class Game {
  constructor(stageDisplay) {
    this.stageDisplay = stageDisplay;
    this.setupWorld();
  }

  setupWorld() {
    this.engine = Matter.Engine.create();
    // this.engine.gravity = {
    //   x: 0,
    //   y: 0,
    // };
    this.World = Matter.World;
    this.ball = new Ball(150, 150, 100);
    this.ground = Matter.Bodies.rectangle(400, 400, 800, 10, {
      isStatic: true,
    });
    Matter.Body.setAngle(this.ground, 0.5);
    this.World.add(this.engine.world, [this.ball.body, this.ground]);
    this.stageDisplay.addChild(this.ball.sprite);
  }

  update() {
    Matter.Engine.update(this.engine);
    this.ball.moveBall();
  }
}
