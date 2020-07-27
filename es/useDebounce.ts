import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { useEffect, useRef, useState } from 'react';
import usePrevious from './usePrevious';

// from lodash/debounce
interface DebounceSettings {
  /**
   * Specify invoking on the leading edge of the timeout.
   */
  leading?: boolean;

  /**
   * The maximum time func is allowed to be delayed before it’s invoked.
   */
  maxWait?: number;

  /**
   * Specify invoking on the trailing edge of the timeout.
   */
  trailing?: boolean;
}

// from lodash/debounce
interface Cancelable {
  cancel(): void;
  flush(): void;
}

export function useDebounceState<S>(initialState: S, timeout: number, options?: DebounceSettings) {
  const [state, setState] = useState<S>(initialState);

  const debounceSetStateRef = useRef<(((state: S) => void) & Cancelable) | null>(null);
  const previousOptions = usePrevious<DebounceSettings | undefined>(options);

  useEffect(() => {
    if (!isEqual(previousOptions, options)) {
      debounceSetStateRef.current = debounce((theState: S) => {
        setState(theState);
      }, timeout, options);
    }
  }, [timeout, previousOptions, options]);

  useEffect(() => {
    return () => {
      if (debounceSetStateRef.current) {
        debounceSetStateRef.current.cancel();
      }
    }
  }, []);

  return [state, debounceSetStateRef.current];
}

export default useDebounceState;
