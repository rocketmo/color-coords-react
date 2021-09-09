import { Redirect, useParams } from "react-router";
import Game from "../game";
import LEVELS from "../../services/levels";

interface GameParams {
    levelNumber: string
};

interface GameRedirectProps {
    starCount: number,
    handleStarUpdate: (levelNumber: number, movesTaken: number) => number,
    starsScoredOnLevel: (levelNum: number) => number,
    starsToUnlockLevel: (levelNum: number) => number,
    appHeight?: number
};

export default function GameRedirect(props: GameRedirectProps) {
    const { levelNumber } = useParams<GameParams>();
    const levelInt = parseInt(levelNumber);

    if (isNaN(levelInt) || !LEVELS[levelInt - 1] ||
        props.starCount < LEVELS[levelInt - 1].requiredToUnlock) {
        return <Redirect to="/level-select" />
    }

    const { gridConfig, playerRow, playerCol, levelName } = LEVELS[levelInt - 1];

    return (
        <Game gridConfig={gridConfig} playerRow={playerRow} playerCol={playerCol}
            levelName={levelName} levelNumber={levelInt}
            handleStarUpdate={props.handleStarUpdate}
            starsScoredOnLevel={props.starsScoredOnLevel}
            starsToUnlockLevel={props.starsToUnlockLevel}
            appHeight={props.appHeight} />
    );
}
