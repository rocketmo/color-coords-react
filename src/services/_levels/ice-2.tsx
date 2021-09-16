import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const ICE_2: GameConfig = {
    id: "85WkcFxQFk6YcxuxVD/VEg==",
    gridConfig: [
        [
            { hasTile: false },
            { hasTile: true, solutionColor: Color.GREEN, ice: true },
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, solutionColor: Color.RED, ice: true },
            { hasTile: true, solutionColor: Color.RED, ice: true }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, solutionColor: Color.GREEN, ice: true, item: new Swatch(Color.GREEN) },
            { hasTile: true, solutionColor: Color.GREEN, ice: true },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.RED, ice: true }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, tileColor: Color.DARK, solutionColor: Color.DARK },
            { hasTile: true, solutionColor: Color.GREEN, ice: true },
            { hasTile: true, solutionColor: Color.GREEN, ice: true }
        ],
        [
            { hasTile: true, solutionColor: Color.RED, ice: true },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, solutionColor: Color.YELLOW, ice: true,
                item: new Swatch(Color.YELLOW) }
        ],
        [
            { hasTile: true, solutionColor: Color.RED, ice: true, item: new Swatch(Color.RED) },
            { hasTile: true, solutionColor: Color.RED, ice: true },
            { hasTile: true, solutionColor: Color.YELLOW, ice: true },
            { hasTile: true, solutionColor: Color.RED, ice: true },
            { hasTile: false }
        ]
    ],
    playerRow: 2,
    playerCol: 2,
    levelName: "Ice II",
    starRequirement3: 23,
    starRequirement2: 26,
    requiredToUnlock: 13
};

export default ICE_2;
