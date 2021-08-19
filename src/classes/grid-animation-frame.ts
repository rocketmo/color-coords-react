import { AnimationType } from "../services/constants";
import type { Color } from "../services/constants";

export default abstract class GridAnimationFrame {
    row: number;
    col: number;
    animationType: AnimationType;
    color: Color;

    constructor(row: number, col: number, animationType: AnimationType, color: Color) {
        this.row = row;
        this.col = col;
        this.animationType = animationType;
        this.color = color;
    }

    isPlayerAnimation(): boolean {
        return this.animationType === AnimationType.PLAYER;
    }

    isTileAnimation(): boolean {
        return this.animationType === AnimationType.TILE;
    }
}
