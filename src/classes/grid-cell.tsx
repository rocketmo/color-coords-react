import { immerable } from "immer";
import { Color } from "../constants";
import Item from "./item";
import Tile from "../components/tile";

export default class GridCell {
    [ immerable ] = true;
    row: number;
    col: number;
    color: Color;
    solutionColor: Color;
    item?: Item;

    constructor(row: number, col: number, color?: Color, solutionColor?: Color, item?: Item) {
        this.row = row;
        this.col = col;
        this.color = color ?? Color.DEFAULT;
        this.solutionColor = solutionColor ?? Color.DEFAULT;
        this.item = item;
    }

    renderElements(showSolution: boolean): JSX.Element[] {
        const key = `tile-${this.row}-${this.col}`;
        const elements = [];
        elements.push(
            <Tile color={this.color} alt={(this.row + this.col) % 2 === 0}
                solution={this.solutionColor} showSolution={showSolution}
                row={this.row} col={this.col} key={key} />
        );

        if (this.item) {
            elements.push(this.item.render(this.row, this.col));
        }

        return elements;
    }
}
