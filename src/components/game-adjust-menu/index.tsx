import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSync,
    faUndoAlt,
    faRedoAlt,
    faSearchPlus,
    faSearchMinus
} from '@fortawesome/free-solid-svg-icons';
import "./game-adjust-menu.scss";

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

export default function GameAdjustMenu(props: GameAdjustMenuProps) {
    const undoClass = `adjust-btn ${!props.canUndo ? " adjust-disabled" : ""}`;
    const redoClass = `adjust-btn ${!props.canRedo ? " adjust-disabled" : ""}`;
    const zoomInClass = `adjust-btn ${!props.canZoomIn ? " adjust-disabled" : ""}`;
    const zoomOutClass = `adjust-btn ${!props.canZoomOut ? " adjust-disabled" : ""}`;

    return (
        <div className="adjust-menu game-adjust-menu">
            <div className="adjust-btn">
                <button tabIndex={0} onClick={props.restartHandler} aria-label="Restart game">
                    <FontAwesomeIcon icon={faSync} />
                </button>

                <div className="adjust-tooltip">Restart</div>
            </div>

            <div className="adjust-separator"></div>

            <div className={undoClass}>
                <button tabIndex={0} onClick={props.undoHandler} aria-label="Undo">
                    <FontAwesomeIcon icon={faUndoAlt} />
                </button>

                <div className="adjust-tooltip">Undo</div>
            </div>

            <div className={redoClass}>
                <button tabIndex={0} onClick={props.redoHandler} aria-label="Redo">
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>

                <div className="adjust-tooltip">Redo</div>
            </div>

            <div className="adjust-separator"></div>

            <div className={zoomInClass}>
                <button tabIndex={0} onClick={props.zoomInHandler} aria-label="Zoom in">
                    <FontAwesomeIcon icon={faSearchPlus} />
                </button>

                <div className="adjust-tooltip">Zoom In</div>
            </div>

            <div className={zoomOutClass}>
                <button tabIndex={0} onClick={props.zoomOutHandler} aria-label="Zoom out">
                    <FontAwesomeIcon icon={faSearchMinus} />
                </button>

                <div className="adjust-tooltip">Zoom Out</div>
            </div>
        </div>
    );
}
