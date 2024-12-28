function drawRectangle(x, y, width, height, color = Color.Black) {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}
export { drawRectangle };
