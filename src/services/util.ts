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

export function isInElementById(node: (HTMLElement | null), id: string): boolean {
    while (node) {
        if (node?.id === id) {
            return true;
        }

        node = node.parentElement;
    }

    return false;
}
