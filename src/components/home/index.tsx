import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Settings from "../settings";
import Instructions from "../instructions";
import LEVELS from "../../services/levels";
import "./home.scss";

interface HomeProps {
    playAnimation: boolean,
    starsScoredOnLevel: (levelNum: number) => number
    onEraseData: () => void
};

const TITLE = (
    <>
        <span className="first-letter">C</span>OLOR&nbsp;
        <span className="first-letter">C</span>OORDS
    </>
);

const TITLE_COL_NUM = 6;
const BG_LAYER_NUM = 48;
const GRADIENT_ANIM_TIME = 300;

export default function Home(props: HomeProps) {
    const [ gradientDelay ] = useState(Math.random() * GRADIENT_ANIM_TIME);
    const [ playAnimation, setPlayAnimation ] = useState(props.playAnimation);
    const [ showSettings, setShowSettings ] = useState(false);
    const [ showInstructions, setShowInstructions ] = useState(false);
    const [ playLevelNumber, setPlayLevelNumber ] = useState<number | null>(null);

    const onPlay = () => {
        let lastUnlockedLevel = 1;
        let firstUnsolvedLevel: (number | null) = null;
        let firstIncompleteLevel: (number | null) = null;

        for (let i = 0; i < LEVELS.length; i += 1) {
            const levelNum = i + 1;
            const starsScored = props.starsScoredOnLevel(levelNum);

            if (starsScored === 0) {
                firstUnsolvedLevel = i + 1;
                break;
            }

            if (starsScored > 0) {
                lastUnlockedLevel = i + 1;

                if (firstIncompleteLevel === null && starsScored < 3) {
                    firstIncompleteLevel = i + 1;
                }
            }
        }

        if (firstUnsolvedLevel !== null) {
            setPlayLevelNumber(firstUnsolvedLevel);
        } else if (firstIncompleteLevel !== null) {
            setPlayLevelNumber(firstIncompleteLevel);
        } else {
            setPlayLevelNumber(lastUnlockedLevel);
        }
    };

    const onReturn = () => {
        setShowSettings(false);
        setShowInstructions(false);
        setPlayAnimation(false);
    };

    const onSettingsClick = () => {
        setShowSettings(true);
        setShowInstructions(false);
    };

    const onInstructionsClick = () => {
        setShowSettings(false);
        setShowInstructions(true);
    };

    const homeClass = `home-container ${!playAnimation ? " home-anim-off" : ""}`;
    const coloredTitles = [];
    const bgLayers = [];

    for (let i = 0; i < TITLE_COL_NUM; i += 1) {
        const key = `title-colored-${i + 1}`;
        const titleClass = `title-box title-colored ${key}`;
        coloredTitles.push(
            <div className={titleClass} key={key}>
                <span className="title-text" aria-hidden>{TITLE}</span>
            </div>
        );
    }

    for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < BG_LAYER_NUM; j += 1) {
            const key = `bg-layer-${i + 1}-${j + 1}`;
            const layerClass = `bg-layer bg-layer-${j + 1}`
            bgLayers.push(
                <div className={layerClass} key={key}></div>
            );
        }
    }

    const gradientStyle = {
        animationDelay: `-${gradientDelay}s`
    };

    const homeStyle = {
        display: (showSettings || showInstructions) ? "none" : "block"
    };

    if (playLevelNumber !== null) {
        return <Redirect to={`/game/${playLevelNumber}`} />
    }

    return (
        <div>
            <div className={homeClass} style={homeStyle}>
                <div className="home-bg">
                    <div className="home-bg-gradient" style={gradientStyle}>{bgLayers}</div>
                </div>
                <div className="title-container">
                    <div className="title-box title-main">
                        <h1 className="title-text" aria-label="Color Coords">{TITLE}</h1>
                    </div>
                    {coloredTitles}
                </div>

                <nav className="home-nav">
                    <button className="home-nav-btn-1" onClick={onPlay}>Play</button><br />

                    <Link to="/level-select" className="home-nav-btn-2">Level Select</Link><br />

                    <button className="home-nav-btn-3" onClick={onInstructionsClick}>
                        How to Play
                    </button><br />

                    <button className="home-nav-btn-4" onClick={onSettingsClick}>Settings</button>
                </nav>
            </div>

            <Settings
                visible={showSettings}
                onGoBack={onReturn}
                onEraseData={props.onEraseData} />

            <Instructions
                visible={showInstructions}
                onGoBack={onReturn} />
        </div>
    );
}
