import GridAnimationFrame from "./grid-animation-frame";
import { AnimationType } from "../constants";
import type { Color } from "../constants";

export default class TileAnimationFrame extends GridAnimationFrame {
    constructor(row: number, col: number, color: Color) {
        super(row, col, AnimationType.TILE, color);
    }
}
