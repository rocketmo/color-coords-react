import "./player.css";
import { TILE_SIZE, Color } from "../../constants";

const PLAYER_SIZE = 36;
const QUARTER_DIFF = (TILE_SIZE - PLAYER_SIZE) / 2;

export default function Player(props: { color?: Color; row: number; col: number }) {
    const color = props.color ?? Color.DEFAULT;
    const colorClass = `player-color bg-${color}`;
    const playerPositionStyle = {
        left: `${(props.col * TILE_SIZE) + QUARTER_DIFF}px`,
        top: `${(props.row * TILE_SIZE) + QUARTER_DIFF}px`,
    };

    return (
        <div className="player" style={playerPositionStyle}>
            <div className={colorClass}></div>
        </div>
    );
}
