export declare type FetchAction<Data> = (...args: any[]) => Promise<Data>;
export default function useFetch<Action extends FetchAction<T>, T = undefined>(action: Action): [Action, T | undefined, boolean];
export default function useFetch<T, Action extends FetchAction<T>>(action: Action, initialState: T): [Action, T, boolean];
