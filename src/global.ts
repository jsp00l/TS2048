const CANVAS = <HTMLCanvasElement>document.getElementById("mainCanvas");
const CTX = <CanvasRenderingContext2D>CANVAS.getContext("2d");
const ctx = CTX;
CANVAS.width = 800;
CANVAS.height = 800;
type RGB = [r: number, g: number, b: number];
let x: RGB = [200, 200, 200];
enum Color {
    Black = "rgb(0, 0, 0)",
    White = "rgb(255, 255, 255)",
    Red = "rgb(68, 7, 7)",
    RedDark = "rgb(189, 1, 1)",
    Blue = "rgb(44, 44, 114)",
    Orange = "rgb(255, 170, 0)",
    Purple = "rgb(107, 0, 207)",
    Green = "rgb(0, 252, 29)",
    GreenDark = "rgb(5, 59, 12)",
    Yellow = "rgb(246, 255, 0)",
    Gray = "rgb(192, 192, 192)",
    Pink = "rgb(255, 0, 255)",
    Silver = "rgb(169,176,180)",
    Gold = "rgb(255,215,0)"
}



