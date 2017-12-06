class Menu {
  constructor(gameView) {
    this.gameView = gameView;
    this.gameoverMenu = document.querySelector('.gameover-modal');
    this.pauseMenu = document.querySelector('.pause-modal');
    this.menu = document.querySelector('.menu-modal');
    this.statsPage = document.querySelector('.stats-modal');
    this.form = document.querySelector('.player-name');
    this.mute = document.querySelectorAll('.ion-android-volume-up');
    this.muted = document.querySelectorAll('.ion-android-volume-off');
    this.bgAudio = document.getElementById('bg-audio');
    this.popAudio = document.getElementById('pop');

    this.recordName = this.recordName.bind(this);

    const resume = document.getElementById('resume');
    resume.addEventListener("click", (e) => {
      e.preventDefault();
      this.gameView.resume();
      this.hideEl(this.pauseMenu);
    });

    const play = document.getElementById('play');
    play.addEventListener("click", (e) => {
      e.preventDefault();
      this.gameView.start();
      this.hideEl(this.menu);
    });

    const restart = document.getElementById('restart');
    restart.addEventListener("click", this.handleRestartButton.bind(this));

    const mainMenu = document.querySelectorAll('.main-menu');
    mainMenu.forEach(button =>
      button.addEventListener("click", this.handleMainMenuButton.bind(this))
    );

    const stats = document.getElementById('stats');
    stats.addEventListener("click", this.handleStatsButton.bind(this));

    const quit = document.getElementById('quit');
    quit.addEventListener("click", this.handleQuitButton.bind(this));

    this.form.addEventListener("submit", this.recordName);

    this.muted.forEach(mutedButton =>
      mutedButton.addEventListener("click", this.toggleMute.bind(this))
    );
    this.mute.forEach(muteButton =>
      muteButton.addEventListener("click", this.toggleMute.bind(this))
    );
  }

  pause() {
    this.showEl(this.pauseMenu);
  }

  resume() {
    this.hideEl(this.pauseMenu);
  }

  gameOver() {
    this.showEl(this.gameoverMenu);
    this.showEl(this.form);
  }

  recordName(e) {
    e.preventDefault();
    const input = document.getElementById('name-input');
    this.gameView.recordName(input.value);
    this.hideEl(this.form);
  }

  showEl(element) {
    if (element.className.slice(-7) === ' hidden') {
      element.className = element.className.slice(0, -7);
    }
  }

  hideEl(element) {
    if (element.className.slice(-7) !== ' hidden') {
      element.className += " hidden";
    }
  }

  handleRestartButton(e) {
    e.preventDefault();
    this.gameView.start();
    this.hideEl(this.gameoverMenu);
  }

  handleMainMenuButton(e) {
    e.preventDefault();
    this.gameView.clear();
    this.hideEl(this.gameoverMenu);
    this.hideEl(this.statsPage);
    this.showEl(this.menu);
  }

  handleStatsButton(e) {
    e.preventDefault();
    this.hideEl(this.menu);
    this.showEl(this.statsPage);

    // const avgScore = document.getElementById('aScore');
    // avgScore.innerHTML = `Average Score: ${this.gameView.stats.averageScore()}`;
    //
    // const avgAccuracy = document.getElementById('aAccuracy');
    // avgAccuracy.innerHTML =
    //   `Average Accuracy: ${this.gameView.stats.averageAccuracy()}%`;
    //
    // const avgMissed = document.getElementById('aMissed');
    // avgMissed.innerHTML =
    //   `Average Circles Missed: ${this.gameView.stats.averageMissed()}`;

    const statsInfo = document.getElementById('stats-info');
    statsInfo.innerHTML = '';
    this.gameView.stats.getStats().forEach((game, idx) => {
      const li = document.createElement('li');
      const rank = document.createElement('p');
      const name = document.createElement('p');
      const score = document.createElement('p');
      rank.innerHTML = `${idx + 1}. `;
      rank.style = "padding-right: 5px";
      name.innerHTML = ` ${game.gameStats.player}`;
      name.style = "flex: 2";
      score.innerHTML = game.score;
      li.appendChild(rank);
      li.appendChild(name);
      li.appendChild(score);
      statsInfo.appendChild(li);
    });
  }

  handleQuitButton(e) {
    e.preventDefault();
    this.gameView.clear();
    this.gameView.quit();
    this.hideEl(this.pauseMenu);
    this.showEl(this.menu);
  }

  toggleMute() {
    if (this.bgAudio.muted) {
      this.muted.forEach(mutedButton => this.hideEl(mutedButton));
      this.mute.forEach(muteButton => this.showEl(muteButton));
      this.bgAudio.muted = false;
      this.popAudio.muted = false;
    } else {
      this.muted.forEach(mutedButton => this.showEl(mutedButton));
      this.mute.forEach(muteButton => this.hideEl(muteButton));
      this.bgAudio.muted = true;
      this.popAudio.muted = true;
    }
  }

  playPop() {
    this.popAudio.play();
  }
}

export default Menu;
