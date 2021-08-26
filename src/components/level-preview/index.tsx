import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Grid from "../../classes/grid";
import LevelSelectGrid from "../level-select-grid";
import LEVELS from "../../services/levels";
import Star from "../star";
import "./level-preview.scss";

interface LevelPreviewProps {
    selectedLevel: number | null // 1-indexed
};

const STAR_SIZE = 16;

export default function LevelPreview(props: LevelPreviewProps) {
    if (props.selectedLevel !== null && LEVELS[props.selectedLevel - 1]) {
        const level = LEVELS[props.selectedLevel - 1];
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

                <h3>Scoring</h3>

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
                            <td>{`\u2026in ${level.starRequirement2} moves.`}</td>
                        </tr>
                        <tr>
                            <td>
                                <Star filled size={STAR_SIZE} />
                                <Star filled size={STAR_SIZE} />
                                <Star filled size={STAR_SIZE} />
                            </td>
                            <td>{`\u2026in ${level.starRequirement3} moves.`}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    }

    return <section className="level-preview"></section>;
}
