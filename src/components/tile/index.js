import "./tile.css";

const TILE_SIZE = 48;

export default function Tile(props) {
    const colorClass = `tile-front ${props.color ?? ""} ${props.alt ? "tile-alt" : ""}`;
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
