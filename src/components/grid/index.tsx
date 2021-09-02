import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import PlayerComponent from "../player";
import { GridOffsetContext } from "../../services/context";
import { TILE_SIZE } from "../../services/constants";
import "./grid.scss";

import type Grid from "../../classes/grid";
import type { Color } from "../../services/constants";

const TOP_MENU_HEIGHT = 48;
const SOLUTION_WIDTH_MIN = 200;
const SOLUTION_WIDTH_MAX = 300;
const SOLUTION_VW = 0.2;

interface GridProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    playerColor: Color,
    showSolution: boolean,
    isPlayerMoving: boolean
    onPlayerAnimationEnd: () => void,
    onTilePress: (row: number, col: number) => void
}

export default function GridComponent(props: GridProps) {
    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    // Get grid offset, accounting for the top menu and solution window
    // TODO: Allow user to move re-position grid
    const offset = props.grid.getCenterOffset(TILE_SIZE, width ?? 0, height ?? 0);
    let solutionWidth = ((width ?? 0) * SOLUTION_VW);
    solutionWidth = Math.max(SOLUTION_WIDTH_MIN, solutionWidth);
    solutionWidth = Math.min(SOLUTION_WIDTH_MAX, solutionWidth);

    offset.y += (TOP_MENU_HEIGHT / 2);
    offset.x -= (solutionWidth / 2);

    const gridElements = props.isPlayerMoving ? props.grid.renderElements(props.showSolution) :
        props.grid.renderElements(
            props.showSolution,
            props.playerRow,
            props.playerCol,
            props.onTilePress
        );

    return (
        <GridOffsetContext.Provider value={offset}>
            <div className="tile-grid" ref={ref}>
                { gridElements }
                <PlayerComponent color={props.playerColor} row={props.playerRow}
                    col={props.playerCol} movementToggle={props.isPlayerMoving}
                    onAnimationEnd={props.onPlayerAnimationEnd} />
            </div>
        </GridOffsetContext.Provider>
    );
}
