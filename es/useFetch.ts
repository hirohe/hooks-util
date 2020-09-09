import { useCallback, useState } from 'react';

export type FetchAction<Data> = (...args: any[]) => Promise<Data>;

export default function useFetch<Action extends FetchAction<T>, T = undefined>(action: Action): [Action, T | undefined, boolean];
export default function useFetch<T, Action extends FetchAction<T>>(action: Action, initialState: T): [Action, T, boolean];

export default function useFetch<T, Action extends FetchAction<T>>(action: Action, initialState?: T): [Action, T | undefined, boolean] {
  const [data, setData] = useState<T | undefined>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback((...args) => {
    if (action && typeof action === 'function') {
      setLoading(true);
      // @ts-ignore
      const result = action.call(this, ...args);
      if (result !== undefined && result instanceof Promise) {
        return result.then((responseData: T) => {
          setData(responseData);
          return responseData;
        }).finally(() => {
          setLoading(false);
        });
      } else {
        return Promise.reject('action function return is not Promise');
      }
    } else {
      return Promise.reject('can not call action as function');
    }
  }, [action]);

  return [fetchData as Action, data, loading];
}
