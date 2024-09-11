export default class Bird {
    constructor() {
      this.x = 50;
      this.y = 150;
      this.width = 34;
      this.height = 24;
      this.velocity = 0;
      this.gravity = 0.5;
      this.jumpForce = -10;
      this.sprite = new Image();
      this.sprite.src = 'assets/img/bird.png';
    }
  
    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;
  
      if (this.y < 0) {
        this.y = 0;
        this.velocity = 0;
      }
    }
  
    jump() {
      this.velocity = this.jumpForce;
    }
  
    render(ctx) {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  
    reset() {
      this.y = 150;
      this.velocity = 0;
    }
  }