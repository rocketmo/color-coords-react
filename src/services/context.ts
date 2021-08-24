import React from "react";

interface GridOffset {
    x: number,
    y: number
};

export type { GridOffset };

export const GridOffsetContext: React.Context<GridOffset> = React.createContext({ x: 0, y: 0 });
