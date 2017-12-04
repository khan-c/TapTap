class Circle {
  constructor(x, y, game) {
    this.radius = 50;
    this.x = Math.random() * (x - 2 * this.radius) + this.radius;
    this.y = Math.random() * (y - 2 * this.radius) + this.radius;
    this.game = game;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "rgb(249, 224, 34)";
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  }

  isClicked(mouseX, mouseY) {
    const distance = Math.sqrt((this.x - mouseX)**2 + (this.y - mouseY)**2);
    if (distance < this.radius) {
      return true;
    }
    return false;
  }


}

export default Circle;
