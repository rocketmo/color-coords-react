import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext } from "../../services/context";
import { SOLUTION_TILE_SIZE } from "../../constants";
import SolutionPlayerCursor from "../solution-player-cursor";
import "./solution.css";

import type Grid from "../../classes/grid";

interface SolutionProps {
    grid: Grid,
    playerRow: number,
    playerCol: number
}

export default function Solution(props: SolutionProps) {
    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 40
    });

    const offset = {
        x: ((width ?? 0) - (props.grid.width * SOLUTION_TILE_SIZE)) / 2,
        y: ((height ?? 0) - (props.grid.height * SOLUTION_TILE_SIZE)) / 2
    };

    const solutionTiles = props.grid.renderSolution();

    return (
        <GridOffsetContext.Provider value={offset}>
            <div className="solution-container" ref={ref}>
                <span className="solution-target-text">Target</span>
                <div className="solution">
                    {solutionTiles}
                    <SolutionPlayerCursor row={props.playerRow} col={props.playerCol} />
                </div>
            </div>
        </GridOffsetContext.Provider>
    );
}
