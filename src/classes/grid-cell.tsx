import { Color } from "../constants";
import Item from "./item";
import Tile from "../components/tile"

export default class GridCell {
    color: Color;
    item?: Item;

    constructor(color?: Color, item?: Item) {
        this.color = color ?? Color.DEFAULT;
        this.item = item;
    }

    render(row: number, col: number): JSX.Element[] {
        const key = `tile-${row}-${col}`;
        const elements = [];
        elements.push(
            <Tile color={this.color} alt={(row + col) % 2 === 0}
                row={row} col={col} key={key} />
        );

        if (this.item) {
            elements.push(this.item.render(row, col));
        }

        return elements;
    }
}
