import "./tile.css";

export default function Tile(props) {
    const className = `tile ${props.color ?? ""} ${props.alt ? "tile-alt" : ""}`;
    return (
        <div className={className}></div>
    );
}
