import GameMenu from "../game-menu";
import GameTopBar from "../game-top-bar";
import "./game-hud.scss";

interface GameHUDProps {
    movesTaken: number,
    levelNumber: number,
    levelName: string,
    isMenuOpen: boolean,
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
                setOpen={props.setMenuOpen} />
        </div>
    );
}
