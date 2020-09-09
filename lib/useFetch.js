import { useCallback, useState } from 'react';
export default function useFetch(action, initialState) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(
    (...args) => {
      if (action && typeof action === 'function') {
        setLoading(true);
        // @ts-ignore
        const result = action.call(this, ...args);
        if (result !== undefined && result instanceof Promise) {
          return result
            .then(responseData => {
              setData(responseData);
              return responseData;
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          return Promise.reject('action function return is not Promise');
        }
      } else {
        return Promise.reject('can not call action as function');
      }
    },
    [action]
  );
  return [fetchData, data, loading];
}
