import Game from './game';

class GameView {
  constructor(ctx, canvas) {
    this.game = new Game(canvas);
    this.ctx = ctx;
    this.canvas = canvas;
  }

  load() {
    this.ctx.font="36px Georgia";
    this.ctx.strokeStyle = "rgba(50, 15, 194, 0.85)";
    this.ctx.fillText("TAP!", .5 * this.canvas.width - 50, .1 * this.canvas.height);

    this.ctx.fillText("test", 250, 250);
    window.addEventListener(
      "click",
      (e) => {
        if (e.clientX > 250 && e.clientX < 300 &&
              e.clientY > 225 && e.clientY < 250) {
          this.start();
        }
      }
    );
  }

  start() {
    this.game.spawnCircles();
    window.setInterval(() => {
      this.game.step();
      this.game.draw(this.ctx);
    }, 20);
    window.addEventListener(
      "mousedown",
      (e) => this.game.click(e.clientX, e.clientY)
    );
  }
}

export default GameView;
