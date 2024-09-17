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
  let currentLevel = 1;
  let isMusicStarted = false;

  const levelMusic = [
    new Audio("assets/audio/level1.mp3"),
    new Audio("assets/audio/level2.mp3"),
    new Audio("assets/audio/level3.mp3"),
    new Audio("assets/audio/level4.mp3"),
    new Audio("assets/audio/level5.mp3"),
  ];

  function stopMusic() {
    levelMusic.forEach((music) => {
      music.pause();
      music.currentTime = 0;
    });
  }

  function playMusic(level) {
    stopMusic();
    const music = levelMusic[level - 1];
    if (music) {
      music.play();
      music.loop = true;
    }
  }

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
        stopMusic();
      }

      if (!pipe.passed && pipe.x < bird.x) {
        scoreManager.updateScore();
        pipe.passed = true;
      }
    });

    if (bird.y + bird.height >= canvas.height) {
      isGameOver = true;
      stopMusic();
    }

    scoreManager.render();

    const newLevel = scoreManager.currentLevel;
    if (currentLevel !== newLevel) {
      currentLevel = newLevel;
      playMusic(currentLevel);
    }
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
    isMusicStarted = false;
    currentLevel = 1;
    stopMusic();
    gameLoop();
  });

  canvas.addEventListener("click", () => {
    bird.jump();

    if (!isMusicStarted) {
      playMusic(currentLevel);
      isMusicStarted = true;
    }
  });

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code === "Space") {
      bird.jump();

      if (!isMusicStarted) {
        playMusic(currentLevel);
        isMusicStarted = true;
      }
    }
  });

  gameLoop();
});
