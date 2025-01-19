import { drawRectangle, Rectangle } from "./draw.js";
export class Button extends Rectangle {
    text = "";
    constructor() {
        super();
        CLICKABLES.push(this);
        HOVERBALES.push(this);
        this.width = 250;
        this.height = 80;
        this.color = Color.Blue;
    }
    draw() {
        drawRectangle(this.position.x, this.position.y, this.width, this.height, this.color);
        ctx.font = "32px serif";
        ctx.fillText(this.text, this.position.x + 90, this.position.y + 50);
    }
    contains(p) {
        const left = this.position.x;
        const right = this.position.x + this.width;
        const top = this.position.y;
        const bottom = this.position.y + this.height;
        return p.x >= left && p.x <= right && p.y >= top && p.y <= bottom;
    }
    onClicked() {
        throw new Error("Method not implemented.");
    }
    onHovered() {
        throw new Error("Method not implemented.");
    }
    onUnhovered() {
        throw new Error("Method not implemented.");
    }
}
