import React from "react";
import { Queue } from '@datastructures-js/queue';
import { cloneDeep } from "lodash";
import produce from "immer";
import GridComponent from "../grid";
import Player, { PlayerMovement } from "../../classes/player";
import Grid, { GridCellConfig } from "../../classes/grid";
import GridAnimationFrame from "../../classes/grid-animation-frame";
import PlayerAnimationFrame from "../../classes/player-animation-frame";
import TileAnimationFrame from "../../classes/tile-animation-frame";
import "./game.css";
import { Color, Direction } from "../../constants";
import { sleep } from "../../services/util";

import type { KeyboardEvent } from "react";

export interface GameProps {
    gridConfig: GridCellConfig[][],
    playerRow: number,
    playerCol: number
}

interface GameState {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    playerColor: Color,
    showSolution: boolean,
    movesTaken: number,
    gameOver: boolean,
    isPlayerMoving: boolean;
}

export default class Game extends React.Component<GameProps, GameState> {
    keyFnMap: Record<string, Function>;
    keyPressFlagMap: Record<string, boolean>;
    gridAnimationQueue: Queue<GridAnimationFrame>;

    constructor(props: GameProps) {
        super(props);
        this.state = {
            grid: new Grid(props.gridConfig),
            playerRow: props.playerRow,
            playerCol: props.playerCol,
            playerColor: Color.DEFAULT,
            showSolution: false,
            movesTaken: 0,
            gameOver: false,
            isPlayerMoving: false
        };

        this.gridAnimationQueue = new Queue();

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.resetFlags = this.resetFlags.bind(this);
        this.onPlayerAnimationEnd = this.onPlayerAnimationEnd.bind(this);

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
        if (this.keyFnMap[event.key]) {
            event.preventDefault();

            if (!this.keyPressFlagMap[event.key]) {
                this.keyPressFlagMap[event.key] = true;
                this.keyFnMap[event.key](event);
            }
        } else if (event.key.toLowerCase() === "z") {
            event.preventDefault();
            this.setState({ showSolution: true });
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (this.keyPressFlagMap[event.key]) {
            event.preventDefault();
            this.keyPressFlagMap[event.key] = false;
        } else if (event.key.toLowerCase() === "z") {
            event.preventDefault();
            this.setState({ showSolution: false });
        }
    }

    resetFlags(): void {
        for (const key in this.keyPressFlagMap) {
            this.keyPressFlagMap[key] = false;
        }

        this.setState({ showSolution: false });
    }

    async movePlayerByKeyDown(dir: Direction, event: KeyboardEvent): Promise<void> {

        let movedPrevLoop = false; // Flag to prevent infinite loop

        // Continuously move the player while key is pressed down and game is not over
        while (this.keyPressFlagMap[event.key] && !this.state.gameOver) {

            // Do not move the player if already in motion; wait until next cycle and check again
            if (this.gridAnimationQueue.size() > 0 || this.state.isPlayerMoving || movedPrevLoop) {
                movedPrevLoop = false;
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

            // Set flag
            movedPrevLoop = true;
        }
    }

    startNextAnimation(): void {

        // Process animations until we process a player animation
        while (this.gridAnimationQueue.size() > 0) {
            const animationFrame = this.gridAnimationQueue.dequeue();

            // Process player animation
            if (animationFrame.isPlayerAnimation()) {
                // Move the player
                this.setState({
                    playerRow: animationFrame.row,
                    playerCol: animationFrame.col,
                    playerColor: animationFrame.color,
                    isPlayerMoving: true
                });

                break;
            }

            // Proces tile animation
            else {
                this.setState({
                    grid: produce(this.state.grid, draft => {
                        const gridCell = draft.getCellAt(animationFrame.row, animationFrame.col);
                        gridCell && (gridCell.color = animationFrame.color);
                    })
                });
            }
        }
    }

    // This method is called after player animation is completed
    onPlayerAnimationEnd(): void {
        this.setState({
            movesTaken: this.state.movesTaken + 1,
            isPlayerMoving: false
        });

        if (this.gridAnimationQueue.size() > 0) {
            this.startNextAnimation();
        } else if (this.state.grid.isGridSolved()) {
            console.log("Solved."); // TODO: Remove this line
            this.setState({ gameOver: true });
        }
    }

    render() {
        const {
            grid,
            playerRow,
            playerCol,
            playerColor,
            showSolution,
            isPlayerMoving
        } = this.state;

        // TODO: Replace Moves text with component
        return (
            <div className="game">
                <div className="game-grid-container">
                    <GridComponent
                        grid={grid}
                        playerRow={playerRow}
                        playerCol={playerCol}
                        playerColor={playerColor}
                        showSolution={showSolution}
                        isPlayerMoving={isPlayerMoving}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        resetFlags={this.resetFlags}
                        onPlayerAnimationEnd={this.onPlayerAnimationEnd} />
                </div>
                <div style={{position: "absolute", left: "0", top: "0"}}>
                    Moves: {this.state.movesTaken}
                </div>
            </div>
        );
    }
}
