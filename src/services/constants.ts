export const DEFAULT_TILE_SIZE = 48;
export const DEFAULT_SOLUTION_TILE_SIZE = 20;
export const DEFAULT_SOLUTION_CONTAINER_SIZE = 300;
export const TOP_MENU_HEIGHT = 48;

export const TILES_SIZES = [ 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96 ];

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
