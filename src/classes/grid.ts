import { immerable } from "immer";
import { Color } from "../constants";
import GridCell from "./grid-cell";
import Item from "./item";

export interface GridCellConfig {
    hasTile: boolean,
    tileColor?: Color,
    solutionColor?: Color,
    item?: Item
}

export default class Grid {
    [ immerable ] = true;
    cells: (GridCell | null)[][];
    solution: (Color | null)[][];

    constructor(config: GridCellConfig[][]) {
        this.cells = config.map((row, rowIdx) => {
            return row.map((cell, colIdx) => {
                return (cell.hasTile) ?
                    new GridCell(rowIdx, colIdx, cell.tileColor, cell.item) : null;
            });
        });

        this.solution = config.map(row => {
            return row.map(cell => {
                return (cell.hasTile) ? (cell.solutionColor ?? Color.DEFAULT) : null;
            });
        });
    }

    // Returns GridCell if one exists at the given position
    getCellAt(row: number, col: number): (GridCell | null) {
        if (this.cells[row] && this.cells[row][col]) {
            return this.cells[row][col];
        }

        return null;
    }

    isGridSolved(): boolean {
        for (let i = 0; i < this.cells.length; i += 1) {
            for (let j = 0; j < this.cells[i].length; j += 1) {
                const cellColor = this.cells[i][j]?.color ?? null;
                const solutionColor = this.solution[i][j] ?? null;

                if (cellColor !== solutionColor) {
                    return false;
                }
            }
        }

        return true;
    }

    renderElements(): JSX.Element[] {
        const elements = [];

        for (let i = 0; i < this.cells.length; i += 1) {
            for (let j = 0; j < this.cells[i].length; j += 1) {
                const gridCell = this.cells[i][j];

                if (gridCell) {
                    elements.push(...gridCell.renderElements());
                }
            }
        }

        return elements;
    }
}
