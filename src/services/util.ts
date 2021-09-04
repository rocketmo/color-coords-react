/**
 * Returns promise that resolves after ms milliseconds
 */
export function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export function getBoundValue(val: number, upperBound: number, lowerBound: number) {
    return Math.min(Math.max(lowerBound, val), upperBound);

}
