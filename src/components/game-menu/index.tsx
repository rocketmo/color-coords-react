import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faThLarge,
    faQuestionCircle,
    faCog,
    faSync,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import "./game-menu.scss";

interface GameMenuProps {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void,
    showSettings: () => void,
    showInstructions: () => void,
    resetLayout: () => void,
    startTutorial?: () => void
}

export default function GameMenu(props: GameMenuProps) {
    const openClass = props.isOpen ? "game-menu-open" : "game-menu-closed";
    const overlayClass = `game-menu-overlay ${openClass}`;
    const navClass = `game-menu-nav ${openClass}`;
    const tabIndex = props.isOpen ? 0 : -1;

    const onResetLayoutClick = () => {
        props.resetLayout();
        props.setOpen(false);
    };

    const onViewTutorial = () => {
        if (!props.startTutorial) {
            return;
        }

        props.startTutorial();
        props.setOpen(false);
    };

    // TODO: Add settings button back in once there are more in-game settings
    const settingsBtn = (
        <button className="game-menu-btn" tabIndex={tabIndex}
            onClick={props.showSettings}>
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
        </button>
    );

    const tutorialBtn = props.startTutorial ? (
        <button className="game-menu-btn" tabIndex={tabIndex} onClick={onViewTutorial}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>View Tutorial</span>
        </button>
    ): null;

    return (
        <div className="game-menu">
            <div className={overlayClass} onClick={props.setOpen.bind(null, false)}></div>
            <nav className={navClass}>
                <Link to="/level-select" tabIndex={tabIndex}
                    className="game-menu-btn game-menu-first">
                    <FontAwesomeIcon icon={faThLarge} />
                    <span>Level Select</span>
                </Link>
                <button className="game-menu-btn" tabIndex={tabIndex}
                    onClick={props.showInstructions}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                    <span>How to Play</span>
                </button>
                {tutorialBtn}
                <button className="game-menu-btn game-menu-last" tabIndex={tabIndex}
                    onClick={onResetLayoutClick}>
                    <FontAwesomeIcon icon={faSync} />
                    <span>Reset Layout</span>
                </button>
            </nav>
        </div>
    );
}
