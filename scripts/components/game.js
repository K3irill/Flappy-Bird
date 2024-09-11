import Bird from "./bird.js";
import Pipe from "./pipe.js";
import ScoreManager from "./scoreManager.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const bird = new Bird();
  const pipes = [];
  let frame = 0;
  const scoreManager = new ScoreManager();
  let isGameOver = false;

  function createPipes() {
    if (frame % 150 === 0) {
      pipes.push(new Pipe(canvas.width, canvas));
    }
  }

  function update() {
    if (isGameOver) return;

    frame++;
    bird.update();
    pipes.forEach((pipe) => pipe.update());

    pipes.forEach((pipe, index) => {
      if (pipe.x + pipe.width < 0) {
        pipes.splice(index, 1);
      }
    });

    createPipes();

    pipes.forEach((pipe) => {
      if (pipe.checkCollision(bird, canvas.height)) {
        isGameOver = true;
      }

      if (!pipe.passed && pipe.x < bird.x) {
        scoreManager.updateScore();
        pipe.passed = true;
      }
    });

    if (bird.y + bird.height >= canvas.height) {
      isGameOver = true;
    }

    scoreManager.render();
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.render(ctx);
    pipes.forEach((pipe) => pipe.render(ctx));
  }

  function gameLoop() {
    update();
    render();
    if (!isGameOver) {
      requestAnimationFrame(gameLoop);
    }
  }

  document.getElementById("restartButton").addEventListener("click", () => {
    bird.reset();
    pipes.length = 0;
    scoreManager.reset();
    isGameOver = false;
    frame = 0;
    gameLoop();
  });

  canvas.addEventListener("click", () => {
    bird.jump();
  });

  gameLoop();
});
