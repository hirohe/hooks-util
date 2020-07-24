import { useCallback, useState } from 'react';

export type FetchAction<Data> = () => Promise<Data>;

export default function useFetch<T = undefined>(action: FetchAction<T>): [FetchAction<T>, T | undefined, boolean];
export default function useFetch<T>(action: FetchAction<T>, initialState: T): [FetchAction<T>, T, boolean];

export default function useFetch<T>(action: FetchAction<T>, initialState?: T): [FetchAction<T>, T | undefined, boolean] {
  const [data, setData] = useState<T | undefined>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(function() {
    if (action && typeof action === 'function') {
      setLoading(true);
      const result = action();
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

  return [fetchData, data, loading];
}
