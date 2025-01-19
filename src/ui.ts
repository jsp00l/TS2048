import { drawRectangle, Point, Rectangle } from "./draw.js";

interface Hoverable {
    onHovered(): void;
    onUnhovered(): void;
    contains(p: Point): boolean
}
interface Clickable {
    onClicked(): void;
    contains(p: Point): boolean
}
export class Button extends Rectangle implements Hoverable, Clickable {
    public text: string = "";
    constructor() {
        super();
        CLICKABLES.push(this);
        HOVERBALES.push(this);
        this.width = 250;
        this.height = 80;
        this.color = Color.Blue;
    }
    draw(): void {
        drawRectangle(this.position.x, this.position.y, this.width, this.height, this.color);
        ctx.font = "32px serif";
        ctx.fillText(this.text, this.position.x + 90, this.position.y + 50);
    }
    contains(p: Point): boolean {
        const left = this.position.x;
        const right = this.position.x + this.width;
        const top = this.position.y;
        const bottom = this.position.y + this.height;
        return p.x >= left && p.x <= right && p.y >= top && p.y <= bottom;
    }
    onClicked(): void {
        throw new Error("Method not implemented.");
    }
    onHovered(): void {
        throw new Error("Method not implemented.");
    }
    onUnhovered(): void {
        throw new Error("Method not implemented.");
    }
}