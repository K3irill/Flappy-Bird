export default class Bird {
  constructor() {
    this.x = 50;
    this.y = 150;
    this.width = 54;
    this.height = 44;
    this.velocity = 0;
    this.gravity = 0.5;
    this.jumpForce = -10;

    this.frames = [new Image(), new Image(), new Image()];

    this.frames[0].src = "assets/img/bird-1-move.png"; 
    this.frames[1].src = "assets/img/bird-2-move.png"; 
    this.frames[2].src = "assets/img/bird-3-move.png"; 

    this.currentFrame = 0; 
    this.animationSpeed = 5; 
    this.frameCounter = 0; 
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    this.frameCounter++;
    if (this.frameCounter >= this.animationSpeed) {
      this.currentFrame = (this.currentFrame + 2) % this.frames.length;
      this.frameCounter = 0;
    }
  }

  jump() {
    this.velocity = this.jumpForce;
  }

  render(ctx) {
    ctx.drawImage(
      this.frames[this.currentFrame],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  reset() {
    this.y = 150;
    this.velocity = 0;
    this.currentFrame = 0; 
  }
}
