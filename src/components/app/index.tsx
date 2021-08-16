import GridComponent from "../grid";
import { GridCellConfig } from "../../classes/grid";
import Swatch from "../../classes/swatch";
import { Color } from "../../constants";
import logo from "./logo.svg";
import "./app.css";

interface GridProps {
    gridConfig: GridCellConfig[][],
    playerRow: number,
    playerCol: number
}

function App() {
    const gridProps: GridProps = {
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
        playerCol: 0
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

            <GridComponent {...gridProps} />
        </div>
    );
}

export default App;
