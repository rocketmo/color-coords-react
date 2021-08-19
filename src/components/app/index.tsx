import Game from "../game";
import Swatch from "../../classes/swatch";
import { Color } from "../../services/constants";
import "./app.scss";

import type { GameProps } from "../game";

function App() {
    const gameProps: GameProps = {
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

    return (
        <div className="app">
            <Game {...gameProps} />
        </div>
    );
}

export default App;
