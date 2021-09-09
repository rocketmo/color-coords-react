import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faLock } from '@fortawesome/free-solid-svg-icons';
import Grid from "../../classes/grid";
import LevelSelectGrid from "../level-select-grid";
import LEVELS from "../../services/levels";
import Star from "../star";
import "./level-preview.scss";

import type { LevelScore } from "../../services/definitions";
import type { GameConfig } from "../../services/levels";
import { ReactElement } from "react";

interface LevelPreviewProps {
    selectedLevel: number | null, // 1-indexed
    levelScoreMap: Record<string, LevelScore>,
    starsScoredOnLevel: (levelNum: number) => number,
    starsToUnlockLevel: (levelNum: number) => number
};

const STAR_SIZE = 16;

export function getLevelScoringTable(level: GameConfig): ReactElement {
    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <span className="star-container">
                            <Star filled size={STAR_SIZE} />
                            <Star filled={false} size={STAR_SIZE} />
                            <Star filled={false} size={STAR_SIZE} />
                        </span>
                    </td>
                    <td>{"Complete the level\u2026"}</td>
                </tr>
                <tr>
                    <td>
                            <Star filled size={STAR_SIZE} />
                            <Star filled size={STAR_SIZE} />
                            <Star filled={false} size={STAR_SIZE} />
                    </td>
                    <td>{`\u2026in ${level.starRequirement2} or fewer moves.`}</td>
                </tr>
                <tr>
                    <td>
                        <Star filled size={STAR_SIZE} />
                        <Star filled size={STAR_SIZE} />
                        <Star filled size={STAR_SIZE} />
                    </td>
                    <td>{`\u2026in ${level.starRequirement3} or fewer moves.`}</td>
                </tr>
            </tbody>
        </table>
    );
}

export function getPersonalBestTable(starsScored:number, moves?: number): ReactElement {
    const pbStars = [];
    const pbMoves = (moves !== undefined && moves > 0) ? `${moves} moves` : "-";
    for (let i = 1; i <= 3; i += 1) {
        pbStars.push(
            <Star filled={i <= starsScored} size={STAR_SIZE} key={`pb-star-${i}`} />
        );
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <span className="star-container">
                            {pbStars}
                        </span>
                    </td>
                    <td>{pbMoves}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default function LevelPreview(props: LevelPreviewProps) {
    if (props.selectedLevel !== null && LEVELS[props.selectedLevel - 1]) {
        const level = LEVELS[props.selectedLevel - 1];
        const starsScored = props.starsScoredOnLevel(props.selectedLevel);
        const toNextLevel = props.starsToUnlockLevel(props.selectedLevel);

        // Level has not been unlocked
        if (starsScored < 0) {
            return (
                <section className="level-preview">
                    <div className="locked-box">
                        <FontAwesomeIcon icon={faLock} />
                    </div>
                    <h2>{props.selectedLevel}. {level.levelName}</h2>
                    <p className="unlock-text">
                        Collect a total of {level.requiredToUnlock}
                        <span><Star filled size={STAR_SIZE} /></span>
                        {" to unlock this level (you need "}
                        {toNextLevel}
                        <span><Star filled size={STAR_SIZE} /></span>
                        {" more)."}
                    </p>
                </section>
            );
        }

        const grid = new Grid(level.gridConfig);

        return (
            <section className="level-preview">
                <LevelSelectGrid grid={grid} />
                <h2>{props.selectedLevel}. {level.levelName}</h2>
                {level.description}
                <Link to={`/game/${props.selectedLevel}`} className="play-btn">
                    <FontAwesomeIcon icon={faPlay} /> Play
                </Link>

                <hr />

                <h3>Personal Best</h3>
                {getPersonalBestTable(starsScored, props.levelScoreMap[level.id]?.moves)}

                <h3>Scoring</h3>
                {getLevelScoringTable(level)}
            </section>
        );
    }

    return <section className="level-preview"></section>;
}
