import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "../game";
import Home from "../home";
import { sampleGame } from "../../services/levels";
import "./app.scss";

export default function App() {
    return (
        // TODO: Uncomment and replace other app
        // <div className="app" onContextMenu={event => event.preventDefault()}>
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/game">
                        <Game {...sampleGame} />
                    </Route>
                    <Route path="*">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
