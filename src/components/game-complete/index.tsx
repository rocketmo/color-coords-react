import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faThLarge, faPlay, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Star from "../star";
import LEVELS from "../../services/levels";
import "./game-complete.scss";

interface GameCompleteProps {
    levelNumber: number,
    stars: number,
    restartHandler: () => void,
    starsScoredOnLevel: (levelNum: number) => number,
    starsToUnlockLevel: (levelNum: number) => number
};

const STAR_SIZE = 50;
const STAR_TEXT_SIZE = 16;

export default function GameComplete(props: GameCompleteProps) {
    let nextBtn = null;
    let nextUnlockElement = null;
    let starText = null;

    if (LEVELS[props.levelNumber]) {
        const level = LEVELS[props.levelNumber];

        if (props.starsScoredOnLevel(props.levelNumber + 1) >= 0) {
            nextBtn = (
                <Link to={`/game/${props.levelNumber + 1}`} className="level-complete-btn">
                    <FontAwesomeIcon icon={faPlay} /> Next Level
                </Link>
            );
        } else {
            const toNextLevel = props.starsToUnlockLevel(props.levelNumber + 1);
            nextUnlockElement = (
                <p className="level-complete-unlock-text">
                    Collect a total of {level.requiredToUnlock}
                    <span><Star filled size={STAR_TEXT_SIZE} /></span>
                    {" to unlock the next level (you need "}
                    {toNextLevel}
                    <span><Star filled size={STAR_TEXT_SIZE} /></span>
                    {" more)."}
                </p>
            );

            nextBtn = (
                <button className="level-complete-btn locked-next-btn">
                    <FontAwesomeIcon icon={faLock} /> Next Level
                </button>
            );
        }
    }

    if (LEVELS[props.levelNumber - 1] && props.stars < 3) {
        const level = LEVELS[props.levelNumber - 1];
        starText = (
            <div className="level-complete-3s-text">
                Complete the puzzle in <strong>{level.starRequirement3}</strong> moves to earn a 3
                <span><Star filled size={STAR_TEXT_SIZE} /></span> {" score."}
            </div>
        );
    }

    const stars = [];
    for (let i = 1; i <= 3; i += 1) {
        stars.push(
            <Star filled={i <= props.stars} className={`level-complete-star lcs-${i}`}
                size={STAR_SIZE} key={`lcs-${i}`} />
        );
    }

    return (
        <div className="level-complete">
            <div className="level-complete-main">
                <div className="level-complete-star-container">
                    {stars}
                </div>
                <div className="level-complete-msg">Puzzle Completed!</div>
                {starText}
                <div className="level-complete-btn-container">
                    <Link to="/level-select" className="level-complete-btn">
                        <FontAwesomeIcon icon={faThLarge} /> Level Select
                    </Link>
                    <button className="level-complete-btn" onClick={props.restartHandler}>
                        <FontAwesomeIcon icon={faSync} /> Restart
                    </button>
                    {nextBtn}
                </div>
                {nextUnlockElement}
            </div>
        </div>
    );
}
