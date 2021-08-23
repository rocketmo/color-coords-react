import LEVEL_SWATCHES_1 from "./_levels/swatches-1";
import LEVEL_SWATCHES_2 from "./_levels/swatches-2";
import type { GridCellConfig } from "../classes/grid";

interface GameConfig {
    gridConfig: GridCellConfig[][],
    playerRow: number,
    playerCol: number,
    levelName: string
}

export type { GameConfig };

const LEVELS: GameConfig[] = [
    LEVEL_SWATCHES_1,
    LEVEL_SWATCHES_2
];

export default LEVELS;
