import { useState, useEffect, useRef } from "react";
import { Resizable } from "react-resizable";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { getBoundValue, isInElementById } from "../../services/util";
import SolutionPlayerCursor from "../solution-player-cursor";
import SolutionAdjustMenu from "../solution-adjust-menu";
import {
    TILES_SIZES,
    DEFAULT_SOLUTION_TILE_SIZE,
    DEFAULT_SOLUTION_CONTAINER_SIZE,
    TOP_MENU_HEIGHT
} from "../../services/constants";
import "./solution.scss";

import type Grid from "../../classes/grid";
import type { SyntheticEvent } from "react";
import type { ResizeCallbackData } from "react-resizable";

const MIN_GRID_DRAG_X_PCT = -0.5;
const MAX_GRID_DRAG_X_PCT = 0.5;
const MIN_GRID_DRAG_Y_PCT = -0.5;
const MAX_GRID_DRAG_Y_PCT = 0.5;
const DEFAULT_TILE_SIZE_INDEX = 2;
const DEFAULT_CONTAINER_OFFSET = 4;
const MIN_CONTAINER_SIZE = 100;
const MAX_CONTAINER_SIZE = 500;
const CONTAINER_LEFT_ADJUST = 12;
const CONTAINER_BOTTOM_ADJUST = TOP_MENU_HEIGHT + 36;

interface SolutionProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    levelNumber: number,
    shouldResetLayout: boolean,
    gameOver: boolean,
    isMenuOpen: boolean,
    gridWidth?: number,
    gridHeight?: number
};

function getBoundedContainerOffsetPctX(
    offsetPct: number,
    solutionWidth?: number,
    gridWidth?: number
): number {
    if (!solutionWidth || !gridWidth) {
        return 0;
    }

    const minOffset = -(DEFAULT_CONTAINER_OFFSET / gridWidth);
    const maxOffset = Math.max(minOffset,
        (gridWidth - solutionWidth - CONTAINER_LEFT_ADJUST) / gridWidth);
    return getBoundValue(offsetPct, maxOffset, minOffset);
}

function getBoundedContainerOffsetPctY(
    offsetPct: number,
    solutionHeight?: number,
    gridHeight?: number
): number {
    if (!solutionHeight || !gridHeight) {
        return 0;
    }

    const minOffset = -(DEFAULT_CONTAINER_OFFSET / gridHeight);
    const maxOffset = Math.max(minOffset,
        (gridHeight - solutionHeight - CONTAINER_BOTTOM_ADJUST) / gridHeight);
    return getBoundValue(offsetPct, maxOffset, minOffset);
}

function getContainerOffsetX(offsetPct: number, gridWidth?: number): number {
    if (!gridWidth) {
        return DEFAULT_CONTAINER_OFFSET;
    }

    return DEFAULT_CONTAINER_OFFSET + (offsetPct * gridWidth);
}

function getContainerOffsetY(offsetPct: number, gridHeight?: number): number {
    if (!gridHeight) {
        return DEFAULT_CONTAINER_OFFSET;
    }

    return DEFAULT_CONTAINER_OFFSET + TOP_MENU_HEIGHT + (offsetPct * gridHeight);
}

function getProperContainerSize(
    width: number,
    height: number,
    offsetPctX: number,
    offsetPctY: number,
    gridWidth: number,
    gridHeight: number
): { width: number, height: number } {
    const offsetX = getContainerOffsetX(offsetPctX, gridWidth);
    const offsetY = getContainerOffsetY(offsetPctY, gridHeight);

    // TODO: Find a better way to find the max sizes, if possible
    const maxContainerWidth = gridWidth - offsetX - 8;
    const maxContainerHeight = gridHeight - offsetY - 32;

    return {
        width: Math.max(Math.min(width, maxContainerWidth), MIN_CONTAINER_SIZE),
        height: Math.max(Math.min(height, maxContainerHeight), MIN_CONTAINER_SIZE)
    };
}

export default function Solution(props: SolutionProps) {
    // Sizes
    const [ tileSizeIndex, setTileSizeIndex ] = useState(DEFAULT_TILE_SIZE_INDEX);
    const [ containerWidth, setContainerWidth ] = useState(DEFAULT_SOLUTION_CONTAINER_SIZE);
    const [ containerHeight, setContainerHeight ] = useState(DEFAULT_SOLUTION_CONTAINER_SIZE);

    // Pointer position
    const [ lastPointerX, setLastPointerX] = useState(0);
    const [ lastPointerY, setLastPointerY] = useState(0);

    // Grid offset
    const [ isGridPointerDown, setIsGridPointerDown ] = useState(false);
    const [ gridOffsetPctX, setGridOffsetPctX ] = useState(0);
    const [ gridOffsetPctY, setGridOffsetPctY ] = useState(0);

    // Container offset
    const [ isContainerPointerDown, setIsContainerPointerDown ] = useState(false);
    const [ containerOffsetPctX, setContainerOffsetPctX ] = useState(0);
    const [ containerOffsetPctY, setContainerOffsetPctY ] = useState(0);

    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    const tileSize = TILES_SIZES[tileSizeIndex] ?? DEFAULT_SOLUTION_TILE_SIZE;
    const offset = props.grid.getCenterOffset(tileSize, width ?? 0, height ?? 0);
    const solutionTopRef = useRef<HTMLElement>(null);

    // Add draggable offset
    offset.x += (gridOffsetPctX * (width ?? 0));
    offset.y += (gridOffsetPctY * (height ?? 0));

    const onResetLayout = () => {
        setGridOffsetPctX(0);
        setGridOffsetPctY(0);
        setTileSizeIndex(DEFAULT_TILE_SIZE_INDEX);
        setContainerWidth(DEFAULT_SOLUTION_CONTAINER_SIZE);
        setContainerHeight(DEFAULT_SOLUTION_CONTAINER_SIZE);
        setContainerOffsetPctX(0);
        setContainerOffsetPctY(0);
    };

    // Reset to default offset and zoom after we switch to a new level
    useEffect(() => {
        onResetLayout();
    }, [ props.levelNumber ]); // eslint-disable-line react-hooks/exhaustive-deps

    // Reset to default offset if the reset layout button was pressed
    useEffect(() => {
        if (props.shouldResetLayout) {
            onResetLayout();
        }
    }, [ props.shouldResetLayout ]);

    // Make sure the solution is not offscreen when the viewport is resized
    useEffect(() => {
        const offsetPctX = getBoundedContainerOffsetPctX(containerOffsetPctX, containerWidth,
            props.gridWidth);
        const offsetPctY = getBoundedContainerOffsetPctY(containerOffsetPctY, containerHeight,
                props.gridHeight);

        setContainerOffsetPctX(offsetPctX);
        setContainerOffsetPctY(offsetPctY);

        if (props.gridWidth && props.gridHeight) {
            const size = getProperContainerSize(containerWidth, containerHeight, offsetPctX,
                offsetPctY, props.gridWidth, props.gridHeight);

            setContainerWidth(size.width);
            setContainerHeight(size.height);
        }
    }, [ props.gridWidth, props.gridHeight ]); // eslint-disable-line react-hooks/exhaustive-deps

    // Grid dragging handlers
    const onGridPointerDown = (event: PointerEvent): void => {

        // Do not start dragging if we clicked on the adjustment menu
        if (isInElementById(event.target as HTMLElement, "solution-adjust-menu")) {
            return;
        }

        setIsGridPointerDown(true);
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
        ref.current && ref.current.setPointerCapture(event.pointerId);
    };

    const onGridPointerMove = (event: PointerEvent): void => {
        // Do not process unless the pointer is pressed down
        if (!isGridPointerDown) {
            return;
        }

        // Set the offset
        let nextOffsetPctX = gridOffsetPctX + ((event.clientX - lastPointerX) / (width || 1));
        nextOffsetPctX = getBoundValue(nextOffsetPctX, MAX_GRID_DRAG_X_PCT, MIN_GRID_DRAG_X_PCT);

        let nextOffsetPctY = gridOffsetPctY + ((event.clientY - lastPointerY) / (height || 1));
        nextOffsetPctY = getBoundValue(nextOffsetPctY, MAX_GRID_DRAG_Y_PCT, MIN_GRID_DRAG_Y_PCT);

        setGridOffsetPctX(nextOffsetPctX);
        setGridOffsetPctY(nextOffsetPctY);

        // Set last pointer coordinates
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
    };

    const onGridPointerUp = async (event: PointerEvent) => {
        setIsGridPointerDown(false);
        ref.current && ref.current.releasePointerCapture(event.pointerId);
    };

    // Solution container dragging handlers
    const onContainerPointerDown = (event: PointerEvent): void => {
        setIsContainerPointerDown(true);
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
        solutionTopRef.current && solutionTopRef.current.setPointerCapture(event.pointerId);
    };

    const onContainerPointerMove = (event: PointerEvent): void => {
        // Do not process unless the pointer is pressed down
        if (!isContainerPointerDown) {
            return;
        }

        // Set the offset

        // Reverse the x delta since we apply the offset to the right, not left
        let nextOffsetPctX = containerOffsetPctX -
            ((event.clientX - lastPointerX) / (props.gridWidth || 1));
        nextOffsetPctX = getBoundedContainerOffsetPctX(nextOffsetPctX, containerWidth,
            props.gridWidth);

        let nextOffsetPctY = containerOffsetPctY +
            ((event.clientY - lastPointerY) / (props.gridHeight || 1));
        nextOffsetPctY = getBoundedContainerOffsetPctY(nextOffsetPctY, containerHeight,
            props.gridHeight);

        setContainerOffsetPctX(nextOffsetPctX);
        setContainerOffsetPctY(nextOffsetPctY);

        // Set last pointer coordinates
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);
    };

    const onContainerPointerUp = async (event: PointerEvent) => {
        setIsContainerPointerDown(false);
        solutionTopRef.current && solutionTopRef.current.releasePointerCapture(event.pointerId);
    };

    const canAdjust =  !props.gameOver && !props.isMenuOpen;
    const canZoomIn = tileSizeIndex < TILES_SIZES.length - 1;
    const canZoomOut = tileSizeIndex > 0;

    const zoomIn = (): void => {
        if (canZoomIn && canAdjust) {
            setTileSizeIndex(tileSizeIndex + 1);
        }
    };

    const zoomOut = (): void => {
        if (canZoomOut && canAdjust) {
            setTileSizeIndex(tileSizeIndex - 1);
        }
    };

    const onResize = (event: SyntheticEvent, data: ResizeCallbackData) => {
        let newWidth = data.size.width;
        let newHeight = data.size.height;

        if (props.gridWidth && props.gridHeight) {
            const size = getProperContainerSize(newWidth, newHeight,
                containerOffsetPctX, containerOffsetPctY, props.gridWidth, props.gridHeight);

            newWidth = size.width;
            newHeight = size.height;
        }

        setContainerWidth(newWidth);
        setContainerHeight(newHeight);
    };

    // Solution grid props
    const solutionProps: Record<string, any> = {
        className: `solution ${isGridPointerDown ? "solution-dragging" : "" }`,
        ref,
        onPointerDown: onGridPointerDown,
        onPointerUp: onGridPointerUp,
        style: {
            height: `${containerHeight}px`,
            width: `${containerWidth}px`
        }
    };

    if (isGridPointerDown) {
        solutionProps.onPointerMove = onGridPointerMove;
    }

    // Solution top bar props
    const topBarProps: Record<string, any> = {
        className: `solution-target-text ${isContainerPointerDown ? "solution-dragging" : "" }`,
        ref: solutionTopRef,
        onPointerDown: onContainerPointerDown,
        onPointerUp: onContainerPointerUp
    };

    if (isContainerPointerDown) {
        topBarProps.onPointerMove = onContainerPointerMove;
    }

    // Container offset
    const containerStyle = {
        right: getContainerOffsetX(containerOffsetPctX, props.gridWidth),
        top: getContainerOffsetY(containerOffsetPctY, props.gridHeight)
    };

    // Solution grid
    const solutionTiles = props.grid.renderSolution();

    return (
        <GridOffsetContext.Provider value={offset}>
            <TileSizeContext.Provider value={tileSize}>
                <Resizable height={containerHeight} width={containerWidth} onResize={onResize}
                    minConstraints={[MIN_CONTAINER_SIZE, MIN_CONTAINER_SIZE]}
                    maxConstraints={[MAX_CONTAINER_SIZE, MAX_CONTAINER_SIZE]}
                    resizeHandles={["sw" ]}>
                    <div className="solution-container" style={containerStyle}>
                        <span {...topBarProps}>Target</span>
                        <div {...solutionProps}>
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
