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

    const undoClass = `game-adjust-btn ${!props.canUndo ? " adjust-disabled" : ""}`;
    const redoClass = `game-adjust-btn ${!props.canRedo ? " adjust-disabled" : ""}`;

    return (
        <div className="game-adjust-menu">
            <div className="game-adjust-btn">
                <button tabIndex={0} onClick={onRestartClick} aria-label="Restart game">
                    <FontAwesomeIcon icon={faSync} />
                </button>

                <div className="game-adjust-tooltip">Restart</div>
            </div>

            <div className="game-adjust-separator"></div>

            <div className={undoClass}>
                <button tabIndex={0} onClick={onUndoClick} aria-label="Undo">
                    <FontAwesomeIcon icon={faUndoAlt} />
                </button>

                <div className="game-adjust-tooltip">Undo</div>
            </div>

            <div className={redoClass}>
                <button tabIndex={0} onClick={onRedoClick} aria-label="Redo">
                    <FontAwesomeIcon icon={faRedoAlt} />
                </button>

                <div className="game-adjust-tooltip">Redo</div>
            </div>
        </div>
    );
}
