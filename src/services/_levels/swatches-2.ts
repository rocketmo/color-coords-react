import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_2: GameConfig = {
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.GREEN, item: new Swatch(Color.GREEN) },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.YELLOW, item: new Swatch(Color.YELLOW) }
        ],
        [
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.YELLOW }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.GREEN }
        ]
    ],
    playerRow: 3,
    playerCol: 2,
    levelName: "Swatches II"
};

export default LEVEL_SWATCHES_2;