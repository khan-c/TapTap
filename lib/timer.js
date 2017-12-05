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
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining + amount);
  }

  timeRemaining() {
    this.remaining -= new Date - this.start;
    this.start = new Date;
    return Math.ceil(this.remaining / 1000);
  }
}

export default Timer;
