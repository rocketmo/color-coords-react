import LEVELS from "./levels";
import type { LevelScore } from "./definitions";

// Creates a simple mapping between level ID and level score
// Assumes player has not completed any level
export function getDefaultLevelScoreMap() {
    // Create mapping
    const levelScoreMap: Record<string, LevelScore> = {};

    // Default mapping - no saved scores
    for (const levelConfig of LEVELS) {
        levelScoreMap[levelConfig.id] = {
            solved: false,
            moves: 0,
            stars: 0
        };
    }

    return levelScoreMap;
}

/**
 * Calculates the number of stars, given the number of moves taken and the star requirements
 * @param moves
 * @param starReq3
 * @param starReq2
 * @returns
 */
export function getStarsScoredByMoves(moves: number, starReq3: number, starReq2: number): number {
    let starsScored = 1;
    if (moves <= starReq3) {
        starsScored = 3;
    } else if (moves <= starReq2) {
        starsScored = 2;
    }

    return starsScored;
}
