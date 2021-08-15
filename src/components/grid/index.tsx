import React, { KeyboardEvent, TransitionEvent } from "react";
import { Queue } from '@datastructures-js/queue';
import { cloneDeep } from "lodash";
import PlayerComponent from "../player";
import Player, { PlayerMovement } from "../../classes/player";
import GridCell from "../../classes/grid-cell";
import GridAnimationFrame from "../../classes/grid-animation-frame";
import PlayerAnimationFrame from "../../classes/player-animation-frame";
import TileAnimationFrame from "../../classes/tile-animation-frame";
import "./grid.css";
import { Color, Direction } from "../../constants";
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
            ArrowUp: this.movePlayerByKeyDown.bind(this, Direction.UP),
            ArrowDown: this.movePlayerByKeyDown.bind(this, Direction.DOWN),
            ArrowLeft: this.movePlayerByKeyDown.bind(this, Direction.LEFT),
            ArrowRight: this.movePlayerByKeyDown.bind(this, Direction.RIGHT)
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

    async movePlayerByKeyDown(dir: Direction, event: KeyboardEvent): Promise<void> {

        // Continuously move the player while key is pressed down
        while (this.keyPressFlagMap[event.key]) {

            // Do not move the player if already in motion; wait until next cycle and check again
            if (this.gridAnimationQueue.size() > 0 || this.isPlayerMoving) {
                await sleep(0);
                continue;
            }

            const { grid, playerRow, playerCol, playerColor } = this.state;
            const gridClone = cloneDeep(grid);
            const player = new Player(playerRow, playerCol, gridClone, playerColor);

            let playerMovement: PlayerMovement = { currentDirection: dir, prevDirection: null };
            let moveResult = player.move(playerMovement);

            // If move is invalid, wait until next cycle
            if (!moveResult.moved) {
                await sleep(0);
                continue;
            }

            // Otherwise, add animation frames until the player stops moving
            while (moveResult.moved) {

                const { newRow, newCol, newColor, gridCellMovedTo } = moveResult;

                // Check if the grid tile needs to be updated
                if (gridCellMovedTo && newColor !== Color.DEFAULT &&
                    gridCellMovedTo.color !== newColor) {

                    gridCellMovedTo.color = newColor;
                    this.gridAnimationQueue.enqueue(
                        new TileAnimationFrame(newRow, newCol, newColor)
                    );
                }

                // Add player animation frame
                this.gridAnimationQueue.enqueue(
                    new PlayerAnimationFrame(newRow, newCol, newColor)
                );

                // Try to move again
                playerMovement = {
                    currentDirection: null,
                    prevDirection: playerMovement.currentDirection
                };

                moveResult = player.move(playerMovement);
            }

            // Process next animation
            this.startNextAnimation();
        }
    }

    startNextAnimation() {

        // Process animations until we process a player animation
        while (this.gridAnimationQueue.size() > 0) {
            const animationFrame = this.gridAnimationQueue.dequeue();

            // Process player animation
            if (animationFrame.isPlayerAnimation()) {
                // Move the player
                this.isPlayerMoving = true;
                this.setState({
                    playerRow: animationFrame.row,
                    playerCol: animationFrame.col,
                    playerColor: animationFrame.color
                });

                break;
            }

            // Proces tile animation
            else {
                const gridCell = this.state.grid[animationFrame.row] &&
                    this.state.grid[animationFrame.row][animationFrame.col];

                if (gridCell && gridCell.color !== animationFrame.color) {
                    gridCell.color = animationFrame.color;
                    this.setState({
                        grid: [ ...this.state.grid ]
                    });
                }
            }
        }
    }

    // This method is called after single animation frame is completed
    onAnimationEnd(event: TransitionEvent) {
        if (event.propertyName === "left" || event.propertyName === "top") {
            this.isPlayerMoving = false;
            this.startNextAnimation();
        }
    }

    render() {
        const tiles = [];

        for (let i = 0; i < this.state.grid.length; i += 1) {
            for (let j = 0; j < this.state.grid[i].length; j += 1) {
                const gridCell = this.state.grid[i][j];

                if (gridCell) {
                    tiles.push(...gridCell.render(i, j));
                }
            }
        }

        return (
            <div className="tile-grid" tabIndex={1} onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp} onFocus={this.resetFlags} onBlur={this.resetFlags}>
                { tiles }
                <PlayerComponent color={this.state.playerColor} row={this.state.playerRow}
                    col={this.state.playerCol} onAnimationEnd={this.onAnimationEnd} />
            </div>
        );
    }
}
