const CANVAS = <HTMLCanvasElement>document.getElementById("mainCanvas");
const CTX = <CanvasRenderingContext2D>CANVAS.getContext("2d");
const ctx = CTX;
CANVAS.width = 800;
CANVAS.height = 800;
enum Color {
    Black = "rgb(0, 0, 0)",
    White = "rgb(255, 255, 255)",
    Red = "rgb(68, 7, 7)",
    RedDark = "rgb(189, 1, 1)",
    Blue = "rgb(44, 44, 114)",
}