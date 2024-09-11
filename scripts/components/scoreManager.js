export default class ScoreManager {
  constructor() {
    this.currentScore = 0;
    this.bestScore = localStorage.getItem("bestScore") || 0;
  }

  updateScore() {
    this.currentScore++;
    if (this.currentScore > this.bestScore) {
      this.bestScore = this.currentScore;
      localStorage.setItem("bestScore", this.bestScore);
    }
  }

  render() {
    document.getElementById("currentScore").textContent = this.currentScore;
    document.getElementById("bestScore").textContent = this.bestScore;
  }

  reset() {
    this.currentScore = 0;
  }
}
