import { Color } from "../constants";
import Swatch from "../../classes/swatch";
import type { GameConfig } from "../levels";

const DARK_TILES_2: GameConfig = {
    id: "6CLrD8Z0TUK3lqRrQQB/qQ==",
    gridConfig: [
        [
            { hasTile: true, solutionColor: Color.GREEN, item: new Swatch(Color.GREEN) },
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.BLUE, item: new Swatch(Color.BLUE) }
        ],
        [
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.BLUE }
        ],
        [
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, solutionColor: Color.ORANGE },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, tileColor:Color.DARK, solutionColor: Color.DARK }
        ],
        [
            { hasTile: true, solutionColor: Color.ORANGE, item: new Swatch(Color.ORANGE) },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: true, tileColor:Color.DARK, solutionColor: Color.DARK },
            { hasTile: true, tileColor:Color.DARK, solutionColor: Color.DARK },
        ]
    ],
    playerRow: 1,
    playerCol: 1,
    levelName: "Dark Tiles II",
    starRequirement3: 50,
    starRequirement2: 60,
    requiredToUnlock: 8
};

export default DARK_TILES_2;
