import { useState } from "react";
import { Link } from "react-router-dom";
import Settings from "../settings";
import "./home.scss";

interface HomeProps {
    playAnimation: boolean,
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

    const onReturnFromSettings = () => {
        setShowSettings(false);
        setPlayAnimation(false);
    };

    let homeClass = "home-container";
    homeClass += !playAnimation ? " home-anim-off" : "";

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
        display: showSettings ? "none" : "block"
    };

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
                    <Link to="/level-select" className="home-nav-btn-1">Level Select</Link><br />
                    <button className="home-nav-btn-2">How to Play</button><br />
                    <button className="home-nav-btn-3" onClick={setShowSettings.bind(null, true)}>
                        Settings
                    </button>
                </nav>
            </div>

            <Settings
                visible={showSettings}
                onGoBack={onReturnFromSettings}
                onEraseData={props.onEraseData} />
        </div>
    );
}
