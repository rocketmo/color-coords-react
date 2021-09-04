import { useContext, useState } from "react";
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import "./swatch.scss";
import { Color } from "../../services/constants";

interface SwatchComponentProps {
    color: Color,
    row: number,
    col: number
}

export default function SwatchComponent(props: SwatchComponentProps) {
    const offset = useContext(GridOffsetContext);
    const tileSize = useContext(TileSizeContext);
    const [ animationDelay ] = useState(Math.random() * 4);

    const SWATCH_SIZE = Math.floor((tileSize * 5) / 12);
    const QUARTER_DIFF = (tileSize - SWATCH_SIZE) / 2;

    const colorClass = `swatch bg-${props.color}`;
    const swatchStyle = {
        animationDelay: `-${animationDelay}s`,
        height: `${SWATCH_SIZE}px`,
        left: `${(props.col * tileSize) + QUARTER_DIFF + offset.x}px`,
        top: `${(props.row * tileSize) + QUARTER_DIFF + offset.y}px`,
        width: `${SWATCH_SIZE}px`
    };

    const borderStyle = {
        borderWidth: `${Math.ceil((SWATCH_SIZE * 3) / 20)}px`
    }

    return (
        <div className={colorClass} style={swatchStyle}>
            <div className="swatch-border" style={borderStyle}></div>
        </div>
    );
}
