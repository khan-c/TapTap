import Game from './game';
import Timer from './timer';

class GameView {
  constructor(ctx, canvas) {
    this.game = new Game(canvas);
    this.ctx = ctx;
    this.canvas = canvas;

    this.click = this.click.bind(this);
    this.resume = this.resume.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  load() {
    this.menu = document.querySelector('.menu-modal');
    const play = document.getElementById('play');
    play.addEventListener("click", (e) => {
      e.preventDefault();
      this.start();
      this.menu.className += ' hidden';
    });
  }

  start() {
    this.timer = new Timer(this.gameOver, 5000);
    this.resume();
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.togglePause();
      }
    });
  }

  pause() {
    this.timer.pause();
    this.game.pause();
    window.removeEventListener("mousedown", this.click );

    const resume = document.getElementById('resume');
    const pauseMenu = document.querySelector('.pause-modal');
    resume.addEventListener("click", (e) => {
      e.preventDefault();
      this.resume();
      pauseMenu.className += ' hidden';
    });
  }

  resume() {
    this.timer.resume();
    this.game.spawnCircles();
    this.game.resume();
    const interval = window.setInterval(() => {
      this.game.step();
      this.game.draw(this.ctx);
      if (this.game.isGameOver) {
        clearInterval(interval);
      }
    }, 20);
    window.addEventListener(
      "mousedown",
      this.click
    );
  }

  togglePause() {
    const pause = document.querySelector('.pause-modal');
    if (pause.className === 'pause-modal hidden') {
      pause.className = 'pause-modal';
      this.pause();
    } else {
      pause.className += ' hidden';
      this.resume();
    }
  }

  click(e) {
    this.game.click(e.clientX, e.clientY);
  }

  gameOver() {
    this.game.gameOver();
    const gameover = document.querySelector('.gameover-modal');
    gameover.className = 'gameover-modal';
    const score = document.getElementById('score');
    score.innerHTML = `Final Score: ${this.game.score}`;
  }
}

export default GameView;
