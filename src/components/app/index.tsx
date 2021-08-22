import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GameRedirect from "../game-redirect";
import Home from "../home";
import "./app.scss";

export default function App() {
    return (
        // TODO: Uncomment and replace other app
        // <div className="app" onContextMenu={event => event.preventDefault()}>
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/game/:levelNumber">
                        <GameRedirect />
                    </Route>
                    <Route path="*">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
