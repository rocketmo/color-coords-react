import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.scss";

const TITLE = (
    <>
        <span className="first-letter">C</span>OLOR&nbsp;
        <span className="first-letter">C</span>OORDS
    </>
);

const TITLE_COL_NUM = 6;
const BG_LAYER_NUM = 48;
const GRADIENT_ANIM_TIME = 300;

export default function Home() {
    const [ gradientDelay ] = useState(Math.random() * GRADIENT_ANIM_TIME);
    const coloredTitles = [];
    const bgLayers = [];

    for (let i = 0; i < TITLE_COL_NUM; i += 1) {
        const key = `title-colored-${i + 1}`;
        const titleClass = `title-box title-colored ${key}`;
        coloredTitles.push(
            <div className={titleClass} key={key}>
                <span className="title-text">{TITLE}</span>
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

    return (
        <div className="home-container">
            <div className="home-bg">
                <div className="home-bg-gradient" style={gradientStyle}>{bgLayers}</div>
            </div>
            <div className="title-container">
                <div className="title-box title-main">
                    <h1 className="title-text">{TITLE}</h1>
                </div>
                {coloredTitles}
            </div>

            <nav className="home-nav">
                <Link to="/game" className="home-nav-btn-1">Play</Link><br />
                <button className="home-nav-btn-2">How to Play</button><br />
                <button className="home-nav-btn-3">Settings</button>
            </nav>
        </div>
    );
}
