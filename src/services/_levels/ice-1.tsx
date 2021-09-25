import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const ICE_1: GameConfig = {
    id: "rHfDwxEz5UWdA5RwOxn71Q==",
    description: <p>An introduction to ice tiles.</p>,
    levelInstructions: [
        {
            element: (
                <p>
                    When the player piece moves onto an <strong> ice tile</strong>, it will keep
                    moving in the same direction until it hits a wall or until it lands on a
                    non-ice tile.
                </p>
            )
        },
        {
            element: (
                <p>
                    Also, note that ice tiles can still be colored, just like default tiles.
                </p>
            )
        }
    ],
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.BLUE, item: new Swatch(Color.BLUE) },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: false }
        ],
        [
            { hasTile: true, solutionColor: Color.ORANGE, ice: true },
            { hasTile: true, solutionColor: Color.ORANGE, ice: true },
            { hasTile: true, solutionColor: Color.ORANGE, ice: true },
            { hasTile: true, solutionColor: Color.ORANGE, ice: true }
        ],
        [
            { hasTile: true, solutionColor: Color.ORANGE, ice: true },
            { hasTile: true, solutionColor: Color.BLUE, ice: true },
            { hasTile: true, solutionColor: Color.BLUE, ice: true },
            { hasTile: true, solutionColor: Color.ORANGE, ice: true }
        ],
        [
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.ORANGE, item: new Swatch(Color.ORANGE) }
        ]
    ],
    playerRow: 3,
    playerCol: 0,
    levelName: "Ice I",
    starRequirement3: 10,
    starRequirement2: 12,
    requiredToUnlock: 12
};

export default ICE_1;
