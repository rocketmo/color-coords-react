import { Color, DIR_OFFSET } from "../constants";
import type Grid from "./grid";
import type GridCell from "./grid-cell";
import type { Direction } from "../constants";

interface PlayerMovement {
    currentDirection: (Direction | null),
    prevDirection: (Direction | null)
}

interface PlayerMovementResult {
    moved: boolean,
    newRow: number,
    newCol: number,
    newColor: Color,
    directionMoved?: Direction,
    gridCellMovedTo?: GridCell
}

export type { PlayerMovement };

export default class Player {
    row: number;
    col: number;
    grid: Grid;
    color: Color;

    constructor(row: number, col: number, grid: Grid, color?: Color) {
        this.row = row;
        this.col = col;
        this.grid = grid;
        this.color = color ?? Color.DEFAULT;
    }

    move(movement: PlayerMovement): PlayerMovementResult {
        if (movement.currentDirection) {
            const { rowOffset, colOffset } = DIR_OFFSET[movement.currentDirection];
            const nextRow = this.row + rowOffset;
            const nextCol = this.col + colOffset;
            const gridCell = this.grid.getCellAt(nextRow, nextCol);

            if (gridCell) {
                this.row = nextRow;
                this.col = nextCol;

                // Change the player color if possible
                let nextPlayerColor;
                if (gridCell.item && (nextPlayerColor = gridCell.item.updatePlayerColor())) {
                    this.color = nextPlayerColor;
                }

                return {
                    moved: true,
                    newRow: this.row,
                    newCol: this.col,
                    newColor: this.color,
                    directionMoved: movement.currentDirection,
                    gridCellMovedTo: gridCell
                };
            }
        }

        return {
            moved: false,
            newRow: this.row,
            newCol: this.col,
            newColor: this.color
        };
    }
}
