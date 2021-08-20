import type { PointerEvent, PointerEventHandler } from "react";

/**
 * Returns promise that resolves after ms milliseconds
 */
export function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/**
 * Handles a Pointer Event only if the event was triggered from a non-mouse device, or if the
 * primary button was pressed.
 * @param eventHandler
 * @param event
 * @returns
 */
export function mainButtonPressHandler(eventHandler: PointerEventHandler, event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) {
        return;
    }

    return eventHandler(event);
}
