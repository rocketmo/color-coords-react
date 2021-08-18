import { immerable } from "immer";
import GridCell from "./grid-cell";
import type Item from "./item";
import type { Color } from "../constants";

interface GridCellConfig {
    hasTile: boolean,
    tileColor?: Color,
    solutionColor?: Color,
    item?: Item
}

export type { GridCellConfig };

export default class Grid {
    [ immerable ] = true;
    private cells: (GridCell | null)[][];
    width: number;
    height: number;

    constructor(config: GridCellConfig[][]) {
        this.cells = config.map((row, rowIdx) => {
            return row.map((cell, colIdx) => {
                return (cell.hasTile) ?
                    new GridCell(rowIdx, colIdx, cell.tileColor, cell.solutionColor, cell.item) :
                    null;
            });
        });

        this.height = this.cells.length;
        this.width = Math.max(...this.cells.map(row => row.length));
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
                const solutionColor = this.cells[i][j]?.solutionColor ?? null;

                if (cellColor !== solutionColor) {
                    return false;
                }
            }
        }

        return true;
    }

    renderElements(showSolution: boolean): JSX.Element[] {
        const elements = [];

        for (let i = 0; i < this.cells.length; i += 1) {
            for (let j = 0; j < this.cells[i].length; j += 1) {
                const gridCell = this.cells[i][j];

                if (gridCell) {
                    elements.push(...gridCell.renderElements(showSolution));
                }
            }
        }

        return elements;
    }

    renderSolution(): JSX.Element[] {
        const elements = [];

        for (let i = 0; i < this.cells.length; i += 1) {
            for (let j = 0; j < this.cells[i].length; j += 1) {
                const gridCell = this.cells[i][j];

                if (gridCell) {
                    elements.push(gridCell.renderSolution());
                }
            }
        }

        return elements;
    }
}
