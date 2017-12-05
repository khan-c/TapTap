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
    this.lifeTime = 2000;

    this.selfDestroy = this.selfDestroy.bind(this);
    this.timeout = new Timer(this.selfDestroy, this.lifeTime);
  }

  shrink() {
    this.radius -= this.radius / (this.lifeTime / 20);
  }

  // maybe not the cleanest.. need something related to the circle timer
  colorShift() {
    const diff = Math.round(255 / (this.lifeTime / 20));
    this.r -= diff;
    this.g -= diff;
    this.b -= diff;
  }

  gradient() {
  }

  draw(ctx) {
    var grd = ctx.createRadialGradient(0,0,5,0,0, this.radius);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
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
    // this.colorShift();
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
  }

  selfDestroy() {
    this.game.remove(this);
    this.destroy();
  }

}

export default Circle;
