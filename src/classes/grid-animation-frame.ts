import { AnimationType, PlayerMovementType } from "../services/constants";
import type { Color } from "../services/constants";

export default abstract class GridAnimationFrame {
    row: number;
    col: number;
    animationType: AnimationType;
    color: Color;
    movementType?: PlayerMovementType;
    isStart?: boolean;

    constructor(
        row: number,
        col: number,
        animationType: AnimationType,
        color: Color,
        movementType?: PlayerMovementType,
        isStart?: boolean // Set to true if this frame is the start of a chain of moves
    ) {
        this.row = row;
        this.col = col;
        this.animationType = animationType;
        this.color = color;
        this.movementType = movementType;
        this.isStart = isStart;
    }

    isPlayerAnimation(): boolean {
        return this.animationType === AnimationType.PLAYER;
    }

    isTileAnimation(): boolean {
        return this.animationType === AnimationType.TILE;
    }
}
