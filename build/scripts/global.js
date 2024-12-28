"use strict";
const CANVAS = document.getElementById("mainCanvas");
const CTX = CANVAS.getContext("2d");
const ctx = CTX;
CANVAS.width = 800;
CANVAS.height = 800;
var Color;
(function (Color) {
    Color["Black"] = "rgb(0, 0, 0)";
    Color["White"] = "rgb(255, 255, 255)";
    Color["Red"] = "rgb(68, 7, 7)";
    Color["RedDark"] = "rgb(189, 1, 1)";
    Color["Blue"] = "rgb(44, 44, 114)";
})(Color || (Color = {}));
