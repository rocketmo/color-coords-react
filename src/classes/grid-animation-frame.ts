import { Color } from "../constants";

export default class GridAnimationFrame {
    row: number;
    col: number;
    gridColor?: Color;

    constructor(row: number, col: number, gridColor?: Color) {
        this.row = row;
        this.col = col;
        this.gridColor = gridColor;
    }
}
