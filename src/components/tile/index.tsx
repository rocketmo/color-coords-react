import "./tile.css";
import { TILE_SIZE, Color } from "../../constants";

export default function Tile(props: { color?: Color; alt?: boolean; row: number; col: number }) {
    const color = props.color ?? Color.DEFAULT;
    const colorClass = `tile-front bg-${color} ${props.alt ? "alt" : ""}`;
    const tilePositionStyle = {
        left: `${props.col * TILE_SIZE}px`,
        top: `${props.row * TILE_SIZE}px`,
    };

    return (
        <div className="tile" style={tilePositionStyle}>
            <div className={colorClass}></div>
            <div className="tile-back"></div>
        </div>
    );
}
