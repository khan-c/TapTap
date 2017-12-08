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
    this.elapsedTime = 0;
    this.spawnScale = 500;
    this.gameStats = {
      hits: 0,
      badHits: 0,
      clicks: 0,
      misses: 0,
      totalCircles: 0,
      player: ''
    };
    this.circleTypes = ['basic', 'bonusTime', 'pointBomb', 'timeBomb', 'gold'];
  }

  start() {
    this.timer = new Timer(this.gameOver.bind(this), 14999);
    this.spawnCircles();
  }

  spawnCircles() {
    this.interval = setTimeout(() => {
      const type = this.circleTypes[this.calculateType()];
      const c = new Circle(this.DIM_X, this.DIM_Y, this, type);
      this.gameStats.totalCircles += 1;
      this.circles.push(c);
      this.spawnCircles();
    }, Math.random() * this.spawnScale + 200);
  }

  calculateType() {
    const elapsedGameTime = this.elapsedGameTime();
    const rand = Math.random();
    if (elapsedGameTime < 7000) {
      return 0;
    } else if (elapsedGameTime < 10000) {
      if (rand < .5) {
        return 0;
      } else {
        return 1;
      }
    } else if (elapsedGameTime < 15000) {
      if (rand < .6) {
        return 0;
      } else if (rand < .8) {
        return 1;
      } else {
        return 2;
      }
    } else if (elapsedGameTime < 22000) {
      if (rand < .5) {
        return 0;
      } else if (rand < .65) {
        return 1;
      } else if (rand < .85) {
        return 2;
      } else {
        return 3;
      }
    } else if (elapsedGameTime < 60000){
      this.spawnScale = 200;
      if (rand < .5) {
        return 0;
      } else if (rand < .6) {
        return 1;
      } else if (rand < .75) {
        return 2;
      } else if (rand < .9) {
        return 3;
      } else {
        return 4;
      }
    } else {
      this.spawnScale = 0;
      if (rand < .2) {
        return 0;
      } else if (rand < .3) {
        return 1;
      } else if (rand < .6) {
        return 2;
      } else if (rand < .9) {
        return 3;
      } else {
        return 4;
      }
    }
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
        if (circle.type === 'basic' ||
          circle.type === 'bonusTime'
        ) {
          return 'good';
        } else if (circle.type === 'gold') {
          return 'gold';
        } else {
          this.gameStats.badHits += 1;
          return 'bad';
        }
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
    ctx.font = "30px Quicksand";
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    const x = .25 * this.DIM_X;
    ctx.fillText(`score`, x, 30);
    ctx.font = "36px Quicksand";
    ctx.fillStyle = 'rgb(0, 99, 12)';
    ctx.fillText(this.score, x + 85, 30);
  }

  displayTime(ctx) {
    ctx.font = "30px Quicksand";
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    const x = .7 * this.DIM_X;
    ctx.fillText(`time`, x, 30);
    ctx.font = "36px Quicksand";
    ctx.fillStyle = 'rgb(71, 62, 246)';
    ctx.fillText(this.timer.timeRemaining(), x + 70, 30);
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
    this.elapsedTime = this.elapsedGameTime();
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

  badHitsRatio() {
    if (this.gameStats.hits === 0 || this.gameStats.badHits === 0) {
      return 0;
    }
    return Math.round((this.gameStats.badHits / this.gameStats.hits) * 100);
  }

  clearMessages() {
    this.messages.forEach(m => {
      if (m.removed) {
        const idx = this.messages.indexOf(m);
        this.messages.splice(idx, 1);
      }
    });
  }

  elapsedGameTime() {
    return new Date - this.startTime;
  }
}

export default Game;
