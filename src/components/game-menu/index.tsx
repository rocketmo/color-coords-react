import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faThLarge, faQuestionCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import "./game-menu.scss";
import React from "react";

import type { MouseEvent } from "react";

interface GameMenuProps {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void,
    restartHandler: () => void
}

export default function GameMenu(props: GameMenuProps) {
    const openClass = props.isOpen ? "game-menu-open" : "game-menu-closed";
    const overlayClass = `game-menu-overlay ${openClass}`;
    const navClass = `game-menu-nav ${openClass}`;
    const tabIndex = props.isOpen ? 0 : -1;

    const onOverlayClick = (event: MouseEvent) => {
        event.preventDefault();
        props.setOpen(false);
    };

    const onRestartClick = (event: MouseEvent) => {
        event.preventDefault();
        props.restartHandler();
        props.setOpen(false);
    }

    return (
        <div className="game-menu">
            <div className={overlayClass} onClick={onOverlayClick}></div>
            <nav className={navClass}>
                <Link to="/level-select" tabIndex={tabIndex}
                    className="game-menu-btn game-menu-first">
                    <FontAwesomeIcon icon={faThLarge} />
                    <span>Level Select</span>
                </Link>
                <button className="game-menu-btn" tabIndex={tabIndex}
                    onClick={onRestartClick}>
                    <FontAwesomeIcon icon={faSync} />
                    <span>Restart</span>
                </button>
                <button className="game-menu-btn" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <span>How to Play</span>
                </button>
                <button className="game-menu-btn game-menu-last" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                </button>
            </nav>
        </div>
    );
}
