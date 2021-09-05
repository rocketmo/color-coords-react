import { useState, useEffect } from "react";
import { Resizable } from "react-resizable";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { getBoundValue, isInElementById } from "../../services/util";
import SolutionPlayerCursor from "../solution-player-cursor";
import SolutionAdjustMenu from "../solution-adjust-menu";
import {
    TILES_SIZES,
    DEFAULT_SOLUTION_TILE_SIZE,
    DEFAULT_SOLUTION_CONTAINER_SIZE
} from "../../services/constants";
import "./solution.scss";

import type Grid from "../../classes/grid";
import type { SyntheticEvent } from "react";
import type { ResizeCallbackData } from "react-resizable";

const MIN_DRAG_X_PCT = -0.5;
const MAX_DRAG_X_PCT = 0.5;
const MIN_DRAG_Y_PCT = -0.5;
const MAX_DRAG_Y_PCT = 0.5;
const DEFAULT_TILE_SIZE_INDEX = 2;

interface SolutionProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    levelNumber: number
};

export default function Solution(props: SolutionProps) {
    const [ isPointerDown, setIsPointerDown ] = useState(false);
    const [ lastPointerX, setLastPointerX] = useState(0);
    const [ lastPointerY, setLastPointerY] = useState(0);
    const [ offsetPctX, setOffsetPctX ] = useState(0);
    const [ offsetPctY, setOffsetPctY ] = useState(0);
    const [ tileSizeIndex, setTileSizeIndex ] = useState(DEFAULT_TILE_SIZE_INDEX);
    const [ containerWidth, setContainerWidth ] = useState(DEFAULT_SOLUTION_CONTAINER_SIZE);
    const [ containerHeight, setContainerHeight ] = useState(DEFAULT_SOLUTION_CONTAINER_SIZE);

    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    const tileSize = TILES_SIZES[tileSizeIndex] ?? DEFAULT_SOLUTION_TILE_SIZE;
    const offset = props.grid.getCenterOffset(tileSize, width ?? 0, height ?? 0);

    // Add draggable offset
    offset.x += (offsetPctX * (width ?? 0));
    offset.y += (offsetPctY * (height ?? 0));

    // Reset to default offset and zoom after we switch to a new level
    useEffect(() => {
        setOffsetPctX(0);
        setOffsetPctY(0);
        setTileSizeIndex(DEFAULT_TILE_SIZE_INDEX);
        setContainerWidth(DEFAULT_SOLUTION_CONTAINER_SIZE);
        setContainerHeight(DEFAULT_SOLUTION_CONTAINER_SIZE);
    }, [ props.levelNumber ]); // eslint-disable-line react-hooks/exhaustive-deps

    const solutionTiles = props.grid.renderSolution();

    const onPointerDown = (event: PointerEvent): void => {

        // Do not start dragging if we clicked on the adjustment menu
        if (isInElementById(event.target as HTMLElement, "solution-adjust-menu")) {
            return;
        }

        setIsPointerDown(true);
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
        ref.current && ref.current.setPointerCapture(event.pointerId);
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

    const onPointerUp = async (event: PointerEvent) => {
        setIsPointerDown(false);
        ref.current && ref.current.releasePointerCapture(event.pointerId);
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

    const onResize = (event: SyntheticEvent, data: ResizeCallbackData) => {
        setContainerWidth(data.size.width);
        setContainerHeight(data.size.height);
    };

    const solutionContainerProps: Record<string, any> = {
        className: `solution ${isPointerDown ? "solution-dragging" : "" }`,
        ref,
        onPointerDown,
        onPointerUp,
        style: {
            height: `${containerHeight}px`,
            width: `${containerWidth}px`
        }
    };

    if (isPointerDown) {
        solutionContainerProps.onPointerMove = onPointerMove;
    }

    return (
        <GridOffsetContext.Provider value={offset}>
            <TileSizeContext.Provider value={tileSize}>
                <Resizable height={containerHeight} width={containerWidth} onResize={onResize}
                    minConstraints={[100, 100]} maxConstraints={[500, 500]}
                    resizeHandles={["sw", "se" ]}>
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
                </Resizable>
            </TileSizeContext.Provider>
        </GridOffsetContext.Provider>
    );
}
