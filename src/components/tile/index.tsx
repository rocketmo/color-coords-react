import "./tile.css";
import { TILE_SIZE, Color } from "../../constants";

interface TileProps {
    row: number,
    col: number,
    color?: Color,
    solution?: Color,
    alt?: boolean,
    showSolution?: boolean
}

export default function Tile(props: TileProps) {
    const color = props.color ?? Color.DEFAULT;
    const colorClass = `tile-front bg-${color} ${props.alt ? "alt" : ""}`;

    const solutionColor = props.solution ?? Color.DEFAULT;
    const solutionClass = `tile-solution bg-${solutionColor} ${props.alt ? "alt" : ""}`
    const solutionStyle = { opacity: props.showSolution ? "1" : "0" };

    const tilePositionStyle = {
        left: `${props.col * TILE_SIZE}px`,
        top: `${props.row * TILE_SIZE}px`,
    };

    return (
        <div className="tile" style={tilePositionStyle}>
            <div className={solutionClass} style={solutionStyle}></div>
            <div className={colorClass}></div>
            <div className="tile-back"></div>
        </div>
    );
}
