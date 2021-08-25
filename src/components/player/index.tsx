import { useState, useContext, useEffect } from "react";
import { usePrevious } from "../../services/hooks";
import { easeQuadInOut } from "d3-ease";
import { GridOffsetContext } from "../../services/context";
import { TILE_SIZE, Color } from "../../services/constants";
import "./player.scss";

const PLAYER_SIZE = 40;
const ANIM_FRAMES = 70;
const ANIM_INTERVAL = 5;
const QUARTER_DIFF = (TILE_SIZE - PLAYER_SIZE) / 2;

interface PlayerProps {
    color?: Color,
    row: number,
    col: number,
    movementToggle: boolean,
    onAnimationEnd: Function
}

export default function PlayerComponent(props: PlayerProps) {
    const [rowPosition, setRowPosition] = useState(props.row)
    const [colPosition, setColPosition] = useState(props.col)
    const offset = useContext(GridOffsetContext);
    const { row, col, movementToggle } = props;
    const prevProps = usePrevious({ row, col })

    useEffect(() => {
        // Only animate player movement if it's toggled on and we have an initial starting position
        if (movementToggle && prevProps) {
            let frameCount = 0;

            const interval = setInterval(() => {
                if (frameCount > ANIM_FRAMES) {
                    clearInterval(interval);
                    props.onAnimationEnd();
                } else {
                    frameCount += 1;
                    const increment = easeQuadInOut(frameCount / ANIM_FRAMES);
                    setRowPosition(prevProps.row + ((row - prevProps.row) * increment));
                    setColPosition(prevProps.col + ((col - prevProps.col) * increment));
                }
            }, ANIM_INTERVAL);
        } else {
            setRowPosition(row);
            setColPosition(col);
        }

    }, [ row, col, movementToggle ]); // eslint-disable-line react-hooks/exhaustive-deps

    const color = props.color ?? Color.DEFAULT;
    const colorClass = `player-color bg-${color}`;
    const playerPositionStyle = {
        left: `${(colPosition * TILE_SIZE) + QUARTER_DIFF + offset.x}px`,
        top: `${(rowPosition * TILE_SIZE) + QUARTER_DIFF + offset.y}px`,
    };

    return (
        <div className="player" style={playerPositionStyle}>
            <div className={colorClass}></div>
            <div className="player-border"></div>
        </div>
    );
}
