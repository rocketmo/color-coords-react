import { useEffect, useRef } from "react";
import type { MutableRefObject } from 'react';

/**
 * Credit: https://gist.github.com/btoo/65e7d4303f49299c785d38f8758525e6
 */
export function usePrevious<T> (value: T): MutableRefObject<T | undefined>['current'] {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [ value ]);

    return ref.current;
}
