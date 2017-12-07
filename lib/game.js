import Circle from './circle';
import Timer from './timer';
import Message from './message';

class Game {
  constructor(canvas) {
    this.DIM_X = canvas.width;
    this.DIM_Y = canvas.height;
    this.circles = [];
    this.messages = [];
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.startTime = new Date;
    this.gameStats = {
      hits: 0,
      clicks: 0,
      misses: 0,
      totalCircles: 0,
      player: ''
    };
    this.circleTypes = ['basic', 'bonusTime', 'pointBomb', 'timeBomb', 'gold'];
  }

  start() {
    this.timer = new Timer(this.gameOver.bind(this), 9999);
    this.spawnCircles();
  }

  spawnCircles() {
    this.interval = setTimeout(() => {
      const type = this.circleTypes[Math.floor(Math.random() * 5)];
      const c = new Circle(this.DIM_X, this.DIM_Y, this, type);
      this.gameStats.totalCircles += 1;
      this.circles.push(c);
      this.spawnCircles();
    }, Math.random() * 500 + 200);
  }

  step() {

  }

  pause() {
    this.timer.pause();
    clearInterval(this.interval);
    this.circles.forEach(c => (
      c.pause()
    ));
    this.isPaused = true;
  }

  resume() {
    this.timer.resume();
    this.circles.forEach(c => (
      c.resume()
    ));
    this.isPaused = false;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.circles.forEach( c => c.draw(ctx) );
    this.messages.forEach( m => m.draw(ctx) );
    this.clearMessages();
    this.displayScore(ctx);
    this.displayTime(ctx);
  }

  click(mouseX, mouseY) {
    this.gameStats.clicks += 1;
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      if (circle.isClicked(mouseX, mouseY)) {
        this.pop(circle);
        this.remove(circle);
        this.addPoint(circle);
        this.gameStats.hits += 1;
        return true;
      }
    }
    return false;
  }

  remove(circle) {
    const idx = this.circles.indexOf(circle);
    this.circles[idx].clear();
    this.circles.splice(idx, 1);
  }

  pop(circle) {
    const message = new Message(
      circle.x - circle.radius / 2,
      circle.y,
      circle.timeBonus,
      circle.points
    );
    this.messages.push(message);
    circle.pop();
  }

  displayScore(ctx) {
    ctx.font = "18px Quicksand";
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    const x = .25 * this.DIM_X;
    ctx.fillText(`score`, x, 25);
    ctx.font = "24px Quicksand";
    ctx.fillStyle = 'rgb(0, 99, 12)';
    ctx.fillText(this.score, x + 55, 27);
  }

  displayTime(ctx) {
    ctx.font = "18px Quicksand";
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    const x = .7 * this.DIM_X;
    ctx.fillText(`time`, x, 25);
    ctx.font = "24px Quicksand";
    ctx.fillStyle = 'rgb(71, 62, 246)';
    ctx.fillText(this.timer.timeRemaining(), x + 50, 25);
  }

  addPoint(circle) {
    this.score += circle.points;
  }

  miss(circle) {
    this.gameStats.misses += 1;
    const message = new Message(
      circle.x - circle.radius / 2,
      circle.y,
      circle.timePenalty
    );
    this.messages.push(message);
  }

  gameOver() {
    clearInterval(this.interval);
    this.isGameOver = true;
    this.circles.forEach(c => (
      c.pause()
    ));
  }

  clickAccuracy() {
    if (this.gameStats.hits === 0) {
      return 0;
    }
    return Math.round((this.gameStats.hits / this.gameStats.clicks) * 100);
  }

  circlesMissed() {
    return this.gameStats.misses;
  }

  clearMessages() {
    this.messages.forEach(m => {
      if (m.removed) {
        const idx = this.messages.indexOf(m);
        this.messages.splice(idx, 1);
      }
    });
  }
}

export default Game;
