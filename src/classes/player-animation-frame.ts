import GridAnimationFrame from "./grid-animation-frame";
import { AnimationType, PlayerMovementType } from "../services/constants";
import type { Color } from "../services/constants";

export default class PlayerAnimationFrame extends GridAnimationFrame {
    constructor(
        row: number,
        col: number,
        color: Color,
        movementType?: PlayerMovementType,
        isStart?: boolean
    ) {
        super(row, col, AnimationType.PLAYER, color, movementType, isStart);
    }
}
