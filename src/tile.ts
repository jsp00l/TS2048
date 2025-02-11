type Row = 0 | 1 | 2 | 3
type Column = 0 | 1 | 2 | 3
type Value = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048

interface ITile {
    value?: Value;
    color?: Color;
    column: Column;
    row: Row;
}
class EmptyTile implements ITile {
    constructor(public row: Row, public column: Column) { }
}
class Tile implements ITile {
    color: Color;

    static addTiles(t1: Tile, t2: Tile): Tile {
        currentScore += t1.value + t2.value;
        return new Tile(<Value>(t1.value + t2.value), t2.row, t2.column);
    };

    static tryAddTiles(t1: Tile, t2: Tile, resultTile: Tile | undefined): boolean {
        if (t1.value === t2.value) {
            resultTile = this.addTiles(t1, t2);
            return true;
        }
        return false;
    }

    static areDifferentTiles(t1: ITile, t2: ITile): boolean {
        if (t1 instanceof EmptyTile) {
            if (t2 instanceof EmptyTile) {
                return false;
            }
            return true;
        }
        return t1.value !== t2.value;
    }

    static valueColorMap: Map<Value, Color> = (() => {
        let m: Map<Value, Color> = new Map<Value, Color>();
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

    constructor(public value: Value, public row: Row, public column: Column,) {
        this.color = Tile.valueColorMap.get(value) ?? Color.Red;
    };
}

interface IStrip {
    get(col: Column): ITile
    makeMove(): boolean
}

class Strip implements IStrip {
    tiles: ITile[] = new Array<ITile>();
    constructor(...inputTiles: ITile[]) {
        for (let tile of inputTiles) {
            this.tiles.push(tile)
        }
    }
    get(col: Column) {
        return this.tiles[col];
    }

    makeMove(): boolean {
        let tilesAdded: boolean = false;
        const moveTilesDown = () => {
            let nonEmptyTiles: Tile[] = [];
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
                this.tiles[currentIndex] = new EmptyTile(0, currentIndex as Column);
            }

        };
        const checkIsNotEmpty = (t1: ITile, t2: ITile): boolean => {
            return (t1 instanceof Tile) && (t2 instanceof Tile)
        };
        const checkCanAdd = (t1: ITile, t2: ITile): boolean => {
            if (!checkIsNotEmpty(t1, t2)) {
                return false;
            }
            return t1.value === t2.value;
        }
        moveTilesDown();
        const firstTile = this.tiles[0];
        const secondTile = this.tiles[1];
        const thirdTile = this.tiles[2];
        const fourthTile = this.tiles[3];


        const checkFirstAndSecond = (): void => {
            if (checkIsNotEmpty(firstTile, secondTile)) {
                if (checkCanAdd(firstTile, secondTile)) {
                    this.tiles[1] = Tile.addTiles(firstTile as Tile, secondTile as Tile);
                    this.tiles[0] = new EmptyTile(0, 0);
                    tilesAdded = true;
                }
            }
        };

        if (checkIsNotEmpty(thirdTile, fourthTile)) {
            if (checkCanAdd(thirdTile, fourthTile)) {
                this.tiles[3] = Tile.addTiles(thirdTile as Tile, fourthTile as Tile);
                this.tiles[2] = new EmptyTile(0, 0);
                tilesAdded = true;
                checkFirstAndSecond();
            }
            else {
                if (checkIsNotEmpty(secondTile, thirdTile)) {
                    if (checkCanAdd(secondTile, thirdTile)) {
                        this.tiles[2] = Tile.addTiles(secondTile as Tile, thirdTile as Tile);
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



export { Tile, EmptyTile, Row, Column, Value, Strip }