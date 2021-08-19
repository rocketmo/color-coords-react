import React from "react";
import { GridOffsetContext } from "../../services/context";
import "./swatch.css";
import { TILE_SIZE, Color } from "../../services/constants";

const SWATCH_SIZE = 20;
const QUARTER_DIFF = (TILE_SIZE - SWATCH_SIZE) / 2;

interface SwatchComponentProps {
    color: Color,
    row: number,
    col: number
}

export default class SwatchComponent extends React.Component<SwatchComponentProps> {
    static contextType = GridOffsetContext;
    animationDelay: number;

    constructor(props: SwatchComponentProps) {
        super(props);
        this.animationDelay = Math.random() * 4;
    }

    render(): JSX.Element {
        const colorClass = `swatch bg-${this.props.color}`;
        const swatchStyle = {
            left: `${(this.props.col * TILE_SIZE) + QUARTER_DIFF + this.context.x}px`,
            top: `${(this.props.row * TILE_SIZE) + QUARTER_DIFF + this.context.y}px`,
            animationDelay: `-${this.animationDelay}s`
        };

        return (
            <div className={colorClass} style={swatchStyle}>
                <div className="swatch-border"></div>
            </div>
        );
    }
}
