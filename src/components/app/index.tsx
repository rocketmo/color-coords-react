import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LevelSelect from "../level-select";
import GameRedirect from "../game-redirect";
import Home from "../home";
import { sleep } from "../../services/util";
import "./app.scss";

function getLoaderBarFill(): (HTMLElement | null) {
    return document.getElementById("loader-bar-fill");
}

export default function App() {
    const [ playHomeAnimation, setPlayHomeAnimation ] = useState(true);
    const [ isReady, setIsReady ] = useState(false);
    const [ areFontsLoaded, setAreFontsLoaded ] = useState(false);

    // On mount
    useEffect(() => {
        // Update the loader bar
        const loaderBarFill = getLoaderBarFill();
        loaderBarFill && loaderBarFill.classList.add("loader-bar-fill-state-1");

        // Load all fonts
        const onFontsLoad = () => {
            setAreFontsLoaded(true);
        };

        WebFont.load({
            custom: {
                families: [ "FredokaOne", "Nunito:n4,n6,n7,n8", "NunitoSans:n4,n6,n7,i4" ]
            },
            timeout: 5000,
            active: onFontsLoad,
            inactive: onFontsLoad
        });
    }, []);

    // Runs after each loading stage is completed
    useEffect(() => {
        // Update loading bar width
        const numFinished = 1 + (areFontsLoaded ? 1 : 0);
        const loaderBarFill = getLoaderBarFill();
        loaderBarFill && loaderBarFill.classList.add(`loader-bar-fill-state-${numFinished}`);

        const onFinish = async () => {
            await sleep(500); // Slight delay

            // Update loading text
            const loadingTextElement = document.getElementById("loading-text");
            loadingTextElement && (loadingTextElement.textContent = "Let's go!");
            loadingTextElement && (loadingTextElement.classList.remove("loading-text-anim-on"));

            // Fade out loading bar
            const loaderElement = document.getElementById("loading-anim-window");
            loaderElement && loaderElement.classList.add("loading-finished");

            // Wait for fade out to finish then remove the loader; app is now ready
            await sleep(2000);
            loaderElement && loaderElement.remove();
            setIsReady(true);

            // Toggle off the home animation after the next cycle; this prevents the full home
            // screen animation from playing each time the user visits the home page; the full
            // animation will only play if it is the first page the user visits
            await sleep(0);
            setPlayHomeAnimation(false);
        }

        if (areFontsLoaded && !isReady) {
            onFinish();
        }
    }, [ areFontsLoaded ]); // eslint-disable-line react-hooks/exhaustive-deps

    // Do not render anything until everything is loaded
    if (!isReady) {
        return null;
    }

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
