import { openDB } from "idb";
import { getStarsScoredByMoves, getDefaultLevelScoreMap } from "./cc-util";
import LEVELS from "./levels";

import type { IDBPDatabase } from "idb";
import type { LevelScore } from "./definitions";
import type { GameConfig } from "./levels";

const DB_NAME = "cc";
const SCORES_STORE_NAME = "scores";

function upgrade(db: IDBPDatabase) {
    db.createObjectStore(SCORES_STORE_NAME, { keyPath: "id" });
}

export async function loadLevelScores(): Promise<Record<string, LevelScore>> {
    const db = await openDB(DB_NAME, 1, { upgrade });
    const transaction = db.transaction(SCORES_STORE_NAME, "readonly");
    const scoresStore = transaction.objectStore(SCORES_STORE_NAME);

    const scores = await scoresStore.getAll();
    await transaction.done;

    db.close();

    // Create mapping
    const levelScoreMap: Record<string, LevelScore> = getDefaultLevelScoreMap();
    const levelById: Record<string, GameConfig> = {};

    for (const levelConfig of LEVELS) {
        levelById[levelConfig.id] = levelConfig;
    }

    // Update mapping with scores saved in DB
    for (const score of scores) {
        if (!isNaN(score?.moves) && levelScoreMap[score?.id]) {
            levelScoreMap[score.id].solved = true;
            levelScoreMap[score.id].moves = parseInt(score.moves, 10);
            levelScoreMap[score.id].stars = getStarsScoredByMoves(levelScoreMap[score.id].moves,
                levelById[score.id].starRequirement3, levelById[score.id].starRequirement2);
        }
    }

    return levelScoreMap;
}

export async function saveScore(levelId: string, moves: number): Promise<void> {
    const db = await openDB(DB_NAME, 1, { upgrade });
    const transaction = db.transaction(SCORES_STORE_NAME, "readwrite");
    const scoresStore = transaction.objectStore(SCORES_STORE_NAME);

    // Update score if fewer moves were used
    const prevScore = await scoresStore.get(levelId);
    if (!prevScore || isNaN(prevScore?.moves) || moves < prevScore.moves) {
        await scoresStore.put({ id: levelId, moves });
    }

    await transaction.done;

    db.close();
}
