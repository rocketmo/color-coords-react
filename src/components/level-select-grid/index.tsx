import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext } from "../../services/context";
import { SOLUTION_TILE_SIZE } from "../../services/constants";
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

    const offset = props.grid.getCenterOffset(SOLUTION_TILE_SIZE, width ?? 0, height ?? 0);
    const gridTiles = props.grid.renderSolution();

    return (
        <GridOffsetContext.Provider value={offset}>
            <div className="level-preview-grid" ref={ref}>
                {gridTiles}
            </div>
        </GridOffsetContext.Provider>
    );
}
