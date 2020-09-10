# hooks-util
some custom react hooks

[![](https://flat.badgen.net/npm/v/@hirohe/hooks-util?icon=npm)](https://www.npmjs.com/package/@hirohe/hooks-util)

### Usage

### Document

- useFetch

包装网络请求函数的钩子，返回请求调用方法、请求的返回数据、是否正在请求的状态

```tsx
// 请求远程数据的方法
function fetchData(): Promise<string> {
  // ... http request
}

const App = () => {
  // loadData 包装后的请求方法，参数和返回值跟fetchData一致
  // data 和useState返回的state一样，为fetchData返回的异步数据
  // loadingData 是否正在请求数据的状态
  const [loadData, data, loadingData] = useFetch(fetchData, 'initialData');

  return (
    <div>
      <button onClick={loadData}>Load data</button>
      {loadingData && <p>loading...</p>}
      <p>data: {data}</p>
    </div>
  );
}
```

---

- useDebounceState

封装了`lodash/debounce`方法的钩子

```tsx
const App = () => {
  const [count, setCount] = useDebounce(0, 1000)

  return (
    <div>
      <p>{count}</p>
      <button>count +1</button>
    </div>
  )

}
```
