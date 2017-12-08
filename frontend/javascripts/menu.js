class Menu {
  constructor(gameView) {
    this.gameView = gameView;
    this.gameoverMenu = document.querySelector('.gameover-modal');
    this.pauseMenu = document.querySelector('.pause-modal');
    this.menu = document.querySelector('.menu-modal');
    this.playMenu = document.querySelector('.play-modal');
    this.howTo = document.querySelector('.how-to-modal');
    this.statsPage = document.querySelector('.stats-modal');
    this.form = document.querySelector('.player-name');
    this.mute = document.querySelectorAll('.ion-android-volume-up');
    this.muted = document.querySelectorAll('.ion-android-volume-off');
    this.bgAudio = document.getElementById('bg-audio');
    this.popAudio = document.getElementById('pop');
    this.badAudio = document.getElementById('negative');
    this.goldAudio = document.getElementById('gold');

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
      this.hideEl(this.menu);
      this.showEl(this.playMenu);
    });

    const casual = document.getElementById('casual');
    casual.addEventListener("click", (e) => {
      e.preventDefault();
      this.gameView.start();
      this.hideEl(this.playMenu);
    });

    const restart = document.getElementById('restart');
    restart.addEventListener("click", this.handleRestartButton.bind(this));

    const mainMenu = document.querySelectorAll('.main-menu');
    mainMenu.forEach(button =>
      button.addEventListener("click", this.handleMainMenuButton.bind(this))
    );

    const howToButton = document.getElementById('how-to');
    howToButton.addEventListener("click", this.handleHowToButton.bind(this));

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
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 77) {
        this.toggleMute();
      }
    });
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
    this.hideEl(this.howTo);
    this.hideEl(this.playMenu);
    this.showEl(this.menu);
  }

  handleHowToButton(e) {
    e.preventDefault();
    this.hideEl(this.menu);
    this.showEl(this.howTo);
  }

  handleStatsButton(e) {
    e.preventDefault();
    this.hideEl(this.menu);
    this.showEl(this.statsPage);

    const statsInfo = document.getElementById('stats-info');
    statsInfo.innerHTML = '';
    // const highScores = this.gameView.stats.fetchStats();
    // console.log(highScores);
    this.gameView.stats.getStats().forEach((game, idx) => {
      const li = document.createElement('li');
      const rank = document.createElement('p');
      const name = document.createElement('p');
      const score = document.createElement('p');
      rank.innerHTML = `${idx + 1}. `;
      rank.className = "rank";
      name.innerHTML = ` ${game.gameStats.player}`;
      name.className = "high-score-name";
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
      this.badAudio.muted = false;
      this.goldAudio.muted = false;
    } else {
      this.muted.forEach(mutedButton => this.showEl(mutedButton));
      this.mute.forEach(muteButton => this.hideEl(muteButton));
      this.bgAudio.muted = true;
      this.popAudio.muted = true;
      this.badAudio.muted = true;
      this.goldAudio.muted = true;
    }
  }

  playPop() {
    this.popAudio.play();
  }

  playBad() {
    this.badAudio.play();
  }

  playGold() {
    this.goldAudio.play();
  }
}

export default Menu;
