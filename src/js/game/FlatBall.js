import { Graphics } from '@pixi/graphics';
import { Bodies, Vector, Body, Constraint, Composite } from 'matter-js';
import { DropShadowFilter } from 'pixi-filters';

export default class FlatBall {
  constructor(x, y, r, options) {
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
    this.mouseDown = false;
    this.body = Bodies.circle(x, y, r, options);
    this.holeConstraint = undefined;
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
        hole.sprite.height &&
      Math.abs(this.body.position.y - hole.sprite.position.y) <
        hole.sprite.height
    ) {
      if (!this.holeConstraint) {
        this.holeConstraint = Constraint.create({
          bodyA: this.body,
          pointB: { x: hole.sprite.position.x, y: hole.sprite.position.y },
          stiffness: 0.002,
          length: 0,
        });

        Composite.add(engine.world, this.holeConstraint);
      }
    } else {
      if (this.holeConstraint) {
        Composite.remove(engine.world, this.holeConstraint);
        this.holeConstraint = undefined;
      }
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
