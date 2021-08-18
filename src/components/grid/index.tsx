import React from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import PlayerComponent from "../player";
import { GridOffsetContext } from "../../services/context";
import { TILE_SIZE } from "../../constants";
import "./grid.css";

import type Grid from "../../classes/grid";
import type { Color } from "../../constants";
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
        refreshRate: 40
    });

    const offset = {
        x: ((width ?? 0) - (props.grid.width * TILE_SIZE)) / 2,
        y: ((height ?? 0) - (props.grid.height * TILE_SIZE)) / 2
    };

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
