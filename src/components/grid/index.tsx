import { useState, useEffect } from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import PlayerComponent from "../player";
import { GridOffsetContext } from "../../services/context";
import { TILE_SIZE } from "../../services/constants";
import { sleep } from "../../services/util";
import "./grid.scss";

import type Grid from "../../classes/grid";
import type { Color } from "../../services/constants";
import type { PointerEvent } from "react";

const TOP_MENU_HEIGHT = 48;
const SOLUTION_WIDTH_MIN = 200;
const SOLUTION_WIDTH_MAX = 300;
const SOLUTION_VW = 0.2;

const DRAG_THRESHOLD = 100;
const MIN_DRAG_X_PCT = -0.5;
const MAX_DRAG_X_PCT = 0.5;
const MIN_DRAG_Y_PCT = -0.5;
const MAX_DRAG_Y_PCT = 0.5;

interface GridProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    playerColor: Color,
    showSolution: boolean,
    isPlayerMoving: boolean,
    onPlayerAnimationEnd: () => void,
    onTilePress: (row: number, col: number) => void,
    dragHandler: (bool: boolean) => void
}

export default function GridComponent(props: GridProps) {
    const [ isPointerDown, setIsPointerDown ] = useState(false);
    const [ isDragging, setIsDragging ] = useState(false);
    const [ distanceDragged, setDistanceDragged ] = useState(0);
    const [ lastPointerX, setLastPointerX] = useState(0);
    const [ lastPointerY, setLastPointerY] = useState(0);
    const [ offsetPctX, setOffsetPctX ] = useState(0);
    const [ offsetPctY, setOffsetPctY ] = useState(0);
    const [ hasInitialOffset, setHasInitialOffset ] = useState(false);

    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    // Get grid offset, accounting for the top menu and solution window
    const offset = props.grid.getCenterOffset(TILE_SIZE, width ?? 0, height ?? 0);

    // Add draggable offset
    offset.x += (offsetPctX * (width ?? 0));
    offset.y += (offsetPctY * (height ?? 0));

    // Set default offset percentage
    useEffect(() => {

        // Do not do anything if resize detector has not started or if we've already set the offset
        if (!width || !height || hasInitialOffset) {
            return;
        }

        let solutionWidth = ((width ?? 0) * SOLUTION_VW);
        solutionWidth = Math.max(SOLUTION_WIDTH_MIN, solutionWidth);
        solutionWidth = Math.min(SOLUTION_WIDTH_MAX, solutionWidth);

        setOffsetPctX((-solutionWidth) / (2 * width));
        setOffsetPctY(TOP_MENU_HEIGHT / (2 * height));
        setHasInitialOffset(true);
    }, [ width, height ]); // eslint-disable-line react-hooks/exhaustive-deps

    const gridElements = props.isPlayerMoving ? props.grid.renderElements(props.showSolution) :
        props.grid.renderElements(
            props.showSolution,
            props.playerRow,
            props.playerCol,
            props.onTilePress
        );

    const onPointerDown = (event: PointerEvent): void => {
        setIsPointerDown(true);
        setDistanceDragged(0);
        setIsDragging(false);
        setLastPointerX(event.clientX);
        setLastPointerY(event.clientY);

        props.dragHandler(true);
    };

    const onPointerMove = (event: PointerEvent): void => {

        // Do not process unless the pointer is pressed down
        if (!isPointerDown) {
            return;
        }

        const distX = Math.abs(event.clientX - lastPointerX);
        const distY = Math.abs(event.clientY - lastPointerY);
        const totalDist = distanceDragged + (distX ** 2) + (distY ** 2);

        setDistanceDragged(totalDist);

        // Process drag if enough distance has been moved
        if (isDragging || totalDist >= DRAG_THRESHOLD) {
            setIsDragging(true);

            // Set the offset
            let nextOffsetPctX = offsetPctX + ((event.clientX - lastPointerX) / (width || 1));
            nextOffsetPctX = Math.min(Math.max(MIN_DRAG_X_PCT, nextOffsetPctX), MAX_DRAG_X_PCT);

            let nextOffsetPctY = offsetPctY + ((event.clientY - lastPointerY) / (height || 1));
            nextOffsetPctY = Math.min(Math.max(MIN_DRAG_Y_PCT, nextOffsetPctY), MAX_DRAG_Y_PCT);

            setOffsetPctX(nextOffsetPctX);
            setOffsetPctY(nextOffsetPctY);

            // Set last pointer coordinates
            setLastPointerX(event.clientX);
            setLastPointerY(event.clientY);
        }
    };

    const onPointerUp = async () => {
        const wasDragging = isDragging;

        setIsPointerDown(false);
        setDistanceDragged(0);
        setIsDragging(false);

        // Release the drag on the following cycle
        if (wasDragging) {
            await sleep(0);
        }

        props.dragHandler(false);
    };

    const isInGrid = (node: (HTMLElement | null)): boolean => {
        while (node) {
            if (node?.id === "tile-grid") {
                return true;
            }

            node = node.parentElement;
        }

        return false;
    }

    const onPointerLeave = (event: PointerEvent): void => {
        if (isInGrid(event.target as HTMLElement) &&
            (!event.relatedTarget || !isInGrid(event.relatedTarget as HTMLElement))) {
            onPointerUp();
        }
    };

    const gridClass = `tile-grid ${isDragging ? "grid-dragging" : ""}`

    return (
        <GridOffsetContext.Provider value={offset}>
            <div id="tile-grid" className={gridClass} ref={ref}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerLeave}>

                { gridElements }
                <PlayerComponent color={props.playerColor} row={props.playerRow}
                    col={props.playerCol} movementToggle={props.isPlayerMoving}
                    onAnimationEnd={props.onPlayerAnimationEnd} />
            </div>
        </GridOffsetContext.Provider>
    );
}
