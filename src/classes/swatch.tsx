import Item from "./item";
import SwatchComponent from "../components/swatch"
import { Color } from "../constants";

export default class Swatch extends Item {
    color: Color;

    constructor(color?: Color) {
        super();
        this.color = color ?? Color.DEFAULT;
    }

    render(row: number, col: number): JSX.Element {
        const key = `swatch-${row}-${col}`;
        return <SwatchComponent color={this.color} row={row} col={col} key={key} />
    }

    updatePlayerColor(): Color {
        return this.color;
    }
}
