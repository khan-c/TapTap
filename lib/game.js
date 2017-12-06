import Circle from './circle';
import Timer from './timer';
// import GameStats from './game_stats';

class Game {
  constructor(canvas) {
    this.DIM_X = canvas.width;
    this.DIM_Y = canvas.height;
    this.circles = [];
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
    this.gameStats = {
      hits: 0,
      clicks: 0,
      misses: 0,
      totalCircles: 0
    };
  }

  start() {
    this.timer = new Timer(this.gameOver.bind(this), 9999);
    this.spawnCircles();
  }

  spawnCircles() {
    this.interval = setTimeout(() => {
      const c = new Circle(this.DIM_X, this.DIM_Y, this);
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
    this.displayStats(ctx);
    this.displayTime(ctx);
  }

  click(mouseX, mouseY) {
    this.gameStats.clicks += 1;
    for (let i = 0; i < this.circles.length; i++) {
      if (this.circles[i].isClicked(mouseX, mouseY)) {
        this.remove(this.circles[i]);
        this.addPoint();
        this.gameStats.hits += 1;
      }
    }
  }

  remove(circle) {
    const idx = this.circles.indexOf(circle);
    this.circles[idx].destroy();
    this.circles.splice(idx, 1);
  }

  displayStats(ctx) {
    ctx.font = "18px Quicksand";
    ctx.fillStyle = '#000';
    ctx.fillText(`score: ${this.score}`, 10, 20);
  }

  displayTime(ctx) {
    ctx.font = "20px Quicksand";
    ctx.fillStyle = '#000';
    ctx.fillText(`time remaining: ${this.timer.timeRemaining()}`, 200, 20);
  }

  addPoint() {
    this.score += 1;
  }

  miss() {
    this.gameStats.misses += 1;
  }

  gameOver() {
    clearInterval(this.interval);
    this.isGameOver = true;
    this.circles.forEach(c => (
      c.pause()
    ));
  }

  clickAccuracy() {
    return Math.round((this.gameStats.hits / this.gameStats.clicks) * 100);
  }

  circlesMissed() {
    return this.gameStats.misses;
  }
}

export default Game;
