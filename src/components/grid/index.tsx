import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import PlayerComponent from "../player";
import { GridOffsetContext } from "../../services/context";
import { TILE_SIZE } from "../../services/constants";
import "./grid.scss";

import type Grid from "../../classes/grid";
import type { Color } from "../../services/constants";
import type { KeyboardEventHandler } from "react";

interface GridProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    playerColor: Color,
    showSolution: boolean,
    isPlayerMoving: boolean,
    onKeyDown: KeyboardEventHandler,
    onKeyUp: KeyboardEventHandler,
    resetFlags: () => void
    onPlayerAnimationEnd: () => void
}

export default function GridComponent(props: GridProps) {
    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    const offset = props.grid.getCenterOffset(TILE_SIZE, width ?? 0, height ?? 0);
    const gridElements = props.grid.renderElements(props.showSolution);

    return (
        <GridOffsetContext.Provider value={offset}>
            <div className="tile-grid" ref={ref} tabIndex={1} onKeyDown={props.onKeyDown}
                onKeyUp={props.onKeyUp} onFocus={props.resetFlags} onBlur={props.resetFlags}>
                { gridElements }
                <PlayerComponent color={props.playerColor} row={props.playerRow}
                    col={props.playerCol} movementToggle={props.isPlayerMoving}
                    onAnimationEnd={props.onPlayerAnimationEnd} />
            </div>
        </GridOffsetContext.Provider>
    );
}
