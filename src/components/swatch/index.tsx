import "./swatch.css";
import { TILE_SIZE, Color } from "../../constants";

const SWATCH_SIZE = 20;
const QUARTER_DIFF = (TILE_SIZE - SWATCH_SIZE) / 2;

export default function SwatchComponent(props: { color: Color; row: number; col: number }) {
    const colorClass = `swatch bg-${props.color}`;
    const positionStyle = {
        left: `${(props.col * TILE_SIZE) + QUARTER_DIFF}px`,
        top: `${(props.row * TILE_SIZE) + QUARTER_DIFF}px`,
    };

    return (
        <div className={colorClass} style={positionStyle}>
            <div className="swatch-border"></div>
        </div>
    );
}
