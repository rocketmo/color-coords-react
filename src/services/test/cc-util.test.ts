import { getDefaultLevelScoreMap, getStarsScoredByMoves } from "../cc-util";

describe("CC Util", () => {
    describe("getDefaultLevelScoreMap", () => {
        test("all levels should be considered unsolved by default", async () => {
            const levelScoreMap = getDefaultLevelScoreMap();

            for (const lvlId in levelScoreMap) {
                expect(levelScoreMap[lvlId].solved).toBeFalsy();
                expect(levelScoreMap[lvlId].stars).toEqual(0);
                expect(levelScoreMap[lvlId].moves).toEqual(0);
            }
        });
    });

    describe("getStarsScoredByMoves", () => {
        test("should return 3 if moves is less than 3 star requirement", async () => {
            expect(getStarsScoredByMoves(10, 11, 12)).toEqual(3);
        });

        test("should return 3 if moves is equal to the 3 star requirement", async () => {
            expect(getStarsScoredByMoves(10, 10, 12)).toEqual(3);
        });

        test("should return 2 if moves is greater than the 3 star requirement but less than 2 star requirement",
            async () => {
            expect(getStarsScoredByMoves(11, 10, 12)).toEqual(2);
        });

        test("should return 2 if moves is equal to 2 star requirement",
            async () => {
            expect(getStarsScoredByMoves(12, 10, 12)).toEqual(2);
        });

        test("should return 1 if moves is greater than 2 star requirement",
            async () => {
            expect(getStarsScoredByMoves(13, 10, 12)).toEqual(1);
        });
    });
});
