export default function useIdleTime<CallBack extends (...args: any[]) => void>(callback: CallBack, ms: number): void;
