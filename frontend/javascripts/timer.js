class Timer {
  constructor(callback, time) {
    this.time = time;
    this.timerId = '';
    this.start = '';
    this.remaining = time;
    this.callback = callback;

    this.resume();
  }

  pause() {
    window.clearTimeout(this.timerId);
    this.remaining -= new Date - this.start;
  }

  resume() {
    this.start = new Date;
    this.addTime(0);
  }

  addTime(amount) {
    this.remaining += amount;
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }

  timeRemaining() {
    this.remaining -= new Date - this.start;
    this.start = new Date;
    return parseFloat(Math.round(this.remaining / 100) / 10).toFixed(1);
  }
}

export default Timer;
