import renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import useFetch from '../es/useFetch';

describe('useFetch tests', () => {
  function fetchSuccess() {
    return Promise.resolve('test');
  }

  function fetchFailed() {
    return Promise.reject('fake error');
  }

  it('useFetch with success action', async () => {
    const {
      result,
      waitForNextUpdate
    } = renderHook(() => useFetch(fetchSuccess));
    let [loadData, data, loadingRepo] = result.current;
    expect(loadingRepo).toBe(false);
    expect(data).toBe(undefined);

    renderer.act(() => {
      loadData();
    });

    [loadData, data, loadingRepo] = result.current;
    expect(loadingRepo).toBe(true);

    await waitForNextUpdate();
    [loadData, data, loadingRepo] = result.current;
    expect(loadingRepo).toBe(false);
    expect(data).toBe('test');
  });

  it('useFetch with failed action', async () => {
    const {
      result,
      waitForNextUpdate
    } = renderHook(() => useFetch(fetchFailed, ''));
    let [loadData, data, loadingRepo] = result.current;
    expect(loadingRepo).toBe(false);
    expect(data).toBe('');

    const onFailed = jest.fn();
    renderer.act(() => {
      loadData()
        .catch(onFailed);
    });

    [loadData, data, loadingRepo] = result.current;
    expect(loadingRepo).toBe(true);

    await waitForNextUpdate();
    expect(onFailed).toBeCalled();
    [loadData, data, loadingRepo] = result.current;
    expect(loadingRepo).toBe(false);
    expect(data).toBe('');
  });
});
