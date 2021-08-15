import "./player.css";
import { TILE_SIZE, Color } from "../../constants";
import { TransitionEvent } from "react";

const PLAYER_SIZE = 40;
const QUARTER_DIFF = (TILE_SIZE - PLAYER_SIZE) / 2;

interface PlayerProps {
    color?: Color,
    row: number,
    col: number,
    onAnimationEnd: Function
}

export default function PlayerComponent(props: PlayerProps) {
    const color = props.color ?? Color.DEFAULT;
    const colorClass = `player-color bg-${color}`;
    const playerPositionStyle = {
        left: `${(props.col * TILE_SIZE) + QUARTER_DIFF}px`,
        top: `${(props.row * TILE_SIZE) + QUARTER_DIFF}px`,
    };

    return (
        <div className="player" style={playerPositionStyle}
            onTransitionEnd={(event: TransitionEvent) => props.onAnimationEnd(event)}>
            <div className={colorClass}></div>
            <div className="player-border"></div>
        </div>
    );
}
