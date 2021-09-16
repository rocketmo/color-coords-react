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
    ice: boolean;

    constructor(
        row: number,
        col: number, color?:
        Color, solutionColor?:
        Color,
        item?: Item,
        ice?: boolean
    ) {
        this.row = row;
        this.col = col;
        this.color = color ?? Color.DEFAULT;
        this.solutionColor = solutionColor ?? Color.DEFAULT;
        this.item = item;
        this.ice = ice ?? false;
    }

    updateColor(playerColor: Color): (Color | null) {

        // Cannot change color of a dark tile
        if (this.color === Color.DARK) {
            return null;
        }

        // If the player is dark and the tile is colored, erase the tile color
        if (playerColor === Color.DARK && this.color !== Color.DEFAULT) {
            this.color = Color.DEFAULT;
            return this.color;
        }

        // If the player is colored and the tile is a different color (but not dark),
        // re-color the tile
        if (playerColor !== Color.DEFAULT && playerColor !== Color.DARK &&
            playerColor !== this.color) {
            this.color = playerColor;
            return this.color;
        }

        // Otherwise, tile stays the same
        return null;
    }

    renderElements(
        showSolution: boolean,
        playerRow?: number,
        playerCol?: number,
        onTilePress?: (row: number, col: number) => void
    ): JSX.Element[] {
        const key = `tile-${this.row}-${this.col}`;
        const elements = [];
        elements.push(
            <Tile key={key} color={this.color} alt={(this.row + this.col) % 2 === 0}
                solution={this.solutionColor} showSolution={showSolution}
                row={this.row} col={this.col} playerRow={playerRow} playerCol={playerCol}
                ice={this.ice} onTilePress={onTilePress} />
        );

        if (this.item) {
            elements.push(this.item.render(this.row, this.col));
        }

        return elements;
    }

    renderSolution(): JSX.Element {
        const key = `solution-tile-${this.row}-${this.col}`;
        return (
            <Tile key={key} color={this.solutionColor} ice={this.ice}
                alt={(this.row + this.col) % 2 === 0}
                row={this.row} col={this.col} />
        );
    }
}
