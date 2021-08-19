import { immerable } from "immer";
import { Color } from "../services/constants";
import Tile from "../components/tile";
import type Item from "./item";

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
            <Tile key={key} color={this.color} alt={(this.row + this.col) % 2 === 0}
                solution={this.solutionColor} showSolution={showSolution}
                row={this.row} col={this.col} />
        );

        if (this.item) {
            elements.push(this.item.render(this.row, this.col));
        }

        return elements;
    }

    renderSolution(): JSX.Element {
        const key = `solution-tile-${this.row}-${this.col}`;
        return (
            <Tile key={key} color={this.solutionColor} isSolutionTile={true}
                alt={(this.row + this.col) % 2 === 0}
                row={this.row} col={this.col} />
        );
    }
}
