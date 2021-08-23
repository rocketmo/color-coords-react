import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faThLarge, faQuestionCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import { mainButtonPressHandler } from "../../services/util";
import "./game-menu.scss";
import React from "react";

import type { PointerEvent } from "react";

interface GameMenuProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    restartHandler: () => void
}

export default function GameMenu(props: GameMenuProps) {
    const openClass = props.isOpen ? "game-menu-open" : "game-menu-closed";
    const overlayClass = `game-menu-overlay ${openClass}`;
    const navClass = `game-menu-nav ${openClass}`;
    const tabIndex = props.isOpen ? 0 : -1;

    const closeOverlay = (event: PointerEvent) => {
        event.preventDefault();
        props.setOpen(false);
    };

    const restart = (event: PointerEvent) => {
        event.preventDefault();
        props.restartHandler();
        props.setOpen(false);
    }

    const onOverlayPress = mainButtonPressHandler.bind(null, closeOverlay);
    const onRestartPress = mainButtonPressHandler.bind(null, restart);

    return (
        <div className="game-menu">
            <div className={overlayClass} onPointerUp={onOverlayPress}></div>
            <nav className={navClass}>
                <Link to="/level-select" className="game-menu-btn" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faThLarge} />
                    <span>Level Select</span>
                </Link>
                <button className="game-menu-btn" tabIndex={tabIndex}
                    onPointerUp={onRestartPress}>
                    <FontAwesomeIcon icon={faSync} />
                    <span>Restart</span>
                </button>
                <button className="game-menu-btn" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <span>How to Play</span>
                </button>
                <button className="game-menu-btn" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                </button>
            </nav>
        </div>
    );
}
