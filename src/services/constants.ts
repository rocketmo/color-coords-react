export const TILE_SIZE = 48;
export const SOLUTION_TILE_SIZE = 20;

export enum Color {
    BLUE = "blue",
    DARK = "dark",
    DEFAULT = "default",
    GREEN = "green",
    ORANGE = "orange",
    PURPLE = "purple",
    RED = "red",
    YELLOW = "yellow"
};

export enum AnimationType {
    PLAYER = "player",
    TILE = "tile"
};

export enum Direction {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
};

interface DirectionOffset {
    rowOffset: number,
    colOffset: number
};

export const DIR_OFFSET: Record<Direction, DirectionOffset> = {
    [Direction.UP]: { rowOffset: -1, colOffset: 0 },
    [Direction.DOWN]: { rowOffset: 1, colOffset: 0 },
    [Direction.LEFT]: { rowOffset: 0, colOffset: -1 },
    [Direction.RIGHT]: { rowOffset: 0, colOffset: 1 }
};
