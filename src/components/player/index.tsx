import { useState, useContext, useEffect } from "react";
import { usePrevious } from "../../services/hooks";
import { easeQuadInOut } from "d3-ease";
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { Color } from "../../services/constants";
import "./player.scss";

const ANIM_FRAMES = 70;
const ANIM_INTERVAL = 5;

interface PlayerProps {
    color?: Color,
    row: number,
    col: number,
    movementToggle: boolean,
    onAnimationEnd: Function
}

export default function PlayerComponent(props: PlayerProps) {
    const { row, col, movementToggle } = props;
    const [rowPosition, setRowPosition] = useState(row);
    const [colPosition, setColPosition] = useState(col);
    const offset = useContext(GridOffsetContext);
    const tileSize = useContext(TileSizeContext);
    const prevProps = usePrevious({ row, col });

    const PLAYER_SIZE = (tileSize * 5) / 6;
    const QUARTER_DIFF = (tileSize - PLAYER_SIZE) / 2;

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
    const borderWidth = Math.ceil(tileSize / 12);

    const playerStyle = {
        borderRadius: `${PLAYER_SIZE}px`,
        borderWidth: `${borderWidth}px`,
        height: `${PLAYER_SIZE}px`,
        left: `${(colPosition * tileSize) + QUARTER_DIFF + offset.x}px`,
        top: `${(rowPosition * tileSize) + QUARTER_DIFF + offset.y}px`,
        width: `${PLAYER_SIZE}px`
    };

    const playerBodyStyle = {
        borderRadius: `${PLAYER_SIZE}px`,
        borderWidth: `${borderWidth}px`,
    };

    return (
        <div className="player" style={playerStyle}>
            <div className={colorClass} style={playerBodyStyle}></div>
            <div className="player-border" style={playerBodyStyle}></div>
        </div>
    );
}
