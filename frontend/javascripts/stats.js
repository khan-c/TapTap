import { saveScores, fetchScores } from './api_util';

class Stats {
  constructor() {
    this.games = [];
  }

  addGame(game) {
    this.games.push(game);
  }

  getStats() {
    fetchScores().then(scores => {
      this.parse(JSON.parse(scores));
    });
  }

  parse(scores) {
    const highScores = Object.values(scores);
    // .sort(
    //   (game1, game2) => game2 - game1.score
    // );

    return highScores.slice(0,10);
  }

  saveStats(score) {
    saveScores(score);
  }

  averageScore() {
    if (this.games.length === 0) {
      return 0;
    }
    const scores = this.games.map(game => game.score);
    return this.average(scores);
  }

  averageAccuracy() {
    if (this.games.length === 0) {
      return 0;
    }
    const accuracies = this.games.map(game => game.clickAccuracy());
    return this.average(accuracies);
  }

  averageMissed() {
    if (this.games.length === 0) {
      return 0;
    }
    const missed = this.games.map(game => game.gameStats.misses);
    return this.average(missed);
  }

  average(array) {
    return array.reduce((acc, el) => acc + el) / array.length;
  }
}

export default Stats;
