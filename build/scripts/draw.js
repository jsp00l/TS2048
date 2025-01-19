function drawRectangle(x, y, width, height, color = Color.Black) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = color;
    ctx.rect(x, y, width, height);
    ctx.stroke();
}
class AbstractShape {
    color = Color.Default;
    position = { x: 0, y: 0 };
    width = 0;
    height = 0;
}
class Rectangle extends AbstractShape {
    draw() {
        drawRectangle(this.position.x, this.position.y, this.width, this.height, this.color);
    }
}
export { drawRectangle, AbstractShape, Rectangle };
