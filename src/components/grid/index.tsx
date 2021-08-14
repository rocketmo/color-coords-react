import React, { KeyboardEvent } from "react";
import { Queue } from '@datastructures-js/queue';
import Tile from "../tile";
import Player from "../player";
import GridCell from "../../classes/grid-cell";
import GridAnimationFrame from "../../classes/grid-animation-frame";
import "./grid.css";
import { Color } from "../../constants";
import { sleep } from "../../services/util";

interface GridProps {
    grid: (GridCell | null)[][],
    playerRow: number,
    playerCol: number
}

interface GridState {
    grid: (GridCell | null)[][],
    playerRow: number,
    playerCol: number,
    playerColor: Color
}

export default class Grid extends React.Component {
    state: GridState;
    keyFnMap: Record<string, Function>;
    keyPressFlagMap: Record<string, boolean>;
    gridAnimationQueue: Queue<GridAnimationFrame>;
    isPlayerMoving: boolean;

    constructor(props: GridProps) {
        super(props);
        this.state = {
            grid: props.grid ?? [[]],
            playerRow: props.playerRow,
            playerCol: props.playerCol,
            playerColor: Color.DEFAULT
        };

        this.gridAnimationQueue = new Queue();
        this.isPlayerMoving = false;

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.resetFlags = this.resetFlags.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);

        this.keyFnMap = {
            ArrowUp: this.movePlayerByKeyDown.bind(this, -1, 0),
            ArrowDown: this.movePlayerByKeyDown.bind(this, 1, 0),
            ArrowLeft: this.movePlayerByKeyDown.bind(this, 0, -1),
            ArrowRight: this.movePlayerByKeyDown.bind(this, 0, 1)
        };

        this.keyPressFlagMap = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.key && this.keyFnMap[event.key]) {
            event.preventDefault();

            if (!this.keyPressFlagMap[event.key]) {
                this.keyPressFlagMap[event.key] = true;
                this.keyFnMap[event.key](event);
            }
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (event.key && this.keyPressFlagMap[event.key]) {
            event.preventDefault();
            this.keyPressFlagMap[event.key] = false;
        }
    }

    resetFlags(): void {
        for (const key in this.keyPressFlagMap) {
            this.keyPressFlagMap[key] = false;
        }
    }

    async movePlayerByKeyDown(rowOffset: number, colOffset: number, event: KeyboardEvent)
        : Promise<void> {

        // If there is no offset, player will not move
        if (rowOffset === 0 && colOffset === 0) {
            return;
        }

        // Continuously move the player while key is pressed down
        while (this.keyPressFlagMap[event.key]) {

            // Do not move the player if already in motion; wait until next cycle and check again
            if (this.gridAnimationQueue.size() > 0 || this.isPlayerMoving) {
                await sleep(0);
                continue;
            }

            const { grid, playerRow, playerCol, playerColor } = this.state;
            const nextRow = playerRow + rowOffset;
            const nextCol = playerCol + colOffset;

            // Check if the move is valid
            if (grid[nextRow] && grid[nextRow][nextCol]) {

                // Check if the grid tile needs to be updated
                const gridCell = grid[nextRow][nextCol];
                let nextColor = undefined;
                if (playerColor !== Color.DEFAULT && gridCell && gridCell.color !== playerColor) {
                    nextColor = playerColor;
                }

                // Add animation frame
                this.gridAnimationQueue.enqueue(new GridAnimationFrame(nextRow, nextCol, nextColor))

                // Process next animation
                this.startNextAnimation();
            }

            // If not valid, wait until next cycle
            else {
                await sleep(0);
                continue;
            }
        }
    }

    startNextAnimation() {

        // No animations queued
        if (this.gridAnimationQueue.size() <= 0) {
            return;
        }

        // Process the next animation
        const animationFrame = this.gridAnimationQueue.dequeue();

        // Move the player
        this.isPlayerMoving = true;
        this.setState({
            playerRow: animationFrame.row,
            playerCol: animationFrame.col
        });

        // Update the color of the grid tile if necessary
        const gridCell = this.state.grid[animationFrame.row] &&
            this.state.grid[animationFrame.row][animationFrame.col];

        if (animationFrame.gridColor && gridCell && gridCell.color !== animationFrame.gridColor) {
            gridCell.color = animationFrame.gridColor;
            this.setState({
                grid: [ ...this.state.grid ]
            });
        }
    }

    // This method is called after single animation frame is completed
    onAnimationEnd() {
        this.isPlayerMoving = false;
        this.startNextAnimation();
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
            <div className="tile-grid" tabIndex={1} onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp} onFocus={this.resetFlags} onBlur={this.resetFlags}>
                { tiles }
                <Player color={this.state.playerColor} row={this.state.playerRow}
                    col={this.state.playerCol} onAnimationEnd={this.onAnimationEnd} />
            </div>
        );
    }
}
