import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const KEYS: GameConfig = {
    id: "TybPZyZJYEae4LbNHlbeYg==",
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE, item: new Swatch(Color.BLUE) },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: false },
            { hasTile: false },
            { hasTile: false },
            { hasTile: false }
        ],
        [
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE },
            { hasTile: true, solutionColor: Color.PURPLE }
        ],
        [
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.PURPLE, item: new Swatch(Color.PURPLE) },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.ORANGE, item: new Swatch(Color.ORANGE) }
        ]
    ],
    playerRow: 0,
    playerCol: 0,
    levelName: "Keys",
    starRequirement3: 31,
    starRequirement2: 38,
    requiredToUnlock: 3
};

export default KEYS;
