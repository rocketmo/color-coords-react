import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_2: GameConfig = {
    id: "czdtzyW72UKVkwfmYkRCAA==",
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.ORANGE }
        ],
        [
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.ORANGE }
        ],
        [
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.ORANGE, item: new Swatch(Color.ORANGE) },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE, item: new Swatch(Color.PURPLE) }
        ],
        [
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE }
        ]
    ],
    playerRow: 2,
    playerCol: 2,
    levelName: "Swatches II",
    starRequirement3: 17,
    starRequirement2: 20,
    requiredToUnlock: 1
};

export default LEVEL_SWATCHES_2;
