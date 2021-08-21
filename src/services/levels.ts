import { Color } from "./constants";
import Swatch from "../classes/swatch";
import type { GameProps } from "../components/game";

export const sampleGame: GameProps = {
    gridConfig: [
        [
            { hasTile: true, tileColor: Color.BLUE, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.BLUE, item: new Swatch(Color.BLUE) }
        ],
        [
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN },
            { hasTile: true, solutionColor: Color.GREEN, item: new Swatch(Color.GREEN) }
        ],
        [
            { hasTile: false },
            { hasTile: true, solutionColor: Color.BLUE },
            { hasTile: false },
            { hasTile: true, solutionColor: Color.BLUE }
        ]
    ],
    playerRow: 1,
    playerCol: 0,
    level: 1
};
