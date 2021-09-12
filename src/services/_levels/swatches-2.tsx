import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_2: GameConfig = {
    id: "czdtzyW72UKVkwfmYkRCAA==",
    levelInstructions: [
        {
            element: (
                <p>
                    Tip: If you make a mistake during the puzzle, you can press the
                    <strong> undo </strong> and <strong> redo </strong> buttons in the quick menu
                    to go back to a previous state. Alternatively, you can use your keyboard, by
                    pressing <strong> Z </strong> (to undo) or <strong> Y </strong> (to redo).
                </p>
            )
        },
        {
            element: (
                <p>
                    If you feel like starting from the very beginning, press the restart button in
                    the quick menu or press the <strong> R </strong> key on your keyboard.
                </p>
            )
        }
    ],
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
