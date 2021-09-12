import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_3: GameConfig = {
    id: "ZascZkE+A0CjlYxEmU65cQ==",
    levelInstructions: [
        {
            element: (
                <p>
                    Tip: You can <strong> re-position </strong> or <strong> zoom in/out </strong>
                    on the puzzle grid. Simply drag anywhere in the puzzle area to re-position the
                    grid, and press the zoom in / zoom out buttons from the quick menu to adjust the
                    zoom. You can do the same in the target window as well.
                </p>
            )
        },
        {
            element: (
                <p>
                    Additionally, you can adjust the size of the target window by dragging the
                    resize handle (located in the bottom left corner of the window if playing on a
                    desktop, or at the top of the window if playing on a mobile device).
                </p>
            )
        },
        {
            element: (
                <p>
                    If you are playing on a desktop, you can also re-position the target window by
                    dragging the top bar of the window.
                </p>
            )
        }
    ],
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
    levelName: "Swatches III",
    starRequirement3: 47,
    starRequirement2: 54,
    requiredToUnlock: 1
};

export default LEVEL_SWATCHES_3;
