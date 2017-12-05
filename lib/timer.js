class Timer {
  constructor(callback, time) {
    this.time = time;
    this.timerId = '';
    this.start = '';
    this.remaining = time;
    this.callback = callback;
    this.countdown = '';

    this.resume();
  }

  pause() {
    window.clearTimeout(this.timerId);
    clearInterval(this.countdown);
    this.remaining -= new Date - this.start;
  }

  resume() {
    this.start = new Date;
    this.addTime(0);
    this.countdown = setInterval(this.timeRemaining.bind(this), 1000);
  }

  addTime(amount) {
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining + amount);
  }

  timeRemaining() {
    this.remaining -= new Date - this.start;
    this.start = new Date;
    return Math.round(this.remaining / 1000);
  }

  endTimer() {
    clearInterval(this.countdown);
  }
}

export default Timer;
