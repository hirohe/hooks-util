import { useState } from 'react';

export function useFetch(action, initialState) {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  function fetchData() {
    if (action && typeof action === 'function') {
      setLoading(true);
      return action()
        .then(responseData => {
          setData(responseData);
          return responseData;
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      return Promise.reject('can not call action as function');
    }
  }
  return [fetchData, data, loading];
}
