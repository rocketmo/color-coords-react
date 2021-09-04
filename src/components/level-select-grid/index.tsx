import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { DEFAULT_SOLUTION_TILE_SIZE } from "../../services/constants";
import "./level-select-grid.scss";

import type Grid from "../../classes/grid";

interface LevelSelectGridProps {
    grid: Grid
};

export default function LevelSelectGrid(props: LevelSelectGridProps) {
    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    const offset = props.grid.getCenterOffset(DEFAULT_SOLUTION_TILE_SIZE, width ?? 0, height ?? 0);
    const gridTiles = props.grid.renderSolution();

    return (
        <GridOffsetContext.Provider value={offset}>
            <TileSizeContext.Provider value={DEFAULT_SOLUTION_TILE_SIZE}>
                <div className="level-preview-grid" ref={ref}>
                    {gridTiles}
                </div>
            </TileSizeContext.Provider>
        </GridOffsetContext.Provider>
    );
}
