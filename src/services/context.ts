import React from "react";
import { DEFAULT_TILE_SIZE } from "../services/constants";

interface GridOffset {
    x: number,
    y: number
};

export type { GridOffset };

export const GridOffsetContext: React.Context<GridOffset> = React.createContext({ x: 0, y: 0 });

export const TileSizeContext = React.createContext(DEFAULT_TILE_SIZE);
