import { useState, useEffect } from "react";
import produce from "immer";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LevelSelect from "../level-select";
import GameRedirect from "../game-redirect";
import Home from "../home";
import { sleep } from "../../services/util";
import LEVELS from "../../services/levels";
import "./app.scss";

import type { LevelScore } from "../../services/definitions";

// Map level ID to stars scored on the level
const initialLevelScoreMap: Record<string, LevelScore> = {};
for (const levelConfig of LEVELS) {
    initialLevelScoreMap[levelConfig.id] = {
        solved: false,
        moves: 0,
        stars: 0
    };
}

export default function App() {
    const [ starCount, setStarCount ] = useState(0);
    const [ playHomeAnimation, setPlayHomeAnimation ] = useState(true);
    const [ isReady, setIsReady ] = useState(false);
    const [ areFontsLoaded, setAreFontsLoaded ] = useState(false);
    const [ levelScoreMap, setLevelScoreMap ] = useState(initialLevelScoreMap);

    /**
     * Handler to update star counts after a level is completed
     * @param levelNumber - Level identifier (1-indexed)
     * @param movesTaken - Moves taken to complete the level
     * @returns Number of stars awarded for the given level attempt
     */
    const handleStarUpdate = (levelNumber: number, movesTaken: number) => {
        const levelConfig = LEVELS[levelNumber - 1];
        if (!levelConfig) { return 0; }

        // Get the star score for the current level attempt
        let starsScored = 1;
        if (movesTaken <= levelConfig.starRequirement3) {
            starsScored = 3;
        } else if (movesTaken <= levelConfig.starRequirement2) {
            starsScored = 2;
        }

        if (movesTaken < levelScoreMap[levelConfig.id]?.moves ||
            levelScoreMap[levelConfig.id]?.solved === false) {

            const prevStars = levelScoreMap[levelConfig.id]?.stars ?? 0;
            const nextLevelScoreMap = produce(levelScoreMap, draft => {
                draft[levelConfig.id].solved = true;
                draft[levelConfig.id].moves = movesTaken;
                draft[levelConfig.id].stars = starsScored;
            });

            setLevelScoreMap(nextLevelScoreMap);
            setStarCount(starCount + (starsScored - prevStars));
        }

        return starsScored;
    };

    /**
     *
     * @param levelNum 1-indexed
     * @returns If the level is unlocked, return the number of stars scored on the level; returns
     *          -1 if the level is locked
     */
    const hasUnlockedLevel = (levelNum: number) => {
        const level = LEVELS[levelNum - 1];
        if (!level) { return -1; }

        if (levelScoreMap[level.id]?.stars > 0 || starCount >= level?.requiredToUnlock) {
            return (levelScoreMap[level.id]?.stars ?? 0);
        }

        return -1;
    };

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
                        <GameRedirect handleStarUpdate={handleStarUpdate} />
                    </Route>
                    <Route path="/level-select">
                        <LevelSelect starCount={starCount} levelScoreMap={levelScoreMap}
                            hasUnlockedLevel={hasUnlockedLevel} />
                    </Route>
                    <Route path="*">
                        <Home playAnimation={playHomeAnimation} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function getLoaderBarFill(): (HTMLElement | null) {
    return document.getElementById("loader-bar-fill");
}
