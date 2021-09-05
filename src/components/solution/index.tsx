import { useState } from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { DEFAULT_SOLUTION_TILE_SIZE, TILES_SIZES } from "../../services/constants";
import { getBoundValue, isInElementById } from "../../services/util";
import SolutionPlayerCursor from "../solution-player-cursor";
import SolutionAdjustMenu from "../solution-adjust-menu";
import "./solution.scss";

import type Grid from "../../classes/grid";

const MIN_DRAG_X_PCT = -0.5;
const MAX_DRAG_X_PCT = 0.5;
const MIN_DRAG_Y_PCT = -0.5;
const MAX_DRAG_Y_PCT = 0.5;
const SOLUTION_ID = "solution";
const DEFAULT_TILE_SIZE_INDEX = 2;

interface SolutionProps {
    grid: Grid,
    playerRow: number,
    playerCol: number
};

export default function Solution(props: SolutionProps) {
    const [ isPointerDown, setIsPointerDown ] = useState(false);
    const [ lastPointerX, setLastPointerX] = useState(0);
    const [ lastPointerY, setLastPointerY] = useState(0);
    const [ offsetPctX, setOffsetPctX ] = useState(0);
    const [ offsetPctY, setOffsetPctY ] = useState(0);
    const [ tileSizeIndex, setTileSizeIndex ] = useState(DEFAULT_TILE_SIZE_INDEX);

    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    const tileSize = TILES_SIZES[tileSizeIndex] ?? DEFAULT_SOLUTION_TILE_SIZE;
    const offset = props.grid.getCenterOffset(tileSize, width ?? 0, height ?? 0);

    // Add draggable offset
    offset.x += (offsetPctX * (width ?? 0));
    offset.y += (offsetPctY * (height ?? 0));

    const solutionTiles = props.grid.renderSolution();

    const onPointerDown = (event: PointerEvent): void => {
        setIsPointerDown(true);
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
    };

    const onPointerMove = (event: PointerEvent): void => {
        // Do not process unless the pointer is pressed down
        if (!isPointerDown) {
            return;
        }

        // Set the offset
        let nextOffsetPctX = offsetPctX + ((event.clientX - lastPointerX) / (width || 1));
        nextOffsetPctX = getBoundValue(nextOffsetPctX, MAX_DRAG_X_PCT, MIN_DRAG_X_PCT);

        let nextOffsetPctY = offsetPctY + ((event.clientY - lastPointerY) / (height || 1));
        nextOffsetPctY = getBoundValue(nextOffsetPctY, MAX_DRAG_Y_PCT, MIN_DRAG_Y_PCT);

        setOffsetPctX(nextOffsetPctX);
        setOffsetPctY(nextOffsetPctY);

        // Set last pointer coordinates
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
    };

    const onPointerUp = async () => {
        setIsPointerDown(false);
    };

    const onPointerLeave = (event: PointerEvent): void => {
        if (isInElementById(event.target as HTMLElement, SOLUTION_ID) &&
            (!event.relatedTarget ||
                !isInElementById(event.relatedTarget as HTMLElement, SOLUTION_ID))) {
            onPointerUp();
        }
    };

    const canZoomIn = tileSizeIndex < TILES_SIZES.length - 1;
    const canZoomOut = tileSizeIndex  > 0;

    const zoomIn = (): void => {
        if (canZoomIn) {
            setTileSizeIndex(tileSizeIndex + 1);
        }
    };

    const zoomOut = (): void => {
        if (canZoomOut) {
            setTileSizeIndex(tileSizeIndex - 1);
        }
    };

    const solutionContainerProps: Record<string, any> = {
        id: SOLUTION_ID,
        className: `${SOLUTION_ID} ${isPointerDown ? "solution-dragging" : "" }`,
        ref,
        onPointerDown,
        onPointerUp,
        onPointerLeave
    };

    if (isPointerDown) {
        solutionContainerProps.onPointerMove = onPointerMove;
    }

    return (
        <GridOffsetContext.Provider value={offset}>
            <TileSizeContext.Provider value={tileSize}>
                <div className="solution-container">
                    <span className="solution-target-text">Target</span>
                    <div {...solutionContainerProps}>
                        <SolutionAdjustMenu
                            canZoomIn={canZoomIn}
                            canZoomOut={canZoomOut}
                            zoomInHandler={zoomIn}
                            zoomOutHandler={zoomOut} />
                        {solutionTiles}
                        <SolutionPlayerCursor row={props.playerRow} col={props.playerCol} />
                    </div>
                </div>
            </TileSizeContext.Provider>
        </GridOffsetContext.Provider>
    );
}
