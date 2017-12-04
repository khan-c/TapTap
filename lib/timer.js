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
    console.log(this.remaining);
  }

  resume() {
    this.start = new Date;
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }
}

export default Timer;
