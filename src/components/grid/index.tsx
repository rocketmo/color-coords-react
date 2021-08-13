import React, { KeyboardEvent } from "react";
import Tile from "../tile";
import Player from "../player";
import GridCell from "../../classes/grid-cell";
import "./grid.css";
import { Color } from "../../constants";

interface GridProps {
    grid: (GridCell | null)[][],
    playerRow: number,
    playerCol: number
}

interface GridState {
    grid: (GridCell | null)[][],
    playerRow: number,
    playerCol: number,
    playerColor: Color,
    isPlayerMoving: boolean // TODO: Consider using a queue to track player movements
}

export default class Grid extends React.Component {
    state: GridState;
    keyFnMap: Record<string, Function>;

    constructor(props: GridProps) {
        super(props);
        this.state = {
            grid: props.grid ?? [[]],
            playerRow: props.playerRow,
            playerCol: props.playerCol,
            playerColor: Color.DEFAULT,
            isPlayerMoving: false
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onMovementEnd = this.onMovementEnd.bind(this);

        this.keyFnMap = {
            ArrowUp: this.movePlayerByKeyDown.bind(this, -1, 0),
            ArrowDown: this.movePlayerByKeyDown.bind(this, 1, 0),
            ArrowLeft: this.movePlayerByKeyDown.bind(this, 0, -1),
            ArrowRight: this.movePlayerByKeyDown.bind(this, 0, 1)
        };
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.key && this.keyFnMap[event.key]) {
            this.keyFnMap[event.key](event);
        }
    }

    movePlayerByKeyDown(rowOffset: number, colOffset: number, event: KeyboardEvent): void {
        event.preventDefault();

        // Do not move the player if it is already in motion or if the offset is zero
        if (this.state.isPlayerMoving || (rowOffset === 0 && colOffset === 0)) {
            return;
        }

        const { grid, playerRow, playerCol, playerColor } = this.state;
        if (grid[playerRow + rowOffset] && grid[playerRow + rowOffset][playerCol + colOffset]) {

            // Move the player
            this.setState({
                playerRow: playerRow + rowOffset,
                playerCol: playerCol + colOffset,
                isPlayerMoving: true
            });

            // Update the color of the tile the player lands on
            const gridCell = grid[playerRow + rowOffset][playerCol + colOffset];
            if (playerColor !== Color.DEFAULT && gridCell && gridCell.color !== playerColor) {
                gridCell.color = playerColor;
                this.setState({
                    grid: [ ...grid ]
                });
            }
        }
    }

    // This method is called after the player stops moving
    onMovementEnd() {
        this.setState({
            isPlayerMoving: false
        });
    }

    render() {
        const tiles = [];

        for (let i = 0; i < this.state.grid.length; i += 1) {
            for (let j = 0; j < this.state.grid[i].length; j += 1) {
                if (!this.state.grid[i][j]) {
                    continue;
                }

                const gridCell = this.state.grid[i][j];
                const key = `${i},${j}`;
                tiles.push(
                    <Tile color={gridCell?.color} alt={(i + j) % 2 === 0}
                        row={i} col={j} key={key} />
                );
            }
        }

        return (
            <div className="tile-grid" tabIndex={1} onKeyDown={this.onKeyDown}>
                { tiles }
                <Player color={this.state.playerColor} row={this.state.playerRow}
                    col={this.state.playerCol} onMovementEnd={this.onMovementEnd} />
            </div>
        );
    }
}
