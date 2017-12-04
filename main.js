import GameView from './lib/game_view';

document.addEventListener("DOMContentLoaded", e => {
  const canvas = document.getElementById("myCanvas");
  canvas.style.backgroundColor = "rgba(77, 147, 240, 0.25)";
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext('2d');

  const gameView = new GameView(ctx, canvas);
  gameView.load();
});
