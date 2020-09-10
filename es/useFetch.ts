import { useCallback, useState } from 'react';

export type FetchAction<Data, Args extends any[] = any[]> = (...args: Args) => Promise<Data>;

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export default function useFetch<T extends FetchAction<any>, D = ThenArg<ReturnType<T>>>(action: T): [T, D | undefined, boolean];
export default function useFetch<T extends FetchAction<any>, D = ThenArg<ReturnType<T>>>(action: T, initialState: D): [T, D, boolean];

export default function useFetch<T extends FetchAction<any>, D = ThenArg<ReturnType<T>>>(action: T, initialState?: D): [T, D | undefined, boolean] {
  const [data, setData] = useState<D | undefined>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback((...args) => {
    if (action && typeof action === 'function') {
      setLoading(true);
      const result = action(...args);
      if (result !== undefined && result instanceof Promise) {
        return result.then((responseData: D) => {
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

  return [fetchData as T, data, loading];
}
