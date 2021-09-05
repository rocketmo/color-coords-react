import { useState, useEffect, useContext } from "react";
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';
import PlayerComponent from "../player";
import { GridOffsetContext, TileSizeContext } from "../../services/context";
import { sleep, getBoundValue, isInElementById } from "../../services/util";
import "./grid.scss";

import type Grid from "../../classes/grid";
import type { Color } from "../../services/constants";
import type { PointerEvent } from "react";

const TOP_MENU_HEIGHT = 48;
const SOLUTION_WIDTH_MIN = 200;
const SOLUTION_WIDTH_MAX = 300;
const SOLUTION_VW = 0.2;
const GRID_ID = "tile-grid";

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
    levelNumber: number,
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
    const tileSize = useContext(TileSizeContext);

    const { width, height, ref } = useResizeDetector({
        refreshMode: "throttle",
        refreshRate: 10
    });

    // Get grid offset, accounting for the top menu and solution window
    const offset = props.grid.getCenterOffset(tileSize, width ?? 0, height ?? 0);

    // Add draggable offset
    offset.x += (offsetPctX * (width ?? 0));
    offset.y += (offsetPctY * (height ?? 0));

    const setInitialOffset = () => {
        // Do not do anything if resize detector has not started
        if (!width || !height) {
            return;
        }

        let solutionWidth = ((width ?? 0) * SOLUTION_VW);
        solutionWidth = Math.max(SOLUTION_WIDTH_MIN, solutionWidth);
        solutionWidth = Math.min(SOLUTION_WIDTH_MAX, solutionWidth);

        setOffsetPctX((-solutionWidth) / (2 * width));
        setOffsetPctY(TOP_MENU_HEIGHT / (2 * height));
        setHasInitialOffset(true);
    };

    // Set default offset percentage after we have the width and height of the container
    useEffect(() => {

        // Do not do anything if we've already set the offset
        if (hasInitialOffset) {
            return;
        }

        setInitialOffset();
    }, [ width, height ]); // eslint-disable-line react-hooks/exhaustive-deps

    // Reset to default offset percentage after we switch to a new level
    useEffect(() => {
        setInitialOffset();
    }, [ props.levelNumber ]); // eslint-disable-line react-hooks/exhaustive-deps

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
            nextOffsetPctX = getBoundValue(nextOffsetPctX, MAX_DRAG_X_PCT, MIN_DRAG_X_PCT);

            let nextOffsetPctY = offsetPctY + ((event.clientY - lastPointerY) / (height || 1));
            nextOffsetPctY = getBoundValue(nextOffsetPctY, MAX_DRAG_Y_PCT, MIN_DRAG_Y_PCT);

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

    const onPointerLeave = (event: PointerEvent): void => {
        if (isInElementById(event.target as HTMLElement, GRID_ID) &&
            (!event.relatedTarget || !isInElementById(event.relatedTarget as HTMLElement, GRID_ID))
        ) {
            onPointerUp();
        }
    };

    const gridContainerProps: Record<string, any> = {
        id: GRID_ID,
        className: `${GRID_ID} ${isDragging ? "grid-dragging" : ""}`,
        ref,
        onPointerDown,
        onPointerUp,
        onPointerLeave
    };

    if (isPointerDown) {
        gridContainerProps.onPointerMove = onPointerMove;
    }

    return (
        <GridOffsetContext.Provider value={offset}>
            <div {...gridContainerProps}>

                { gridElements }
                <PlayerComponent color={props.playerColor} row={props.playerRow}
                    col={props.playerCol} movementToggle={props.isPlayerMoving}
                    onAnimationEnd={props.onPlayerAnimationEnd} />
            </div>
        </GridOffsetContext.Provider>
    );
}
