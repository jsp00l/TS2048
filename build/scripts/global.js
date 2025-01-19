"use strict";
const CANVAS = document.getElementById("mainCanvas");
const CTX = CANVAS.getContext("2d");
const ctx = CTX;
CANVAS.width = 1200;
CANVAS.height = 1000;
let currentScore = 0;
let CLICKABLES = [];
let HOVERBALES = [];
class ColorImpl {
    rgbValue;
    constructor(rgbValue) {
        this.rgbValue = rgbValue;
    }
}
var Color;
(function (Color) {
    Color["Black"] = "rgb(0, 0, 0)";
    Color["White"] = "rgb(255, 255, 255)";
    Color["Red"] = "rgb(219, 12, 12)";
    Color["RedDark"] = "rgb(189, 1, 1)";
    Color["Blue"] = "rgb(158, 242, 255)";
    Color["Orange"] = "rgb(255, 170, 0)";
    Color["Purple"] = "rgb(107, 0, 207)";
    Color["Green"] = "rgb(0, 252, 29)";
    Color["GreenDark"] = "rgb(5, 59, 12)";
    Color["Yellow"] = "rgb(246, 255, 0)";
    Color["Gray"] = "rgb(192, 192, 192)";
    Color["Pink"] = "rgb(255, 0, 255)";
    Color["Silver"] = "rgb(169,176,180)";
    Color["Gold"] = "rgb(255,215,0)";
    Color["Default"] = "rgb(158, 242, 255)";
})(Color || (Color = {}));
