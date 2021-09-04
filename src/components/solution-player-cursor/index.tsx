import { useContext } from "react";
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import "./solution-player-cursor.scss";

export default function SolutionPlayerCursor(props: { row: number, col: number }) {
    const offset = useContext(GridOffsetContext);
    const tileSize = useContext(TileSizeContext);

    const cursorStyle = {
        height: `${tileSize}px`,
        left: `${(props.col * tileSize) + offset.x}px`,
        top: `${(props.row * tileSize) + offset.y}px`,
        width: `${tileSize}px`
    };

    const cornerStyle = {
        borderWidth: Math.floor((tileSize * 3) / 20),
        height: Math.floor(tileSize / 5),
        width: Math.floor(tileSize / 5),
    };

    return (
        <div className="solution-player-cursor" style={cursorStyle}>
            <div className="cursor-corner cursor-corner-top-left" style={cornerStyle}></div>
            <div className="cursor-corner cursor-corner-top-right" style={cornerStyle}></div>
            <div className="cursor-corner cursor-corner-bottom-left" style={cornerStyle}></div>
            <div className="cursor-corner cursor-corner-bottom-right" style={cornerStyle}></div>
        </div>
    );
}
