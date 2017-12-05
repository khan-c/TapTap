import Circle from './circle';
import Timer from './timer';

class Game {
  constructor(canvas) {
    this.DIM_X = canvas.width;
    this.DIM_Y = canvas.height;
    this.circles = [];
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
  }

  start() {
    this.timer = new Timer(this.gameOver.bind(this), 5000);
    this.spawnCircles();
  }

  spawnCircles() {
    this.interval = setInterval(() => {
      const c = new Circle(this.DIM_X, this.DIM_Y, this);
      this.circles.push(c);
    }, 500);
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
    this.displayScore(ctx);
    this.displayTime(ctx);
  }

  click(mouseX, mouseY) {
    for (let i = 0; i < this.circles.length; i++) {
      if (this.circles[i].isClicked(mouseX, mouseY)) {
        this.remove(this.circles[i]);
        this.addPoint();
      }
    }
  }

  remove(circle) {
    const idx = this.circles.indexOf(circle);
    this.circles[idx].destroy();
    this.circles.splice(idx, 1);
  }

  displayScore(ctx) {
    ctx.font = "14px Quicksand";
    ctx.fillStyle = '#000';
    ctx.fillText(`score: ${this.score}`, 10, 20);
  }

  displayTime(ctx) {
    ctx.font = "16px Quicksand";
    ctx.fillStyle = '#000';
    ctx.fillText(`time remaining: ${this.timer.timeRemaining()}`, 200, 20);
  }

  addPoint() {
    this.score += 1;
  }

  gameOver() {
    clearInterval(this.interval);
    this.isGameOver = true;
    this.circles.forEach(c => (
      c.pause()
    ));
  }
}

export default Game;
