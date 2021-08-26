import { Redirect, useParams } from "react-router";
import Game from "../game";
import LEVELS from "../../services/levels";

interface GameParams {
    levelNumber: string
};

interface GameRedirectProps {
    handleStarUpdate: (levelNumber: number, movesTaken: number) => number
};

export default function GameRedirect(props: GameRedirectProps) {
    const { levelNumber } = useParams<GameParams>();
    const levelInt = parseInt(levelNumber);

    if (isNaN(levelInt) || !LEVELS[levelInt - 1]) {
        return <Redirect to="/" />
    }

    const { gridConfig, playerRow, playerCol, levelName } = LEVELS[levelInt - 1];

    return (
        <Game gridConfig={gridConfig} playerRow={playerRow} playerCol={playerCol}
            levelName={levelName} levelNumber={levelInt} 
            handleStarUpdate={props.handleStarUpdate} />
    );
}
