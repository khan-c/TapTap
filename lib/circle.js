import Timer from './timer';

class Circle {
  constructor(x, y, game) {
    this.radius = .04 * x;
    this.gameHeight = y;
    this.gameWidth = x;
    this.x = Math.random() * (x - 2 * this.radius) + this.radius;
    this.y = Math.random() * (y - 2 * this.radius) + this.radius;
    this.game = game;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.gradient = this.radius;
    this.lifeTime = Math.random() * 1000 + 1000;

    this.selfDestroy = this.selfDestroy.bind(this);
    this.timeout = new Timer(this.selfDestroy, this.lifeTime);
  }

  shrink() {
    this.radius -= this.radius / (this.lifeTime / 20);
  }

  // // maybe not the cleanest.. need something related to the circle timer
  // colorShift() {
  //   const diff = Math.round(255 / (this.lifeTime / 20));
  //   this.r -= diff;
  //   this.g -= diff;
  //   this.b -= diff;
  // }

  gradientShift() {
    this.gradient -= this.radius / (this.lifeTime / 20);
  }

  draw(ctx) {
    var grd = ctx.createRadialGradient(this.x, this.y, this.gradient + 1, this.x, this.y, 0);
    grd.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    grd.addColorStop(1, "rgba(0, 0, 255, 0.6)");
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, .3)`;
    ctx.fillStyle = grd;
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
    // this.shrink();
    this.gradientShift();
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

  clear() {
    clearTimeout(this.timeout.timerId);
  }

  destroy() {
    this.clear();
    this.game.timer.addTime(250);
  }

  selfDestroy() {
    this.game.timer.addTime(-250);
    this.game.remove(this);
    this.game.miss();
    this.clear();
  }

}

export default Circle;
