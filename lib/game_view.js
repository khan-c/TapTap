import Game from './game';
import Stats from './stats';

class GameView {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.gameoverMenu = document.querySelector('.gameover-modal');
    this.pauseMenu = document.querySelector('.pause-modal');
    this.menu = document.querySelector('.menu-modal');

    this.click = this.click.bind(this);
    this.resume = this.resume.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.pauseFunc = this.pauseFunc.bind(this);

    const pauseMenu = document.querySelector('.pause-modal');
    const resume = document.getElementById('resume');
    resume.addEventListener("click", (e) => {
      e.preventDefault();
      this.resume();
      this.toggleHidden(pauseMenu);
    });

    const play = document.getElementById('play');
    play.addEventListener("click", (e) => {
      e.preventDefault();
      this.start();
      this.toggleHidden(this.menu);
    });

    const restart = document.getElementById('restart');
    restart.addEventListener("click", this.handleRestartButton.bind(this));

    const menu = document.getElementById('menu');
    menu.addEventListener("click", this.handleMainMenuButton.bind(this));
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    const interval = window.setInterval(() => {
      this.game.step();
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

  start() {
    this.game = new Game(this.canvas);
    this.game.start();
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

  togglePause() {
    if (this.game.isPaused) {
      this.toggleHidden(this.pauseMenu);
      this.resume();
    } else {
      this.toggleHidden(this.pauseMenu);
      this.pause();
    }
  }

  click(e) {
    this.game.click(e.clientX, e.clientY);
  }

  pauseFunc(e) {
    if (e.keyCode === 27) {
      this.togglePause();
    }
  }

  gameOver() {
    window.removeEventListener("keydown", this.pauseFunc);
    this.toggleHidden(this.gameoverMenu);

    const score = document.getElementById('score');
    score.innerHTML = `Final Score: ${this.game.score}`;
    const accuracy = document.getElementById('accuracy');
    accuracy.innerHTML = `Click Accuracy: ${this.game.clickAccuracy()}%`;
    const missed = document.getElementById('missed');
    missed.innerHTML = `Circles Missed: ${this.game.circlesMissed()}`;
  }

  toggleHidden(element) {
    if (element.className.slice(-7) === ' hidden') {
      element.className = element.className.slice(0, -7);
    } else {
      element.className += " hidden";
    }
  }

  handleRestartButton(e) {
    e.preventDefault();
    this.start();
    this.toggleHidden(this.gameoverMenu);
  }

  handleMainMenuButton(e) {
    e.preventDefault();
    this.clear();
    this.toggleHidden(this.gameoverMenu);
    this.toggleHidden(this.menu);
  }
}

export default GameView;
