import Timer from './timer';


class Circle {
  constructor(x, y, game, type, mode) {
    this.gameHeight = y;
    this.gameWidth = x;
    this.gameDiagonal = Math.sqrt(x * x + y * y);
    this.game = game;
    this.type = type;

    this.TYPES = {
      basic: {
        radius: 0.04 * this.gameDiagonal,
        color: "rgba(0, 0, 255, 0.8)",
        lifeTime: Math.random() * 500 + 1500,
        timeBonus: 250,
        timePenalty: -250,
        points: 1
      },
      bonusTime: {
        radius: 0.025 * this.gameDiagonal,
        color: "rgba(255, 255, 255, 0.9)",
        lifeTime: Math.random() * 250 + 1000,
        timeBonus: 1000,
        timePenalty: 0,
        points: 0
      },
      pointBomb: {
        radius: 0.05 * this.gameDiagonal,
        color: "rgba(255, 0, 0, 0.9)",
        lifeTime: Math.random() * 750 + 2000,
        timeBonus: 0,
        timePenalty: 0,
        points: -2
      },
      timeBomb: {
        radius: 0.04 * this.gameDiagonal,
        color: "rgba(17, 0, 45, 0.9)",
        lifeTime: Math.random() * 750 + 2000,
        timeBonus: -1000,
        timePenalty: 0,
        points: 0
      },
      gold: {
        radius: 0.02 * this.gameDiagonal,
        color: "rgba(255, 222, 0, 0.8)",
        lifeTime: Math.random() * 500 + 1000,
        timeBonus: 1000,
        timePenalty: 0,
        points: 5
      }
    }

    this.radius = this.TYPES[type].radius;
    this.color = this.TYPES[type].color;
    this.timeBonus = this.TYPES[type].timeBonus;
    this.timePenalty = this.TYPES[type].timePenalty;
    this.points = this.TYPES[type].points;

    this.lifeTime = this.TYPES[type].lifeTime;

    if (mode === 'casual') {
      this.lifeTime += 1500;
      this.timeBonus += 250;
    }


    this.gradient = this.radius;
    this.x = Math.random() * (x - 2 * this.radius) + this.radius;
    this.y = Math.random() * (y - 2 * this.radius) + this.radius;

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
    grd.addColorStop(1, this.color);
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
    if (this.type === 'gold') {
      this.shrink();
    }
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
