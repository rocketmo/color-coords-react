import LEVEL_SWATCHES_1 from "./_levels/swatches-1";
import LEVEL_SWATCHES_2 from "./_levels/swatches-2";
import LEVEL_SWATCHES_3 from "./_levels/swatches-3";
import UP_THE_MIDDLE from "./_levels/up-the-middle";
import KEYS from "./_levels/keys";
import type { GridCellConfig } from "../classes/grid";

interface GameConfig {
    id: string,
    levelName: string,
    description?: React.ReactElement,
    gridConfig: GridCellConfig[][], // Specifies layout of the grid
    playerRow: number,              // Starting row for the player
    playerCol: number,              // Starting column for the player
    starRequirement3: number,       // Move requirement to get 3 stars on the level
    starRequirement2: number,       // Move requirement to get 2 stars
    requiredToUnlock: number        // Number of stars required to unlock the level
}

export type { GameConfig };

const LEVELS: GameConfig[] = [
    LEVEL_SWATCHES_1,
    LEVEL_SWATCHES_2,
    LEVEL_SWATCHES_3,
    KEYS,
    UP_THE_MIDDLE
];

export default LEVELS;
