import { Redirect, useParams } from "react-router";
import Game from "../game";
import LEVELS from "../../services/levels";

import type { LevelScore } from "../../services/definitions";

interface GameParams {
    levelNumber: string
};

interface GameRedirectProps {
    starCount: number,
    levelScoreMap: Record<string, LevelScore>,
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

    const {
        id,
        gridConfig,
        playerRow,
        playerCol,
        levelName,
        levelInstructions
    } = LEVELS[levelInt - 1];

    return (
        <Game gridConfig={gridConfig} playerRow={playerRow} playerCol={playerCol}
            levelName={levelName} levelNumber={levelInt}
            handleStarUpdate={props.handleStarUpdate}
            starsScoredOnLevel={props.starsScoredOnLevel}
            starsToUnlockLevel={props.starsToUnlockLevel}
            appHeight={props.appHeight}
            levelInstructions={levelInstructions}
            completedBefore={!!props.levelScoreMap[id] && props.levelScoreMap[id].solved} />
    );
}
