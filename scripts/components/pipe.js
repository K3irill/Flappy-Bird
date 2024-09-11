export default class Pipe {
  constructor(x, canvas) {
    this.x = x;
    this.width = 48;
    this.gapHeight = 200;
    this.speed = 2;
    this.passed = false;
    this.topHeight = Math.random() * (canvas.height / 2) + 50;  
    this.bottomHeight = canvas.height - this.topHeight - this.gapHeight;  
    this.sprite = new Image();
    this.sprite.src = "assets/img/pipe.png";
  }

  update() {
    this.x -= this.speed; 
  }

  render(ctx) {

    ctx.save(); 
    ctx.scale(1, -1);  
    ctx.drawImage(
      this.sprite,
      this.x,
      -this.topHeight,
      this.width,
      this.topHeight
    );
    ctx.restore(); 


    ctx.drawImage(
      this.sprite,
      this.x,
      ctx.canvas.height - this.bottomHeight,
      this.width,
      this.bottomHeight
    );
  }

  checkCollision(bird, canvasHeight) {

    const hitTopPipe =
      bird.x + bird.width > this.x &&
      bird.x < this.x + this.width &&
      bird.y < this.topHeight;

    const hitBottomPipe =
      bird.x + bird.width > this.x &&
      bird.x < this.x + this.width &&
      bird.y + bird.height > canvasHeight - this.bottomHeight;

    return hitTopPipe || hitBottomPipe;
  }
}
