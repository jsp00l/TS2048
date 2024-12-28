class EmptyTile {
    row;
    column;
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}
class Tile {
    value;
    row;
    column;
    color;
    static addTiles(t1, t2) {
        return new Tile((t1.value + t2.value), t2.row, t2.column);
    }
    ;
    static tryAddTiles(t1, t2, resultTile) {
        if (t1.value === t2.value) {
            resultTile = this.addTiles(t1, t2);
            return true;
        }
        return false;
    }
    static areDifferentTiles(t1, t2) {
        if (t1 instanceof EmptyTile) {
            if (t2 instanceof EmptyTile) {
                return false;
            }
            return true;
        }
        return t1.value !== t2.value;
    }
    static valueColorMap = (() => {
        let m = new Map();
        m.set(2, Color.Blue);
        m.set(4, Color.Red);
        m.set(8, Color.Orange);
        m.set(16, Color.Purple);
        m.set(32, Color.Green);
        m.set(64, Color.Yellow);
        m.set(128, Color.GreenDark);
        m.set(256, Color.Gray);
        m.set(512, Color.Pink);
        m.set(1024, Color.Silver);
        m.set(2048, Color.Gold);
        return m;
    })();
    constructor(value, row, column) {
        this.value = value;
        this.row = row;
        this.column = column;
        this.color = Tile.valueColorMap.get(value) ?? Color.Red;
    }
    ;
}
class Strip {
    tiles = new Array();
    constructor(...inputTiles) {
        for (let tile of inputTiles) {
            this.tiles.push(tile);
        }
    }
    get(col) {
        return this.tiles[col];
    }
    makeMove() {
        let tilesAdded = false;
        const moveTilesDown = () => {
            let nonEmptyTiles = [];
            for (let currentIndex = 3; currentIndex >= 0; currentIndex--) {
                const currentTile = this.tiles[currentIndex];
                if (currentTile instanceof Tile) {
                    nonEmptyTiles.push(currentTile);
                }
            }
            for (let currentIndex = 0; currentIndex < nonEmptyTiles.length; currentIndex++) {
                const goalIndex = 3 - currentIndex;
                this.tiles[goalIndex] = nonEmptyTiles[currentIndex];
            }
            for (let currentIndex = 0; currentIndex < (4 - nonEmptyTiles.length); currentIndex++) {
                this.tiles[currentIndex] = new EmptyTile(0, currentIndex);
            }
        };
        const checkIsNotEmpty = (t1, t2) => {
            return (t1 instanceof Tile) && (t2 instanceof Tile);
        };
        const checkCanAdd = (t1, t2) => {
            if (!checkIsNotEmpty(t1, t2)) {
                return false;
            }
            return t1.value === t2.value;
        };
        moveTilesDown();
        const firstTile = this.tiles[0];
        const secondTile = this.tiles[1];
        const thirdTile = this.tiles[2];
        const fourthTile = this.tiles[3];
        const checkFirstAndSecond = () => {
            if (checkIsNotEmpty(firstTile, secondTile)) {
                if (checkCanAdd(firstTile, secondTile)) {
                    this.tiles[1] = Tile.addTiles(firstTile, secondTile);
                    this.tiles[0] = new EmptyTile(0, 0);
                    tilesAdded = true;
                }
            }
        };
        if (checkIsNotEmpty(thirdTile, fourthTile)) {
            if (checkCanAdd(thirdTile, fourthTile)) {
                this.tiles[3] = Tile.addTiles(thirdTile, fourthTile);
                this.tiles[2] = new EmptyTile(0, 0);
                tilesAdded = true;
                checkFirstAndSecond();
            }
            else {
                if (checkIsNotEmpty(secondTile, thirdTile)) {
                    if (checkCanAdd(secondTile, thirdTile)) {
                        this.tiles[2] = Tile.addTiles(secondTile, thirdTile);
                        this.tiles[1] = new EmptyTile(0, 0);
                        tilesAdded = true;
                    }
                    else {
                        checkFirstAndSecond();
                    }
                }
            }
        }
        moveTilesDown();
        return tilesAdded;
    }
}
export { Tile, EmptyTile, Strip };
