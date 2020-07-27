import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { useEffect, useRef, useState } from 'react';
import { usePrevious } from './usePrevious';
export function useDebounceState(initialState, timeout, options) {
    const [state, setState] = useState(initialState);
    const debounceSetStateRef = useRef(null);
    const previousOptions = usePrevious(options);
    useEffect(() => {
        if (!isEqual(previousOptions, options)) {
            debounceSetStateRef.current = debounce((theState) => {
                setState(theState);
            }, timeout, options);
        }
    }, [timeout, previousOptions, options]);
    useEffect(() => {
        return () => {
            if (debounceSetStateRef.current) {
                debounceSetStateRef.current.cancel();
            }
        };
    }, []);
    return [state, debounceSetStateRef.current];
}
export default useDebounceState;
