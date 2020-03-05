import { useState } from 'react';

export type FetchAction<Data> = () => Promise<Data>;

export function useFetch<T = undefined>(action: FetchAction<T>): [FetchAction<T>, T | undefined, boolean];
export function useFetch<T>(action: FetchAction<T>, initialState: T): [FetchAction<T>, T, boolean];

export function useFetch<T>(action: FetchAction<T>, initialState?: T): [FetchAction<T>, T | undefined, boolean] {
  const [data, setData] = useState<T | undefined>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  function fetchData() {
    if (action && typeof action === 'function') {
      setLoading(true);
      return action().then((responseData: T) => {
        setData(responseData);
        return responseData;
      }).finally(() => {
        setLoading(false);
      });
    } else {
      return Promise.reject('can not call action as function');
    }
  }

  return [fetchData, data, loading];
}
