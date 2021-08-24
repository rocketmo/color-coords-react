import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faQuestionCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import "./level-select-top-bar.scss";

export default function LevelSelectTopBar() {
    return (
        <header className="top-bar level-select-top-bar">
            <Link to="/" className="top-bar-text back-btn" aria-label="Go back">
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <div className="level-select-title">
                <h1 className="top-bar-text">Level Select</h1>
            </div>
            <div className="level-select-other">
                <button className="top-bar-text">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </button>
                <button className="top-bar-text">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            <div className="clearfix"></div>
        </header>
    );
}
