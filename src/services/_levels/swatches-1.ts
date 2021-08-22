import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_1: GameConfig = {
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.BLUE, item: new Swatch(Color.BLUE) }
        ],
        [
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE }
        ],
        [
            { hasTile: true, solutionColor: Color.RED, item: new Swatch(Color.RED) },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED }
        ]
    ],
    playerRow: 1,
    playerCol: 1,
    levelName: "Swatches I"
};

export default LEVEL_SWATCHES_1;
