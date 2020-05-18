// from https://usehooks.com/useKeyPress/
import {useCallback, useEffect, useState} from "react";

export default function useKeyPress(targetKey: string | number): [boolean, () => void] {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const keyDownHandler = useCallback((e: KeyboardEvent) => {
    if (typeof targetKey === 'string') {
      setKeyPressed(e.key === targetKey);
    } else {
      setKeyPressed(e.keyCode === targetKey);
    }
  }, [targetKey]);

  const keyUpHandler = useCallback((e: KeyboardEvent) => {
    if (typeof targetKey === 'string') {
      setKeyPressed(e.key !== targetKey);
    } else {
      setKeyPressed(e.keyCode !== targetKey);
    }
  }, [targetKey]);

  const unsubscribe = useCallback(() => {
    window.removeEventListener('keydown', keyDownHandler);
    window.removeEventListener('keyup', keyUpHandler);
  }, [keyDownHandler, keyUpHandler]);

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);

  return [keyPressed, unsubscribe];
}
