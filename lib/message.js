import Timer from './timer';

class Message {
  constructor(x, y, timeChange, pointChange) {
    this.x = x;
    this.y = y;

    if (timeChange > 0) {
      this.timeChange = `+${timeChange / 1000}s`;
      this.timeColor = 'rgb(1, 255, 83)';
    } else if (timeChange < 0) {
      this.timeChange = `${timeChange /  1000}s`;
      this.timeColor = 'rgb(210, 34, 35)';
    } else {
      this.timeChange = '';
    }

    if (pointChange > 0) {
      this.pointChange = `+${pointChange}p`;
      this.pointColor = 'rgb(174, 255, 1)';
    } else if (pointChange < 0) {
      this.pointChange = `${pointChange}p`;
      this.pointColor = 'rgb(147, 1, 2)';
    } else {
      this.pointChange = '';
    }

    this.removed = false;

    this.removeMessage = this.removeMessage.bind(this);
    this.timer = new Timer(this.removeMessage, 500);
  }

  draw(ctx) {
    ctx.font = "18px Quicksand";
    ctx.fillStyle = this.timeColor;
    ctx.fillText(this.timeChange, this.x, this.y);
    ctx.fillStyle = this.pointColor;
    ctx.fillText(this.pointChange, this.x, this.y + 15);
    this.float();
  }

  float() {
    this.y -= .5;
  }

  removeMessage() {
    this.removed = true;
    clearTimeout(this.timer.timerId);
  }
}

export default Message;
