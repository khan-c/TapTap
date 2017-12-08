import GameView from './javascripts/game_view';
import { fetchScores, saveScores } from './javascripts/api_util';

document.addEventListener("DOMContentLoaded", e => {
  const canvas = document.getElementById("myCanvas");
  canvas.style.background = "radial-gradient(rgba(5, 56, 6, 0.4), rgba(30, 157, 8, 0.7))";
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext('2d');

  const gameView = new GameView(ctx, canvas);

  window.fetchScores = fetchScores;
  window.saveScores = saveScores;
});
