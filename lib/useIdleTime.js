import { useCallback, useEffect, useRef } from 'react';
export default function useIdleTime(callback, ms) {
  const idleTimeout = useRef(null);
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
    const eventNames = [
      'keydown',
      'keyup',
      'mousemove',
      'mousedown',
      'mousewheel',
    ];
    eventNames.forEach(eventName => {
      window.addEventListener(eventName, onActive);
    });
    return () => {
      eventNames.forEach(eventName => {
        window.removeEventListener(eventName, onActive);
      });
    };
  }, [onActive]);
}
