import { useContext } from "react";
import { GridOffsetContext } from "../../services/context";
import { SOLUTION_TILE_SIZE } from "../../services/constants";
import "./solution-player-cursor.scss";

export default function SolutionPlayerCursor(props: { row: number, col: number }) {
    const offset = useContext(GridOffsetContext);
    const positionStyle = {
        left: `${(props.col * SOLUTION_TILE_SIZE) + offset.x}px`,
        top: `${(props.row * SOLUTION_TILE_SIZE) + offset.y}px`,
    };

    return (
        <div className="solution-player-cursor" style={positionStyle}>
            <div className="cursor-corner cursor-corner-top-left"></div>
            <div className="cursor-corner cursor-corner-top-right"></div>
            <div className="cursor-corner cursor-corner-bottom-left"></div>
            <div className="cursor-corner cursor-corner-bottom-right"></div>
        </div>
    );
}
