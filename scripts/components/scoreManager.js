export default class ScoreManager {
  constructor() {
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.currentLevel = 1;
    this.updateHighScore();
  }

  updateScore() {
    this.score++;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.updateHighScore();
    }

    if (this.score >= 20 && this.score < 35) {
      this.currentLevel = 2;
    } else if (this.score >= 35 && this.score < 60) {
      this.currentLevel = 3;
    } else if (this.score >= 60 && this.score < 100) {
      this.currentLevel = 4;
    } else if (this.score >= 100) {
      this.currentLevel = 5;
    }
  }

  updateHighScore() {
    localStorage.setItem("highScore", this.highScore);
  }

  render() {
    document.getElementById("score").textContent = `Score: ${this.score}`;
    document.getElementById(
      "highScore"
    ).textContent = `High Score: ${this.highScore}`;
    document.getElementById(
      "level"
    ).textContent = `Level: ${this.currentLevel}`;
  }

  reset() {
    this.score = 0;
    this.currentLevel = 1;
    this.render();
  }
}
