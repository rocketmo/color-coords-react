import { Color, PlayerMovementType, DIR_OFFSET } from "../services/constants";
import type Grid from "./grid";
import type GridCell from "./grid-cell";
import type { Direction } from "../services/constants";

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
    gridCellMovedTo?: GridCell,
    movementType?: PlayerMovementType
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
        let rowOffset = 0;
        let colOffset = 0;
        const currCell = this.grid.getCellAt(this.row, this.col);
        let directionMoved;

        // Determine where to move
        if (movement.currentDirection) {
            const offset = DIR_OFFSET[movement.currentDirection];
            rowOffset = offset.rowOffset;
            colOffset = offset.colOffset;
            directionMoved = movement.currentDirection;
        } else if (currCell?.ice && movement.prevDirection) {
            const offset = DIR_OFFSET[movement.prevDirection];
            rowOffset = offset.rowOffset;
            colOffset = offset.colOffset;
            directionMoved = movement.prevDirection;
        }

        // Determine final grid tile
        if ((rowOffset !== 0 || colOffset !== 0) && directionMoved) {
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

                let moveType = PlayerMovementType.DEFAULT;
                if (currCell?.ice && gridCell.ice && !movement.currentDirection) {
                    moveType = PlayerMovementType.ON_ICE;
                } else if (gridCell.ice) {
                    moveType = PlayerMovementType.TO_ICE;
                } else if (currCell?.ice && movement.prevDirection) {
                    moveType = PlayerMovementType.FROM_ICE;
                }

                return {
                    moved: true,
                    newRow: this.row,
                    newCol: this.col,
                    newColor: this.color,
                    directionMoved: directionMoved,
                    gridCellMovedTo: gridCell,
                    movementType: moveType
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
