import React from "react";
import "./swatch.css";
import { TILE_SIZE, Color } from "../../constants";

const SWATCH_SIZE = 20;
const QUARTER_DIFF = (TILE_SIZE - SWATCH_SIZE) / 2;

interface SwatchComponentProps {
    color: Color,
    row: number,
    col: number
}

export default class SwatchComponent extends React.Component<SwatchComponentProps> {
    animationDelay: number;

    constructor(props: SwatchComponentProps) {
        super(props);
        this.animationDelay = Math.random();
    }

    render(): JSX.Element {
        const colorClass = `swatch bg-${this.props.color}`;
        const swatchStyle = {
            left: `${(this.props.col * TILE_SIZE) + QUARTER_DIFF}px`,
            top: `${(this.props.row * TILE_SIZE) + QUARTER_DIFF}px`,
            animationDelay: `-${this.animationDelay}s`
        };

        return (
            <div className={colorClass} style={swatchStyle}>
                <div className="swatch-border"></div>
            </div>
        );
    }
}
