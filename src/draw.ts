function drawRectangle(x: number, y: number, width: number, height: number, color: Color = Color.Black): void {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}
export { drawRectangle };