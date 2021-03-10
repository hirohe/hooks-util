import { useCallback, useEffect, useRef } from 'react';

export default function useIdleTime<CallBack extends (...args: any[]) => void>(callback: CallBack, ms: number) {
  const idleTimeout = useRef<number | null>(null);

  const onActive = useCallback(() => {
    // clear previous idle setTimeout
    if (idleTimeout.current) {
      window.clearInterval(idleTimeout.current);
      idleTimeout.current = null;
    }
    // setup idle setTimeout
    idleTimeout.current = window.setTimeout(callback, ms);
  }, [callback, ms]);

  useEffect(() => {
    const eventNames: string[] = ['keydown', 'keyup', 'mousemove', 'mousedown', 'mousewheel'];
    eventNames.forEach(eventName => {
      window.addEventListener(eventName, onActive);
    });

    return () => {
      eventNames.forEach(eventName => {
        window.removeEventListener(eventName, onActive);
      });
    }
  }, [onActive])
}