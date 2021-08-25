import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LevelSelect from "../level-select";
import GameRedirect from "../game-redirect";
import Home from "../home";
import "./app.scss";

export default function App() {
    const [ playHomeAnimation, setPlayHomeAnimation ] = useState(true);

    // Toggle off the home animation after the app component has been mounted for future visits
    // to the home page; it'll still fully animate if the user lands on the home page on their
    // initial visit
    useEffect(() => {
        setPlayHomeAnimation(false);
    }, []);

    return (
        // TODO: Uncomment and replace other app
        // <div className="app" onContextMenu={event => event.preventDefault()}>
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/game/:levelNumber">
                        <GameRedirect />
                    </Route>
                    <Route path="/level-select">
                        <LevelSelect />
                    </Route>
                    <Route path="*">
                        <Home playAnimation={playHomeAnimation} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
