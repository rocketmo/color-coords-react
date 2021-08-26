import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext } from "../../services/context";
import { SOLUTION_TILE_SIZE } from "../../services/constants";
import SolutionPlayerCursor from "../solution-player-cursor";
import "./solution.scss";

import type Grid from "../../classes/grid";

interface SolutionProps {
    grid: Grid,
    playerRow: number,
    playerCol: number
};

export default function Solution(props: SolutionProps) {
    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    const offset = props.grid.getCenterOffset(SOLUTION_TILE_SIZE, width ?? 0, height ?? 0);
    const solutionTiles = props.grid.renderSolution();

    return (
        <GridOffsetContext.Provider value={offset}>
            <div className="solution-container">
                <span className="solution-target-text">Target</span>
                <div className="solution" ref={ref}>
                    {solutionTiles}
                    <SolutionPlayerCursor row={props.playerRow} col={props.playerCol} />
                </div>
            </div>
        </GridOffsetContext.Provider>
    );
}
