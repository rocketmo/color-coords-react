import { Turn as Hamburger } from "hamburger-react";
import "./game-top-bar.scss";

interface GameTopBarProps {
    isMenuOpen: boolean,
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    levelNumber: number,
    levelName: string,
    movesTaken: number
}

export default function GameTopBar(props: GameTopBarProps) {
    return (
        <header className="top-bar game-top-bar">
            <div className="hamburger-btn">
                <Hamburger toggled={props.isMenuOpen} toggle={props.setMenuOpen} rounded
                    size={24} label="Toggle menu" hideOutline={false}></Hamburger>
            </div>
            <div className="game-level">
                <span className="top-bar-text">{props.levelNumber}. {props.levelName}</span>
            </div>
            <div className="moves-taken">
                <span className="top-bar-text">Moves: {props.movesTaken}</span>
            </div>
            <div className="clearfix"></div>
        </header>
    );
}
