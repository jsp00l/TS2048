const CANVAS = <HTMLCanvasElement>document.getElementById("mainCanvas");
const CTX = <CanvasRenderingContext2D>CANVAS.getContext("2d");
const ctx = CTX;
CANVAS.width = 1200;
CANVAS.height = 1000;
type RGB = [r: number, g: number, b: number];
let currentScore: number = 0;

let CLICKABLES: any[] = [];
let HOVERBALES: any[] = [];

let lastTimestamp: number = 0;

class ColorImpl {
    rgbValue: string;

    constructor(rgbValue: string) {
        this.rgbValue = rgbValue;
    }
}

enum Color {
    Black = "rgb(0, 0, 0)",
    White = "rgb(255, 255, 255)",
    Red = "rgb(219, 12, 12)",
    RedDark = "rgb(189, 1, 1)",
    Blue = "rgb(158, 242, 255)",
    Orange = "rgb(255, 170, 0)",
    Purple = "rgb(107, 0, 207)",
    Green = "rgb(0, 252, 29)",
    GreenDark = "rgb(5, 59, 12)",
    Yellow = "rgb(246, 255, 0)",
    Gray = "rgb(192, 192, 192)",
    Pink = "rgb(255, 0, 255)",
    Silver = "rgb(169,176,180)",
    Gold = "rgb(255,215,0)",
    Default = Blue,
}

