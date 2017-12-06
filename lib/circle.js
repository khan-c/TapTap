import Timer from './timer';

class Circle {
  constructor(x, y, type, game) {
    this.gameHeight = y;
    this.gameWidth = x;

    if (type === 'basic') {
      this.radius = .04 * x;
      this.x = Math.random() * (x - 2 * this.radius) + this.radius;
      this.y = Math.random() * (y - 2 * this.radius) + this.radius;
      this.game = game;
      this.gradient = this.radius;
      this.lifeTime = Math.random() * 500 + 1000;
      this.timeBonus = 250;
      this.timePenalty = -100;
      this.points = 1;
    }
    this.radius = .04 * x;
    this.x = Math.random() * (x - 2 * this.radius) + this.radius;
    this.y = Math.random() * (y - 2 * this.radius) + this.radius;
    this.game = game;
    this.gradient = this.radius;
    this.lifeTime = Math.random() * 1000 + 1000;
    this.timeBonus = 250;
    this.timePenalty = -250;
    this.points = 1;

    this.selfDestroy = this.selfDestroy.bind(this);
    this.timeout = new Timer(this.selfDestroy, this.lifeTime);
  }

  shrink() {
    this.radius -= this.radius / (this.lifeTime / 20);
  }

  gradientShift() {
    this.gradient -= this.radius / (this.lifeTime / 20);
  }

  draw(ctx) {
    var grd = ctx.createRadialGradient(this.x, this.y, this.gradient + 1, this.x, this.y, 0);
    grd.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    grd.addColorStop(1, "rgba(0, 0, 255, 0.6)");
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, .3)`;
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

  pop() {
    this.game.timer.addTime(this.timeBonus);
  }

  selfDestroy() {
    this.game.timer.addTime(this.timePenalty);
    this.game.remove(this);
    this.game.miss(this);
    this.clear();
  }

}

export default Circle;
