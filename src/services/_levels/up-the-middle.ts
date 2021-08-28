import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const UP_THE_MIDDLE: GameConfig = {
    id: "N93y5GKYIEW2k+16R9tSOQ==",
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.RED, item: new Swatch(Color.RED) },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.YELLOW, item: new Swatch(Color.YELLOW) },
            { hasTile: true, solutionColor: Color.RED }
        ],
        [
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.YELLOW }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.RED }
        ],
        [
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.PURPLE, item: new Swatch(Color.PURPLE) },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.YELLOW }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.RED }
        ]
    ],
    playerRow: 2,
    playerCol: 2,
    levelName: "Up the Middle",
    starRequirement3: 76,
    starRequirement2: 90,
    requiredToUnlock: 3
};

export default UP_THE_MIDDLE;
