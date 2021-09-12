import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const LEVEL_SWATCHES_1: GameConfig = {
    id: "X08Cn2VWa0C6YvdCaTQMFw==",
    description: <p>An introduction to the game of <em>Color Coords</em>.</p>,
    levelInstructions: [
        {
            element: (
                <p>
                    Welcome to <em>Color Coords</em>! The goal of the game is to color the puzzle
                    grid to match the solution shown in the target window.
                </p>
            )
        },
        {
            element: (
                <p>
                    To do so, start by moving your <strong> player piece </strong>
                    across the grid. You can use either the arrow keys or by clicking on the tile
                    you wish to move to. Note: you can only click on tiles in the same row or column
                    as the player piece.
                </p>
            )
        },
        {
            element: (
                <p>
                    In order to color the grid, you will need to move your player piece onto a
                    <strong> swatch </strong> item. After doing so, your player piece
                    will change color, giving you the ability to paint the grid as you move around.
                </p>
            )
        },
        {
            element: (
                <p>
                    Try to solve the puzzle in the fewest moves possible. Good luck and have fun!
                </p>
            )
        }
    ],
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
    levelName: "Swatches I",
    starRequirement3: 12,
    starRequirement2: 16,
    requiredToUnlock: 0
};

export default LEVEL_SWATCHES_1;
