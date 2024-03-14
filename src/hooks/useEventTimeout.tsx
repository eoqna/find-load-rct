import { useCallback, useEffect, useState } from "react";

const idleTimeout = 1000 * 10; // 5 minutes

const useEventTimeout = ( 
  callback: () => void,
  events: string[] = ['click', 'keypress'],
  timeout: number = idleTimeout
) => {
  const [idleTime, setIdleTime] = useState(new Date());

  const resetTimer = useCallback(() => {
    setIdleTime(new Date());
  }, []);

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    return function cleanup() {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      callback();
    }, timeout);

    return function cleanup() {
      clearTimeout(idleTimer);
    };
  }, [idleTime, timeout]);
};

export default useEventTimeout;