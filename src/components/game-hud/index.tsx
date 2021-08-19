import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import Solution from "../solution";
import GameMenu from "../game-menu";
import "./game-hud.scss";

import type Grid from "../../classes/grid";

interface GameHUDProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    movesTaken: number,
    level: number
}

export default function GameHUD(props: GameHUDProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className="game-hud">
            <div className="top-bar">
                <div className="hamburger-btn">
                    <Hamburger toggled={isMenuOpen} toggle={setMenuOpen} rounded
                        size={24} label="Toggle menu" hideOutline={false}></Hamburger>
                </div>
                <div className="game-level">
                    <span className="top-bar-text">Level {props.level}</span>
                </div>
                <div className="moves-taken">
                    <span className="top-bar-text">Moves: {props.movesTaken}</span>
                </div>
                <div className="clearfix"></div>
            </div>
            <GameMenu isOpen={isMenuOpen} setOpen={setMenuOpen} />
            <Solution grid={props.grid} playerRow={props.playerRow} playerCol={props.playerCol} />
        </div>
    );
}
