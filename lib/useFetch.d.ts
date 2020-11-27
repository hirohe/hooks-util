export declare type FetchAction<Data, Args extends any[] = any[]> = (...args: Args) => Promise<Data>;
declare type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export default function useFetch<T extends FetchAction<any>, D = ThenArg<ReturnType<T>>>(action: T): [T, D | undefined, boolean];
export default function useFetch<T extends FetchAction<any>, D = ThenArg<ReturnType<T>>, InitState = D>(action: T, initialState: InitState): [T, D | InitState, boolean];
