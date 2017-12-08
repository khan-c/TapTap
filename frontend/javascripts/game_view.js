import Game from './game';
import Stats from './stats';
import Menu from './menu';
import { saveScores } from './api_util';

class GameView {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.stats = new Stats;
    this.menu = new Menu(this);

    this.click = this.click.bind(this);
    this.resume = this.resume.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.pauseFunc = this.pauseFunc.bind(this);
    this.recordName = this.recordName.bind(this);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    const interval = window.setInterval(() => {
      this.game.draw(this.ctx);
      if (this.game.isGameOver) {
        clearInterval(interval);
        this.gameOver();
      } else if (this.game.isPaused) {
        clearInterval(interval);
      }
    }, 20);
    window.addEventListener(
      "mousedown",
      this.click
    );
  }

  start(mode) {
    this.game = new Game(this.canvas);
    this.game.start(mode);
    this.render();
    window.addEventListener("keydown", this.pauseFunc);
  }

  pause() {
    this.game.pause();
    window.removeEventListener("mousedown", this.click );
  }

  resume() {
    this.game.spawnCircles();
    this.game.resume();
    this.render();
  }

  click(e) {
    const clickResult = this.game.click(e.clientX, e.clientY);
    if (clickResult === 'good') {
      this.menu.playPop();
    } else if (clickResult === 'bad') {
      this.menu.playBad();
    } else if (clickResult === 'gold') {
      this.menu.playGold();
    }
  }

  togglePause() {
    if (this.game.isPaused) {
      this.menu.resume();
      this.resume();
    } else {
      this.menu.pause();
      this.pause();
    }
  }

  pauseFunc(e) {
    if (e.keyCode === 27 || e.keyCode === 80) {
      this.togglePause();
    }
  }

  gameOver() {
    this.quit();
    this.menu.gameOver();
    this.stats.addGame(this.game);

    const score = document.getElementById('score');
    score.innerHTML = `Final Score: ${this.game.score}`;
    const elapsedTime = document.getElementById('elapsedTime');
    const eTime = parseFloat(
      Math.round(this.game.elapsedTime / 100) / 10
    ).toFixed(1);
    elapsedTime.innerHTML = `Elapsed Time: ${eTime}s`;
    const accuracy = document.getElementById('accuracy');
    accuracy.innerHTML = `Click Accuracy: ${this.game.clickAccuracy()}%`;
    const badHits = document.getElementById('badHits');
    badHits.innerHTML = `Percentage of bad hits: ${this.game.badHitsRatio()}%`;
  }

  recordName(name) {
    saveScores({'name':name, 'score':this.game.score});
  }

  quit() {
    window.removeEventListener("keydown", this.pauseFunc);
    window.removeEventListener("mousedown", this.click );
  }
}

export default GameView;
