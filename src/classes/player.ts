import { Color, Direction, DIR_OFFSET } from "../constants";
import GridCell from "./grid-cell";

export interface PlayerMovement {
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

export default class Player {
    row: number;
    col: number;
    grid: (GridCell | null)[][];
    color: Color;

    constructor(row: number, col: number, grid: (GridCell | null)[][], color?: Color) {
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
            const gridCell = this.grid[nextRow] && this.grid[nextRow][nextCol];

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
