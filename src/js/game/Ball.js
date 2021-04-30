import { Texture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import ballSprite from 'url:~src/js/game/assets/textures/ball.png';
import { Bodies, Vector, Body } from 'matter-js';

export default class Ball {
  constructor(x, y, r, options) {
    this.sprite = Sprite.from(Texture.from(ballSprite));
    this.sprite.interactive = true;
    this.sprite.cursor = 'pointer';
    this.sprite.anchor.set(0.5);
    this.sprite.height = r * 2;
    this.sprite.width = r * 2;
    this.powerDisplay = new Graphics();
    this.powerDisplayRadius = 0;
    this.aimLine = new Graphics();
    this.body = Bodies.circle(x, y, r, options);
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
    this.sprite.x = this.body.position.x;
    this.sprite.y = this.body.position.y;
    this.sprite.rotation = this.body.angle;
  }
}
