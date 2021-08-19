import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faThLarge, faQuestionCircle, faCog } from '@fortawesome/free-solid-svg-icons';
import "./game-menu.css";
import React from "react";

interface GameMenuProps {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GameMenu(props: GameMenuProps) {
    const openClass = props.isOpen ? "game-menu-open" : "game-menu-closed";
    const overlayClass = `game-menu-overlay ${openClass}`;
    const navClass = `game-menu-nav ${openClass}`;
    const tabIndex = props.isOpen ? 0 : -1;
    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <div className="game-menu">
            <div className={overlayClass} onPointerUp={handleClose}></div>
            <nav className={navClass}>
                <a className="level-select-btn" href="#!" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faThLarge} />
                    <span>Level Select</span>
                </a>
                <a className="restart-btn" href="#!" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faSync} />
                    <span>Restart</span>
                </a>
                <a className="how-to-btn" href="#!" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <span>How to Play</span>
                </a>
                <a className="settings-btn" href="#!" tabIndex={tabIndex}>
                    <FontAwesomeIcon icon={faCog} />
                    <span>Settings</span>
                </a>
            </nav>
        </div>
    );
}
