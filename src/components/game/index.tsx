import React from "react";
import { Queue } from '@datastructures-js/queue';
import { cloneDeep } from "lodash";
import produce from "immer";
import GridComponent from "../grid";
import GameHUD from "../game-hud";
import GameComplete from "../game-complete";
import Solution from "../solution";
import GameAdjustMenu from "../game-adjust-menu";
import Settings from "../settings";
import Player from "../../classes/player";
import Grid from "../../classes/grid";
import GameHistory from "../../classes/game-history";
import PlayerAnimationFrame from "../../classes/player-animation-frame";
import TileAnimationFrame from "../../classes/tile-animation-frame";
import { Color, Direction } from "../../services/constants";
import { sleep } from "../../services/util";
import "./game.scss";

import type GridAnimationFrame from "../../classes/grid-animation-frame";
import type { KeyboardEvent } from "react";
import type { GridCellConfig } from "../../classes/grid";
import type { PlayerMovement } from "../../classes/player";

interface GameProps {
    gridConfig: GridCellConfig[][],
    playerRow: number,
    playerCol: number,
    levelNumber: number, // 1-indexed
    levelName: string,
    handleStarUpdate: (levelNumber: number, movesTaken: number) => number,
    starsScoredOnLevel: (levelNum: number) => number,
    starsToUnlockLevel: (levelNum: number) => number
};

interface GameState {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    playerColor: Color,
    showSolution: boolean,
    movesTaken: number,
    gameStarted: boolean,
    gameOver: boolean,
    gameWon: boolean,
    starsWon: number,
    isPlayerMoving: boolean,
    isMenuOpen: boolean,
    areSettingsOpened: boolean
};

export default class Game extends React.Component<GameProps, GameState> {
    movementKeyFnMap: Record<string, Function>;
    utilKeyFnMap: Record<string, Function>;
    keyPressFlagMap: Record<string, boolean>;
    gridAnimationQueue: Queue<GridAnimationFrame>;
    gameContainerRef: React.RefObject<HTMLDivElement>;
    gameHistory: GameHistory;

    constructor(props: GameProps) {
        super(props);
        this.state = {
            grid: new Grid(props.gridConfig),
            playerRow: props.playerRow,
            playerCol: props.playerCol,
            playerColor: Color.DEFAULT,
            showSolution: false,
            movesTaken: 0,
            gameStarted: false,
            gameOver: false,
            gameWon: false,
            starsWon: 0,
            isPlayerMoving: false,
            isMenuOpen: false,
            areSettingsOpened: false
        };

        this.gridAnimationQueue = new Queue();
        this.gameContainerRef = React.createRef();
        this.gameHistory = new GameHistory(
            this.state.grid,
            this.state.playerRow,
            this.state.playerCol,
            this.state.playerColor
        );

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.resetFlags = this.resetFlags.bind(this);
        this.onPlayerAnimationEnd = this.onPlayerAnimationEnd.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.inGameRestart = this.inGameRestart.bind(this);
        this.setMenuOpen = this.setMenuOpen.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);

        this.movementKeyFnMap = {
            ArrowUp: this.movePlayerByKeyDown.bind(this, Direction.UP),
            ArrowDown: this.movePlayerByKeyDown.bind(this, Direction.DOWN),
            ArrowLeft: this.movePlayerByKeyDown.bind(this, Direction.LEFT),
            ArrowRight: this.movePlayerByKeyDown.bind(this, Direction.RIGHT)
        };

        this.utilKeyFnMap = {
            r: this.inGameRestart,
            y: this.redo,
            z: this.undo
        };

        this.keyPressFlagMap = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
    }

    onKeyDown(event: KeyboardEvent): void {

        // Toggle menu
        if (event.key === "Escape" || event.key === "Esc") {
            event.preventDefault();
            this.setMenuOpen(!this.state.isMenuOpen);
        }

        // Button press while menu is opened
        else if (this.state.isMenuOpen) {
            this.handleMenuKeyDown(event);
        }

        // Player movement
        else if (this.movementKeyFnMap[event.key]) {
            event.preventDefault();

            if (!this.keyPressFlagMap[event.key]) {
                this.keyPressFlagMap[event.key] = true;
                this.movementKeyFnMap[event.key](event);
            }
        }

        // Utility function
        else if (this.utilKeyFnMap[event.key]) {
            event.preventDefault();
            this.utilKeyFnMap[event.key]();
        }

        // Toggle solution
        else if (event.key.toLowerCase() === "q") {
            event.preventDefault();
            this.setState({ showSolution: true });
        }
    }

    // Handles key presses while the game menu is opened
    handleMenuKeyDown(event: KeyboardEvent): void {
        const activeEle = document.activeElement;
        const isActiveOnHam = !!activeEle && activeEle.classList.contains("hamburger-react");
        const isActiveOnLink = !!activeEle && activeEle.classList.contains("game-menu-btn");
        const isActiveOnFirst = !!activeEle && activeEle.classList.contains("game-menu-first");
        const isActiveOnLast = !!activeEle && activeEle.classList.contains("game-menu-last");

        // Go to next menu item
        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (!activeEle || isActiveOnLast || (!isActiveOnHam && !isActiveOnLink)) {
                const hamBtn = document.querySelector<HTMLElement>(".hamburger-react");
                hamBtn && hamBtn.focus();
            } else if (isActiveOnHam) {
                const firstBtn = document.querySelector<HTMLElement>(".game-menu-btn");
                firstBtn && firstBtn.focus();
            } else {
                const sibling = activeEle.nextSibling as HTMLElement;
                sibling && sibling.focus();
            }

        }

        // Go to previous menu item
        else if (event.key === "ArrowUp") {
            event.preventDefault();

            if (!activeEle || isActiveOnHam || !isActiveOnLink) {
                const lastBtn = document.querySelector<HTMLElement>(".game-menu-last");
                lastBtn && lastBtn.focus();
            } else if (isActiveOnFirst) {
                const hamBtn = document.querySelector<HTMLElement>(".hamburger-react");
                hamBtn && hamBtn.focus();
            } else {
                const sibling = activeEle.previousSibling as HTMLElement;
                sibling && sibling.focus();
            }
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (this.keyPressFlagMap[event.key]) {
            event.preventDefault();
            this.keyPressFlagMap[event.key] = false;
        } else if (event.key.toLowerCase() === "q") {
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

        // Continuously move the player while key is pressed down, game is not over,
        // and menu is closed
        while (this.keyPressFlagMap[event.key] && !this.state.gameOver && !this.state.isMenuOpen) {

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
                let updatedTileColor = gridCellMovedTo && gridCellMovedTo.updateColor(newColor);
                if (updatedTileColor) {
                    this.gridAnimationQueue.enqueue(
                        new TileAnimationFrame(newRow, newCol, updatedTileColor)
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

            // Record final state in game history
            this.gameHistory.push(gridClone, player.row, player.col, player.color);

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
                    isPlayerMoving: true,
                    gameStarted: true,
                    movesTaken: this.state.movesTaken + 1
                });

                break;
            }

            // Process tile animation
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
        this.setState({ isPlayerMoving: false });

        if (this.gridAnimationQueue.size() > 0) {
            this.startNextAnimation();
        } else if (this.state.grid.isGridSolved()) {
            this.setState({
                gameOver: true,
                gameWon: true,
                starsWon: this.props.handleStarUpdate(this.props.levelNumber, this.state.movesTaken)
            });
        }
    }

    restartGame(): void {
        const newGrid = new Grid(this.props.gridConfig);

        this.setState({
            grid: newGrid,
            playerRow: this.props.playerRow,
            playerCol: this.props.playerCol,
            playerColor: Color.DEFAULT,
            movesTaken: 0,
            gameStarted: false,
            gameOver: false,
            gameWon: false,
            starsWon: 0,
            isPlayerMoving: false,
            showSolution: false,
            isMenuOpen: false
        });

        this.gameHistory = new GameHistory(
            newGrid,
            this.props.playerRow,
            this.props.playerCol,
            Color.DEFAULT
        );

        this.gridAnimationQueue.clear();

        // Re-focus on the game container
        this.gameContainerRef.current && this.gameContainerRef.current.focus();
    }

    // Only restart in the middle of a game if certain conditions are met
    inGameRestart(): void {
        if (!this.canAlterGameState()) {
            return;
        }

        this.restartGame();
    }

    canAlterGameState() {
        return (!this.state.isPlayerMoving && this.gridAnimationQueue.size() <= 0 &&
            !this.state.gameOver && !this.state.isMenuOpen);
    }

    undo(): void {
        if (!this.canAlterGameState()) {
            return;
        }

        const gameHistoryState = this.gameHistory.undo();

        if (gameHistoryState) {
            this.setState({
                grid: gameHistoryState.grid,
                playerRow: gameHistoryState.playerRow,
                playerCol: gameHistoryState.playerCol,
                playerColor: gameHistoryState.playerColor,
                movesTaken: this.state.movesTaken - 1
            });
        }
    }

    redo(): void {
        if (!this.canAlterGameState()) {
            return;
        }

        const gameHistoryState = this.gameHistory.redo();

        if (gameHistoryState) {
            this.setState({
                grid: gameHistoryState.grid,
                playerRow: gameHistoryState.playerRow,
                playerCol: gameHistoryState.playerCol,
                playerColor: gameHistoryState.playerColor,
                movesTaken: this.state.movesTaken + 1
            });
        }
    }

    setMenuOpen(isOpen: boolean): void {
        this.setState({
            isMenuOpen: isOpen
        });

        this.resetFlags();

        // If closing the menu, refocus on the game container
        if (!isOpen) {
            this.gameContainerRef.current && this.gameContainerRef.current.focus();
        }
    }

    showSettings(): void {
        this.setState({
            areSettingsOpened: true
        });
    }

    hideSettings(): void {
        this.setState({
            areSettingsOpened: false
        });
    }

    // Focus on the game container after mounting
    componentDidMount(): void {
        this.gameContainerRef.current && this.gameContainerRef.current.focus();
    }

    componentDidUpdate(prevProps: GameProps): void {
        if (this.props.levelNumber !== prevProps.levelNumber) {
            this.restartGame();
        }
    }

    render() {
        const {
            grid,
            playerRow,
            playerCol,
            playerColor,
            showSolution,
            isPlayerMoving,
            movesTaken,
            gameStarted,
            gameWon,
            isMenuOpen,
            areSettingsOpened
        } = this.state;

        let gameClass = "game";
        gameClass += gameWon ? " game-won" : "";
        gameClass += !gameStarted ? " game-pending" : "";

        const gameStyle = {
            display: this.state.areSettingsOpened ? "none" : "block"
        };

        // Only show the completion component when the user beats the puzzle
        const gameCompleteEle = gameWon ?
            <GameComplete levelNumber={this.props.levelNumber}
                stars={this.state.starsWon}
                restartHandler={this.restartGame}
                starsScoredOnLevel={this.props.starsScoredOnLevel}
                starsToUnlockLevel={this.props.starsToUnlockLevel} /> :
            null;

        return (
            <div>
                <div className={gameClass}
                    ref={this.gameContainerRef}
                    tabIndex={1}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                    onFocus={this.resetFlags}
                    onBlur={this.resetFlags}
                    style={gameStyle}>

                    <GameHUD
                        movesTaken={movesTaken}
                        levelNumber={this.props.levelNumber}
                        levelName={this.props.levelName}
                        isMenuOpen={isMenuOpen}
                        setMenuOpen={this.setMenuOpen}
                        showSettings={this.showSettings} />
                    <Solution
                        grid={grid}
                        playerRow={playerRow}
                        playerCol={playerCol} />
                    <GameAdjustMenu
                        canUndo={this.gameHistory.canUndo()}
                        canRedo={this.gameHistory.canRedo()}
                        restartHandler={this.inGameRestart}
                        undoHandler={this.undo}
                        redoHandler={this.redo} />
                    <GridComponent
                        grid={grid}
                        playerRow={playerRow}
                        playerCol={playerCol}
                        playerColor={playerColor}
                        showSolution={showSolution}
                        isPlayerMoving={isPlayerMoving}
                        onPlayerAnimationEnd={this.onPlayerAnimationEnd} />
                    {gameCompleteEle}
                </div>

                <Settings
                    visible={areSettingsOpened}
                    onGoBack={this.hideSettings} />
            </div>
        );
    }
}
