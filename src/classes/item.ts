import { immerable } from "immer";
import type { Color } from "../services/constants";

export default abstract class Item {
    [ immerable ] = true;

    abstract render(row: number, col: number): JSX.Element;

    // Returns the color the player would change to if they land on the item
    updatePlayerColor(): (Color | null) {
        return null;
    }
}
