import Circle from './circle';

class Game {
  constructor(canvas) {
    this.DIM_X = canvas.width;
    this.DIM_Y = canvas.height;
    this.circles = [];
  }

  spawnCircles() {
    setInterval(() => {
      const c = new Circle(this.DIM_X, this.DIM_Y, this);
      this.circles.push(c);
    }, 1000);
  }

  step() {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.circles.forEach( c => c.draw(ctx) );
  }

  click(mouseX, mouseY) {
    for (let i = 0; i < this.circles.length; i++) {
      if (this.circles[i].isClicked(mouseX, mouseY)) {
        this.circles.splice(i, 1);
      }
    }
  }

}

export default Game;
