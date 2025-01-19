function drawRectangle(x: number, y: number, width: number, height: number, color: Color = Color.Black): void {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.shadowBlur = 12;
    // ctx.shadowOffsetX = 25;
    // ctx.shadowOffsetY = 25;
    ctx.shadowColor = color;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    //ctx.fill();
}

type Point = {
    x: number,
    y: number
}

abstract class AbstractShape {
    color: Color = Color.Default;
    position: Point = { x: 0, y: 0 };
    width: number = 0;
    height: number = 0;
    abstract draw(): void;
}

class Rectangle extends AbstractShape {

    draw(): void {
        drawRectangle(this.position.x, this.position.y, this.width, this.height, this.color);
    }
}

export { drawRectangle, AbstractShape, Rectangle, Point };