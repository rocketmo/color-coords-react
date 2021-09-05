import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./game-adjust-menu.scss";
import {
    faSync,
    faUndoAlt,
    faRedoAlt,
    faSearchPlus,
    faSearchMinus
} from '@fortawesome/free-solid-svg-icons';

import type { MouseEvent } from "react";

interface GameAdjustMenuProps {
    canUndo: boolean,
    canRedo: boolean,
    canZoomIn: boolean,
    canZoomOut: boolean,
    undoHandler: () => void,
    redoHandler: () => void,
    restartHandler: () => void,
    zoomInHandler: () => void,
    zoomOutHandler: () => void
}

function preventDefaultAndHandle(fn: () => void, event: MouseEvent) {
    event.preventDefault();
    fn();
}

export default function GameAdjustMenu(props: GameAdjustMenuProps) {
    const onRestartClick = preventDefaultAndHandle.bind(null, props.restartHandler);
    const onUndoClick = preventDefaultAndHandle.bind(null, props.undoHandler);
    const onRedoClick = preventDefaultAndHandle.bind(null, props.redoHandler);
    const onZoomInClick = preventDefaultAndHandle.bind(null, props.zoomInHandler);
    const onZoomOutClick = preventDefaultAndHandle.bind(null, props.zoomOutHandler);

    const undoClass = `adjust-btn ${!props.canUndo ? " adjust-disabled" : ""}`;
    const redoClass = `adjust-btn ${!props.canRedo ? " adjust-disabled" : ""}`;
    const zoomInClass = `adjust-btn ${!props.canZoomIn ? " adjust-disabled" : ""}`;
    const zoomOutClass = `adjust-btn ${!props.canZoomOut ? " adjust-disabled" : ""}`;

    return (
        <div className="adjust-menu game-adjust-menu">
            <div className="adjust-btn">
                <button tabIndex={0} onClick={onRestartClick} aria-label="Restart game">
                    <FontAwesomeIcon icon={faSync} />
                </button>

                <div className="adjust-tooltip">Restart</div>
            </div>

            <div className="adjust-separator"></div>

            <div className={undoClass}>
                <button tabIndex={0} onClick={onUndoClick} aria-label="Undo">
                    <FontAwesomeIcon icon={faUndoAlt} />
                </button>

                <div className="adjust-tooltip">Undo</div>
            </div>

            <div className={redoClass}>
                <button tabIndex={0} onClick={onRedoClick} aria-label="Redo">
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>

                <div className="adjust-tooltip">Redo</div>
            </div>

            <div className="adjust-separator"></div>

            <div className={zoomInClass}>
                <button tabIndex={0} onClick={onZoomInClick} aria-label="Zoom in">
                    <FontAwesomeIcon icon={faSearchPlus} />
                </button>

                <div className="adjust-tooltip">Zoom In</div>
            </div>

            <div className={zoomOutClass}>
                <button tabIndex={0} onClick={onZoomOutClick} aria-label="Zoom out">
                    <FontAwesomeIcon icon={faSearchMinus} />
                </button>

                <div className="adjust-tooltip">Zoom Out</div>
            </div>
        </div>
    );
}
