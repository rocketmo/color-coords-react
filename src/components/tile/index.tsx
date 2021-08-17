import { useContext } from "react";
import { GridOffsetContext } from "../grid";
import { TILE_SIZE, Color } from "../../constants";
import "./tile.css";

interface TileProps {
    row: number,
    col: number,
    color?: Color,
    solution?: Color,
    alt?: boolean,
    showSolution?: boolean
}

export default function Tile(props: TileProps) {
    const offset = useContext(GridOffsetContext);
    const color = props.color ?? Color.DEFAULT;
    const colorClass = `tile-front bg-${color} ${props.alt ? "alt" : ""}`;

    const solutionColor = props.solution ?? Color.DEFAULT;
    const solutionClass = `tile-solution bg-${solutionColor} ${props.alt ? "alt" : ""}`
    const solutionStyle = { opacity: props.showSolution ? "1" : "0" };

    const tilePositionStyle = {
        left: `${(props.col * TILE_SIZE) + offset.x}px`,
        top: `${(props.row * TILE_SIZE) + offset.y}px`,
    };

    return (
        <div className="tile" style={tilePositionStyle}>
            <div className={solutionClass} style={solutionStyle}></div>
            <div className={colorClass}></div>
            <div className="tile-back"></div>
        </div>
    );
}
