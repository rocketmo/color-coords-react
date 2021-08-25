import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faThLarge, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import LEVELS from "../../services/levels";
import "./game-complete.scss";
import type { MouseEvent } from "react";

interface GameCompleteProps {
    levelNumber: number,
    restartHandler: () => void
};

export default function GameComplete(props: GameCompleteProps) {
    const nextBtn = LEVELS[props.levelNumber] ?
        <Link to={`/game/${props.levelNumber + 1}`} className="level-complete-btn">
            <FontAwesomeIcon icon={faPlay} /> Next Level
        </Link> : null;

    const onRestartClick = (event: MouseEvent) => {
        event.preventDefault();
        props.restartHandler();
    }

    return (
        <div className="level-complete">
            <div className="level-complete-main">
                <span className="level-complete-msg">Puzzle Completed!</span>
                <div className="level-complete-btn-container">
                    <Link to="/level-select" className="level-complete-btn">
                        <FontAwesomeIcon icon={faThLarge} /> Level Select
                    </Link>
                    <button className="level-complete-btn" onClick={onRestartClick}>
                        <FontAwesomeIcon icon={faSync} /> Restart
                    </button>
                    {nextBtn}
                </div>
            </div>
        </div>
    );
}
