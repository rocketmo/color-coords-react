import { getBoundValue, isInElementById } from "../util";

describe("Util", () => {
    describe("getBoundValue", () => {
        test("should return upper bound if given number is greater than upper bound", async () => {
            expect(getBoundValue(10, 5, 0)).toEqual(5);
        });

        test("should return lower bound if given number is less than lower bound", async () => {
            expect(getBoundValue(-5, 5, 0)).toEqual(0);
        });

        test("should return given number if it is between the upper and lower bounds", async () => {
            expect(getBoundValue(2, 5, 0)).toEqual(2);
            expect(getBoundValue(5, 5, 0)).toEqual(5);
            expect(getBoundValue(0, 5, 0)).toEqual(0);
        });
    });

    describe("isInElementById", () => {
        test("should return true if given html element has a parent with the given id",
            async () => {
            const child = document.createElement("p");
            const parent = document.createElement("div");
            parent.id = "parent";
            parent.appendChild(child);

            expect(isInElementById(child, "parent")).toBeTruthy();
        });

        test("should return true if given html element has a grandparent with the given id",
            async () => {
            const child = document.createElement("p");
            const parent = document.createElement("div");
            parent.appendChild(child);

            const grandparent = document.createElement("div");
            grandparent.appendChild(parent);
            grandparent.id = "grandparent";

            expect(isInElementById(child, "grandparent")).toBeTruthy();
        });

        test("should return false if given html element has no parent", async () => {
            const child = document.createElement("p");
            expect(isInElementById(child, "parent")).toBeFalsy();
        });

        test("should return false if given html element has no ancestor with the given id",
            async () => {
            const child = document.createElement("p");
            const parent = document.createElement("div");
            parent.appendChild(child);
            parent.id = "parent";

            const grandparent = document.createElement("div");
            grandparent.appendChild(parent);
            grandparent.id = "grandparent";

            expect(isInElementById(child, "grandpappy")).toBeFalsy();
        });
    });
});
