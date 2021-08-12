import { Color } from "../constants";

export default class GridCell {
    color: Color;

    constructor(color?: Color) {
        this.color = color ?? Color.DEFAULT;
    }
}
