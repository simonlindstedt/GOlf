import { Graphics } from '@pixi/graphics';
import { Bodies, Vector, Body, Constraint, Composite } from 'matter-js';
import { DropShadowFilter } from 'pixi-filters';

export default class Ball {
  constructor(x, y, r, options) {
    this.originalPosition = { x: x, y: y };
    this.graphic = new Graphics();
    this.shadow = new DropShadowFilter({
      alpha: 0.4,
      distance: 2,
      blur: 2,
      rotation: 45,
    });
    this.graphic.filters = [this.shadow];
    this.powerDisplay = new Graphics();
    this.aimLine = new Graphics();
    this.graphic.interactive = true;
    this.graphic.cursor = 'pointer';
    this.body = Bodies.circle(x, y, r, options);
    this.body.frictionAir = 0.02;
    this.holeConstraint = undefined;
    this.inHole = false;
    this.distance = {
      current: 0,
      max: 120,
    };
  }
  shoot(mousePos) {
    let targetAngle = Vector.angle(this.body.position, {
      x: mousePos.x,
      y: mousePos.y,
    });
    let force = 0.1 * (this.distance.current / this.distance.max);
    Body.applyForce(this.body, this.body.position, {
      x: Math.cos(targetAngle) * force * -1,
      y: Math.sin(targetAngle) * force * -1,
    });
  }

  drawAimDisplay(mousePos, mouseDown) {
    if (mouseDown) {
      this.powerDisplay.clear();
      this.aimLine.clear();
      this.powerDisplay.lineStyle(2, 0x000000, 1);
      this.powerDisplay.drawCircle(
        this.body.position.x,
        this.body.position.y,
        this.powerDisplayRadius
      );
      this.aimLine.lineStyle(2, 0x000000, 1);
      this.aimLine.moveTo(this.body.position.x, this.body.position.y);
      this.aimLine.lineTo(mousePos.x, mousePos.y);
    } else {
      this.powerDisplay.clear();
      this.aimLine.clear();
    }
  }

  isInHole(hole, engine) {
    if (
      Math.abs(this.body.position.x - hole.sprite.position.x) <
        hole.sprite.height / 2 &&
      Math.abs(this.body.position.y - hole.sprite.position.y) <
        hole.sprite.height / 2
    ) {
      if (!this.holeConstraint) {
        this.holeConstraint = Constraint.create({
          bodyA: this.body,
          pointB: { x: hole.sprite.position.x, y: hole.sprite.position.y },
          stiffness: 0.004,
          length: 0,
        });

        Composite.add(engine.world, this.holeConstraint);
      }
    } else {
      if (this.holeConstraint) {
        Composite.remove(engine.world, this.holeConstraint);
        this.holeConstraint = undefined;
        this.inHole = false;
      }
    }
    if (
      Math.abs(this.body.position.x - hole.sprite.position.x) < 0.5 &&
      Math.abs(this.body.position.y - hole.sprite.position.y) < 0.5 &&
      this.body.speed < 0.4
    ) {
      this.inHole = true;
    }
  }

  isInSand(sand) {
    if (
      Math.abs(this.body.position.x - sand.sprite.position.x) <
        sand.sprite.width / 2 &&
      Math.abs(this.body.position.y - sand.sprite.position.y) <
        sand.sprite.height / 2
    ) {
      this.body.frictionAir = 0.2;
    } else {
      this.body.frictionAir = 0.02;
    }
  }

  isInWater(water) {
    if (
      Math.abs(this.body.position.x - water.sprite.position.x) <
        water.sprite.width / 2 &&
      Math.abs(this.body.position.y - water.sprite.position.y) <
        water.sprite.height / 2
    ) {
      Body.setVelocity(this.body, { x: 0, y: 0 });
      Body.setPosition(this.body, {
        x: this.originalPosition.x,
        y: this.originalPosition.y,
      });
      return true;
    } else {
      return false;
    }
  }

  distanceFromMouse(mousePos) {
    this.distance.current = Math.sqrt(
      Math.pow(this.body.position.x - mousePos.x, 2) +
        Math.pow(this.body.position.y - mousePos.y, 2)
    );
    if (this.distance.current >= this.distance.max) {
      this.distance.current = this.distance.max;
    }
    this.powerDisplayRadius = this.distance.current;
  }

  moveBall() {
    this.graphic.clear();
    this.graphic.beginFill(0xffffff);
    this.graphic.drawCircle(
      this.body.position.x,
      this.body.position.y,
      this.body.circleRadius
    );
  }
}
