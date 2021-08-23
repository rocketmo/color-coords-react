import { useState } from "react";
import Solution from "../solution";
import GameMenu from "../game-menu";
import GameTopBar from "../game-top-bar";
import "./game-hud.scss";

import type Grid from "../../classes/grid";

interface GameHUDProps {
    grid: Grid,
    playerRow: number,
    playerCol: number,
    movesTaken: number,
    levelNumber: number,
    levelName: string,
    restartHandler: () => void
}

export default function GameHUD(props: GameHUDProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className="game-hud">
            <GameTopBar isMenuOpen={isMenuOpen}
                setMenuOpen={setMenuOpen}
                levelNumber={props.levelNumber}
                levelName={props.levelName}
                movesTaken={props.movesTaken} />
            <GameMenu
                isOpen={isMenuOpen}
                setOpen={setMenuOpen}
                restartHandler={props.restartHandler} />
            <Solution
                grid={props.grid}
                playerRow={props.playerRow}
                playerCol={props.playerCol} />
        </div>
    );
}
