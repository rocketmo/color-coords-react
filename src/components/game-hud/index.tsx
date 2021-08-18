import Solution from "../solution";
import "./game-hud.css";
import type Grid from "../../classes/grid";

interface GameHUDProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    movesTaken: number,
    level: number
}

export default function GameHUD(props: GameHUDProps) {
    return (
        <div className="game-hud">
            <div className="top-bar">
                Level {props.level} | Moves: {props.movesTaken}
            </div>
            <Solution grid={props.grid} playerRow={props.playerRow} playerCol={props.playerCol} />
        </div>
    );
}
