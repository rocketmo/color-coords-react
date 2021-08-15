import { JSX } from "@babel/types";
import { Color } from "../constants";

export default abstract class Item {
    abstract render(row: number, col: number): JSX.Element;

    // Returns the color the player would change to if they land on the item
    updatePlayerColor(): (Color | null) {
        return null;
    }
}
