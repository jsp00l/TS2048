import { drawRectangle } from "./draw.js";
import { Tile, EmptyTile, Strip } from "./tile.js";
window.Game = window.Game || {};
const padding = 8;
const squareWidth = (CANVAS.width - padding * 5) / 4;
let counter = 1;
let tiles = new Array(4);
for (let i = 0; i < 4; ++i) {
    tiles[i] = new Array(4);
}
for (let col = 0; col < 4; ++col) {
    for (let row = 0; row < 4; ++row) {
        tiles[row][col] = new EmptyTile(row, col);
    }
}
window.Game.tiles = tiles;
function drawScore() {
    ctx.font = "48px serif";
    ctx.fillStyle = Color.Black;
    ctx.fillText(currentScore + "", 400, 900);
}
function drawTiles() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            const x = padding + padding * j + squareWidth * j;
            const y = padding + padding * i + squareWidth * i;
            const tile = tiles[i][j];
            const color = tile instanceof EmptyTile ? Color.Black : tile?.color;
            drawRectangle(x, y, squareWidth, squareWidth, color);
            if (tile instanceof EmptyTile) {
                continue;
            }
            const s = tile?.value;
            ctx.font = "48px serif";
            ctx.fillStyle = Color.White;
            const offset = s.length > 1 ? 20 : 10;
            ctx.fillText(s, -offset + x + squareWidth / 2, offset + y + squareWidth / 2);
        }
    }
    drawScore();
}
tiles[0][0] = new Tile(8, 1, 2);
tiles[1][0] = new Tile(4, 1, 2);
tiles[2][0] = new Tile(2, 1, 2);
tiles[3][0] = new Tile(2, 1, 2);
tiles[0][1] = new EmptyTile(1, 0);
tiles[1][1] = new EmptyTile(1, 2);
tiles[2][1] = new EmptyTile(1, 2);
tiles[3][1] = new EmptyTile(1, 2);
tiles[0][2] = new EmptyTile(1, 0);
tiles[1][2] = new EmptyTile(1, 2);
tiles[2][2] = new EmptyTile(1, 2);
tiles[3][2] = new EmptyTile(1, 2);
tiles[0][3] = new EmptyTile(1, 0);
tiles[1][3] = new EmptyTile(1, 2);
tiles[2][3] = new EmptyTile(1, 2);
tiles[3][3] = new EmptyTile(1, 2);
drawTiles();
function spawnRandomTile() {
    let pairs = new Array();
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            const tile = tiles[i][j];
            if (tile instanceof EmptyTile) {
                pairs.push([i, j]);
            }
        }
    }
    if (pairs.length === 0) {
        return;
    }
    let [i, j] = pairs[Math.floor(Math.random() * pairs.length)];
    let spawnedTile = new Tile(2, i, j);
    if (Math.floor(Math.random() * 100) > 90) {
        spawnedTile = new Tile(4, i, j);
    }
    tiles[i][j] = spawnedTile;
}
function performDownMove() {
    let tilesAdded = false;
    for (let col = 0; col < 4; ++col) {
        let s = new Strip(tiles[0][col], tiles[1][col], tiles[2][col], tiles[3][col]);
        tilesAdded = s.makeMove() || tilesAdded;
        let wasDifferent = Tile.areDifferentTiles(tiles[0][col], s.tiles[0])
            || Tile.areDifferentTiles(tiles[1][col], s.tiles[1])
            || Tile.areDifferentTiles(tiles[2][col], s.tiles[2])
            || Tile.areDifferentTiles(tiles[3][col], s.tiles[3]);
        if (wasDifferent) {
            tilesAdded = true;
        }
        tiles[0][col] = s.tiles[0];
        tiles[1][col] = s.tiles[1];
        tiles[2][col] = s.tiles[2];
        tiles[3][col] = s.tiles[3];
    }
    drawTiles();
    return tilesAdded;
}
function performUpMove() {
    let tilesAdded = false;
    for (let col = 0; col < 4; ++col) {
        let s = new Strip(tiles[3][col], tiles[2][col], tiles[1][col], tiles[0][col]);
        tilesAdded = s.makeMove() || tilesAdded;
        let wasDifferent = Tile.areDifferentTiles(tiles[0][col], s.tiles[3])
            || Tile.areDifferentTiles(tiles[1][col], s.tiles[2])
            || Tile.areDifferentTiles(tiles[2][col], s.tiles[1])
            || Tile.areDifferentTiles(tiles[3][col], s.tiles[0]);
        if (wasDifferent) {
            tilesAdded = true;
        }
        tiles[0][col] = s.tiles[3];
        tiles[1][col] = s.tiles[2];
        tiles[2][col] = s.tiles[1];
        tiles[3][col] = s.tiles[0];
    }
    drawTiles();
    return tilesAdded;
}
function performRightMove() {
    let tilesAdded = false;
    for (let row = 0; row < 4; ++row) {
        let s = new Strip(tiles[row][0], tiles[row][1], tiles[row][2], tiles[row][3]);
        tilesAdded = s.makeMove() || tilesAdded;
        let wasDifferent = Tile.areDifferentTiles(tiles[row][0], s.tiles[0])
            || Tile.areDifferentTiles(tiles[row][1], s.tiles[1])
            || Tile.areDifferentTiles(tiles[row][2], s.tiles[2])
            || Tile.areDifferentTiles(tiles[row][3], s.tiles[0]);
        if (wasDifferent) {
            tilesAdded = true;
        }
        tiles[row][0] = s.tiles[0];
        tiles[row][1] = s.tiles[1];
        tiles[row][2] = s.tiles[2];
        tiles[row][3] = s.tiles[3];
    }
    drawTiles();
    return tilesAdded;
}
function performLeftMove() {
    let tilesAdded = false;
    for (let row = 0; row < 4; ++row) {
        let s = new Strip(tiles[row][3], tiles[row][2], tiles[row][1], tiles[row][0]);
        tilesAdded = s.makeMove() || tilesAdded;
        let wasDifferent = Tile.areDifferentTiles(tiles[row][0], s.tiles[3])
            || Tile.areDifferentTiles(tiles[row][1], s.tiles[2])
            || Tile.areDifferentTiles(tiles[row][2], s.tiles[1])
            || Tile.areDifferentTiles(tiles[row][3], s.tiles[0]);
        if (wasDifferent) {
            tilesAdded = true;
        }
        tiles[row][0] = s.tiles[3];
        tiles[row][1] = s.tiles[2];
        tiles[row][2] = s.tiles[1];
        tiles[row][3] = s.tiles[0];
    }
    drawTiles();
    return tilesAdded;
}
document.addEventListener("keyup", (e) => {
    let shouldSpawnNewTile = false;
    if (e.key === 'a') {
        shouldSpawnNewTile = performLeftMove();
    }
    else if (e.key === 'd') {
        shouldSpawnNewTile = performRightMove();
    }
    else if (e.key === 'w') {
        shouldSpawnNewTile = performUpMove();
    }
    else if (e.key === 's') {
        shouldSpawnNewTile = performDownMove();
    }
    if (shouldSpawnNewTile) {
        spawnRandomTile();
    }
    drawTiles();
});
