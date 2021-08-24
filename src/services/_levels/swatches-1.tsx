import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_1: GameConfig = {
    id: "X08Cn2VWa0C6YvdCaTQMFw==",
    description: <p>An introduction to the game of <em>Color Coords</em>.</p>,
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
