import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faUndoAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import "./game-adjust-menu.scss";

import type { MouseEvent } from "react";

interface GameAdjustMenuProps {
    canUndo: boolean,
    canRedo: boolean,
    undoHandler: () => void,
    redoHandler: () => void,
    restartHandler: () => void
}

export default function GameAdjustMenu(props: GameAdjustMenuProps) {
    const onRestartClick = (event: MouseEvent) => {
        event.preventDefault();
        props.restartHandler();
    }

    const onUndoClick = (event: MouseEvent) => {
        event.preventDefault();
        props.undoHandler();
    }

    const onRedoClick = (event: MouseEvent) => {
        event.preventDefault();
        props.redoHandler();
    }

    let undoClass = "game-adjust-btn";
    undoClass += !props.canUndo ? " adjust-disabled" : "";

    let redoClass = "game-adjust-btn";
    redoClass += !props.canRedo ? " adjust-disabled" : "";

    return (
        <div className="game-adjust-menu">
            <div className="game-adjust-btn">
                <button tabIndex={0} onClick={onRestartClick} aria-label="Restart game">
                    <FontAwesomeIcon icon={faSync} />
                </button>
            </div>

            <div className="game-adjust-separator"></div>

            <div className={undoClass}>
                <button tabIndex={0} onClick={onUndoClick} aria-label="Undo">
                    <FontAwesomeIcon icon={faUndoAlt} />
                </button>
            </div>

            <div className={redoClass}>
                <button tabIndex={0} onClick={onRedoClick} aria-label="Redo">
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>
            </div>
        </div>
    );
}
