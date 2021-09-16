import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const DARK_TILES_1: GameConfig = {
    id: "mWgTHtQTikqu7J9n3kjeDg==",
    description: <p>An introduction to dark tiles.</p>,
    levelInstructions: [
        {
            element: (
                <p>
                    <strong>Dark tiles </strong> cannot change colors; they will always remain
                    black, even if the player pieces moves across them while in a colored state.
                </p>
            )
        }
    ],
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.PURPLE, item: new Swatch(Color.PURPLE) },
            { hasTile: true, tileColor: Color.DARK, solutionColor: Color.DARK },
            { hasTile: true, solutionColor: Color.GREEN }
        ],
        [
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, tileColor:Color.DARK, solutionColor: Color.DARK },
            { hasTile: true, solutionColor: Color.PURPLE }
        ],
        [
            { hasTile: true, solutionColor: Color.GREEN, item: new Swatch(Color.GREEN) },
            { hasTile: true, tileColor:Color.DARK, solutionColor: Color.DARK },
            { hasTile: true, solutionColor: Color.ORANGE, item: new Swatch(Color.ORANGE) }
        ]
    ],
    playerRow: 1,
    playerCol: 1,
    levelName: "Dark Tiles I",
    starRequirement3: 14,
    starRequirement2: 15,
    requiredToUnlock: 7
};

export default DARK_TILES_1;
