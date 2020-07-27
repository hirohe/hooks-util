interface DebounceSettings {
    /**
     * Specify invoking on the leading edge of the timeout.
     */
    leading?: boolean;
    /**
     * The maximum time func is allowed to be delayed before it’s invoked.
     */
    maxWait?: number;
    /**
     * Specify invoking on the trailing edge of the timeout.
     */
    trailing?: boolean;
}
interface Cancelable {
    cancel(): void;
    flush(): void;
}
export declare function useDebounceState<S>(initialState: S, timeout: number, options?: DebounceSettings): (S | (((state: S) => void) & Cancelable) | null)[];
export default useDebounceState;
