import Grid from "../grid";
import GridCell from "../../classes/grid-cell";
import Swatch from "../../classes/swatch";
import { Color } from "../../constants";
import logo from "./logo.svg";
import "./app.css";

function App() {
    const gridProps = {
        grid: [
            [ new GridCell(Color.RED), new GridCell(Color.DEFAULT, new Swatch(Color.BLUE)) ],
            [ new GridCell(Color.GREEN), new GridCell(Color.GREEN), new GridCell(Color.GREEN),
                new GridCell(Color.GREEN), new GridCell(Color.GREEN),
                new GridCell(Color.DEFAULT, new Swatch(Color.GREEN)) ],
            [ null, new GridCell(Color.RED), null, new GridCell() ]
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

            <Grid {...gridProps} />
        </div>
    );
}

export default App;
