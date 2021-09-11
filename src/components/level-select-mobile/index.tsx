import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLock } from '@fortawesome/free-solid-svg-icons';
import Grid from "../../classes/grid";
import LevelSelectGrid from "../level-select-grid";
import Star from "../star";
import LEVELS from "../../services/levels";
import { getPersonalBestTable, getLevelScoringTable } from "../level-preview";
import "./level-select-mobile.scss";

import type { LevelScore } from "../../services/definitions";

const STAR_SIZE = 16;

interface LevelSelectMobileProps {
    selectedLevel: number | null, // 1-indexed
    isSelected: boolean,
    levelScoreMap: Record<string, LevelScore>,
    setSelectedLevel: React.Dispatch<React.SetStateAction<number | null>>,
    setIsSelected: React.Dispatch<React.SetStateAction<boolean>>,
    starsScoredOnLevel: (levelNum: number) => number,
    starsToUnlockLevel: (levelNum: number) => number
};

export default function LevelSelectMobile(props: LevelSelectMobileProps) {
    const toggleSelected = (levelNum: number) => {
        if (props.selectedLevel === levelNum) {
            props.setIsSelected(!props.isSelected);
        } else {
            props.setIsSelected(true);
            props.setSelectedLevel(levelNum);
        }
    }

    const buttons = LEVELS.map((level, idx) => {
        let btnClass = "level-select-mobile-btn";
        const levelNum = idx + 1;
        const starsScored = props.starsScoredOnLevel(levelNum);

        // Button is currently being previewed
        if (props.isSelected && (props.selectedLevel === levelNum)) {
            btnClass += " btn-highlight";
        }

        // Gotten 3 stars on this level
        else if (starsScored >= 3) {
            btnClass += " btn-star-3";
        }

        // Gotten 1 or 2 stars on this level
        else if (starsScored > 0) {
            btnClass += " btn-star-1";
        }

        // Level not unlocked yet
        else if (starsScored < 0) {
            btnClass += " btn-locked";
        }

        // Level preview
        let levelPreview = null;
        if (starsScored < 0) {
            const toNextLevel = props.starsToUnlockLevel(levelNum);
            let className = "level-preview-mobile level-preview-locked";
            className += (props.isSelected && (props.selectedLevel === levelNum)) ?
                " preview-open" : "";

            levelPreview = (
                <section className={className}>
                    <div className="level-preview-padding">
                        <div className="locked-box">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                        <p className="unlock-text">
                            Collect a total of {level.requiredToUnlock}
                            <span><Star filled size={STAR_SIZE} /></span>
                            {" to unlock this level (you need "}
                            {toNextLevel}
                            <span><Star filled size={STAR_SIZE} /></span>
                            {" more)."}
                        </p>
                    </div>
                </section>
            );
        } else {
            const grid = new Grid(level.gridConfig);
            let className = "level-preview-mobile";
            className += (props.isSelected && (props.selectedLevel === levelNum)) ?
                " preview-open" : "";

            levelPreview = (
                <section className={className}>
                    <div className="level-preview-padding">
                        <LevelSelectGrid grid={grid} />
                        {level.description}
                        <Link to={`/game/${props.selectedLevel}`} className="play-btn">
                            <FontAwesomeIcon icon={faPlay} /> Play
                        </Link>

                        <hr />

                        <h3>Personal Best</h3>
                        {getPersonalBestTable(starsScored, props.levelScoreMap[level.id]?.moves)}

                        <h3>Scoring</h3>
                        {getLevelScoringTable(level)}
                    </div>
                </section>
            );
        }

        return (
            <div key={`level-btn-mobile-${level.id}`}>
                <button className={btnClass}
                    onClick={toggleSelected.bind(null, levelNum)}
                    aria-label={`Toggle preview of level ${levelNum}`}>
                    <h2>{levelNum}. {level.levelName}</h2>
                </button>
                {levelPreview}
            </div>
        );
    });

    return (
        <main className="level-select-mobile">
            {buttons}
        </main>
    );
}
