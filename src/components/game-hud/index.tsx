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
    isMenuOpen: boolean,
    restartHandler: () => void,
    setMenuOpen: (isOpen: boolean) => void
}

export default function GameHUD(props: GameHUDProps) {
    return (
        <div className="game-hud">
            <GameTopBar isMenuOpen={props.isMenuOpen}
                setMenuOpen={props.setMenuOpen}
                levelNumber={props.levelNumber}
                levelName={props.levelName}
                movesTaken={props.movesTaken} />
            <GameMenu
                isOpen={props.isMenuOpen}
                setOpen={props.setMenuOpen}
                restartHandler={props.restartHandler} />
            <Solution
                grid={props.grid}
                playerRow={props.playerRow}
                playerCol={props.playerCol} />
        </div>
    );
}
