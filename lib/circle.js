import Timer from './timer';

class Circle {
  constructor(x, y, game) {
    this.radius = 50;
    this.x = Math.random() * (x - 2 * this.radius) + this.radius;
    this.y = Math.random() * (y - 2 * this.radius) + this.radius;
    this.game = game;

    this.selfDestroy = this.selfDestroy.bind(this);
    this.timeout = new Timer(this.selfDestroy, 1000);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(249, 224, 34)";
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  }

  pause() {
    this.timeout.pause();
  }

  resume() {
    this.timeout.resume();
  }

  isClicked(mouseX, mouseY) {
    const distance = Math.sqrt((this.x - mouseX)**2 + (this.y - mouseY)**2);
    if (distance < this.radius) {
      return true;
    }
    return false;
  }

  destroy() {
    clearTimeout(this.timeout.timerId);
    this.timeout.endTimer();
  }

  selfDestroy() {
    this.game.remove(this);
    this.destroy();
  }

}

export default Circle;
