import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const DARK_SWATCH: GameConfig = {
    id: "AZn/4XVi8EOd/qqCmO9icQ==",
    description: <p>An introduction to the dark swatch.</p>,
    levelInstructions: [
        {
            element: (
                <p>
                    The <strong> dark swatch </strong> will turn the player piece black. While
                    moving around in this state, the player piece will remove colors from any
                    grid tile it lands on.
                </p>
            )
        }
    ],
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.DEFAULT },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED, item: new Swatch(Color.RED) }
        ],
        [
            { hasTile: true, solutionColor: Color.DEFAULT },
            { hasTile: true, solutionColor: Color.DEFAULT, item: new Swatch(Color.DARK) },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED }
        ],
        [
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.DEFAULT },
            { hasTile: true, solutionColor: Color.DEFAULT }
        ],
        [
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.DEFAULT },
            { hasTile: true, solutionColor: Color.RED }
        ],
    ],
    playerRow: 3,
    playerCol: 3,
    levelName: "Erasure",
    starRequirement3: 29,
    starRequirement2: 34,
    requiredToUnlock: 10
};

export default DARK_SWATCH;
