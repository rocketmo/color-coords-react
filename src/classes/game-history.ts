import type Grid from "./grid";
import type { Color } from "../services/constants";

const HISTORY_LIMIT = 60;

interface GameHistoryState {
    grid: Grid;
    playerRow: number;
    playerCol: number;
    playerColor: Color;
};

class GameHistoryNode {
    grid: Grid;
    playerRow: number;
    playerCol: number;
    playerColor: Color;
    previous: (GameHistoryNode | null) = null;
    next: (GameHistoryNode | null) = null;

    constructor (grid: Grid, playerRow: number, playerCol: number, playerColor: Color) {
        this.grid = grid;
        this.playerRow = playerRow;
        this.playerCol = playerCol;
        this.playerColor = playerColor;
    }
};

class GameHistoryDoublyLinkedList {
    private start: (GameHistoryNode | null) = null;
    private end: (GameHistoryNode | null) = null;
    private _size: number = 0;

    get size(): number {
        return this._size;
    }

    push(grid: Grid, playerRow: number, playerCol: number, playerColor: Color): GameHistoryNode {
        const node = new GameHistoryNode(grid, playerRow, playerCol, playerColor);
        this._size += 1;

        // If there is no end node, then there is no node in the list
        if (!this.end) {
            this.start = this.end = node;
        }

        // Otherwise, just add normally
        else {
            node.previous = this.end;
            this.end.next = node;
            this.end = node;
        }

        return node;
    }

    pop(): (GameHistoryNode | null) {

        // No nodes in the list
        if (!this.end) {
            return null
        }

        // Only one node in the list
        if (this.start === this.end) {
            const node = this.end;
            this.start = this.end = null;
            this._size -= 1;

            return node;
        }

        // Otherwise, pop the end and set the second last end node to be the new end node
        const node = this.end;
        this.end = this.end.previous; // Move second last end node to end

        this.end && (this.end.next = null); // Remove reference to popped node
        this._size -= 1;

        return node;
    }

    unshift(grid: Grid, playerRow: number, playerCol: number, playerColor: Color): GameHistoryNode {
        const node = new GameHistoryNode(grid, playerRow, playerCol, playerColor);
        this._size += 1;

        // If there is no start node, then there is no node in the list
        if (!this.start) {
            this.start = this.end = node;
        }

        // Otherwise, just add normally
        else {
            node.next = this.start;
            this.start.previous = node;
            this.start = node;
        }

        return node;
    }

    shift(): (GameHistoryNode | null) {

        // No nodes in the list
        if (!this.start) {
            return null
        }

        // Only one node in the list
        if (this.start === this.end) {
            const node = this.start;
            this.start = this.end = null;
            this._size -= 1;

            return node;
        }

        // Otherwise, shift the first element and set the second node to be the new start node
        const node = this.start;
        this.start = this.start.next; // Move second node to start

        this.start && (this.start.previous = null); // Remove reference to shifted node
        this._size -= 1;

        return node;
    }

    clear(): void {
        this.start = null;
        this.end = null;
        this._size = 0;
    }
}

export default class GameHistory {
    private undoHistory: GameHistoryDoublyLinkedList;
    private redoHistory: GameHistoryDoublyLinkedList;
    private currentState: GameHistoryState;

    constructor(grid: Grid, playerRow: number, playerCol: number, playerColor: Color) {
        this.undoHistory = new GameHistoryDoublyLinkedList();
        this.redoHistory = new GameHistoryDoublyLinkedList();
        this.currentState = { grid, playerRow, playerCol, playerColor };
    }

    get size(): number {
        return this.undoHistory.size + this.redoHistory.size;
    }

    push(grid: Grid, playerRow: number, playerCol: number, playerColor: Color): void {
        // Push current state onto undo history
        this.undoHistory.push(
            this.currentState.grid,
            this.currentState.playerRow,
            this.currentState.playerCol,
            this.currentState.playerColor
        );

        // Replace current state with new state
        this.currentState.grid = grid;
        this.currentState.playerRow = playerRow;
        this.currentState.playerCol = playerCol;
        this.currentState.playerColor = playerColor;

        // Clear any states in the redo history if we add a new state
        this.redoHistory.clear();

        // If we're over the limit, shift states from the beginning
        while (this.size > HISTORY_LIMIT) {
            this.undoHistory.shift();
        }
    }

    undo(): (GameHistoryState | null) {
        if (!this.canUndo()) {
            return null;
        }

        // Otherwise pop from undo history
        const undoNode = this.undoHistory.pop();

        // Push current state onto redo history
        this.redoHistory.push(
            this.currentState.grid,
            this.currentState.playerRow,
            this.currentState.playerCol,
            this.currentState.playerColor
        );

        // Update current state and return
        if (undoNode) {
            this.currentState.grid = undoNode.grid;
            this.currentState.playerRow = undoNode.playerRow;
            this.currentState.playerCol = undoNode.playerCol;
            this.currentState.playerColor = undoNode.playerColor;

            return {
                grid: undoNode.grid,
                playerRow: undoNode.playerRow,
                playerCol: undoNode.playerCol,
                playerColor: undoNode.playerColor,
            };
        }

        return null;
    }

    redo(): (GameHistoryState | null) {
        if (!this.canRedo()) {
            return null;
        }

        // Otherwise pop from redo history
        const redoNode = this.redoHistory.pop();

        // Push current state onto undo history
        this.undoHistory.push(
            this.currentState.grid,
            this.currentState.playerRow,
            this.currentState.playerCol,
            this.currentState.playerColor
        );

        if (redoNode) {
            this.currentState.grid = redoNode.grid;
            this.currentState.playerRow = redoNode.playerRow;
            this.currentState.playerCol = redoNode.playerCol;
            this.currentState.playerColor = redoNode.playerColor;

            return {
                grid: redoNode.grid,
                playerRow: redoNode.playerRow,
                playerCol: redoNode.playerCol,
                playerColor: redoNode.playerColor,
            };
        }

        return null;
    }

    canUndo(): boolean {
        return this.undoHistory.size > 0;
    }

    canRedo(): boolean {
        return this.redoHistory.size > 0;
    }
}
