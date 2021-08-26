import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Star from "../star";
import "./level-select-top-bar.scss";

interface LevelSelectTopBarProps {
    starCount: number
};

export default function LevelSelectTopBar(props: LevelSelectTopBarProps) {
    const starText = `\u00d7 ${props.starCount}`;

    return (
        <header className="top-bar level-select-top-bar">
            <Link to="/" className="top-bar-text back-btn" aria-label="Go back">
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div className="level-select-title">
                <h1 className="top-bar-text">Level Select</h1>
            </div>
            <div className="level-select-stars">
                <span className="top-bar-text">
                    <Star filled size={24} />
                    {starText}
                </span>
            </div>
            <div className="clearfix"></div>
        </header>
    );
}
