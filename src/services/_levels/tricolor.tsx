import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const TRICOLOR: GameConfig = {
    id: "DwaPoAeJnkmnOGFPsUKPIw==",
    levelInstructions: [
        {
            element: (
                <p>
                    Tip: If playing on a desktop, you can hold the <strong> Q </strong> key to view
                    the solution overlayed on top of the puzzle grid.
                </p>
            )
        }
    ],
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.YELLOW, item: new Swatch(Color.YELLOW) },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.RED, item: new Swatch(Color.RED) }
        ],
        [
            { hasTile: true, solutionColor: Color.YELLOW },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.YELLOW }
        ],
        [
            { hasTile: true, solutionColor: Color.BLUE, item: new Swatch(Color.BLUE) },
            { hasTile: true, solutionColor: Color.RED },
            { hasTile: true, solutionColor: Color.RED }
        ]
    ],
    playerRow: 1,
    playerCol: 1,
    levelName: "Tricolor",
    starRequirement3: 17,
    starRequirement2: 22,
    requiredToUnlock: 3
};

export default TRICOLOR;
