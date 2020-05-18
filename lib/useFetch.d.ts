export declare type FetchAction<Data> = () => Promise<Data>;
export declare function useFetch<T = undefined>(action: FetchAction<T>): [FetchAction<T>, T | undefined, boolean];
export declare function useFetch<T>(action: FetchAction<T>, initialState: T): [FetchAction<T>, T, boolean];
export default function useFetch<T>(action: FetchAction<T>, initialState?: T): [FetchAction<T>, T | undefined, boolean];
