import GridAnimationFrame from "./grid-animation-frame";
import { AnimationType } from "../constants";
import type { Color } from "../constants";

export default class PlayerAnimationFrame extends GridAnimationFrame {
    constructor(row: number, col: number, color: Color) {
        super(row, col, AnimationType.PLAYER, color);
    }
}
