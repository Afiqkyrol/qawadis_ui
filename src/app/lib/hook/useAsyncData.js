import { useEffect, useRef, useState, useCallback } from "react";

export function useAsyncData(fetcher, { interval, deps = [] } = {}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);
  const isFetchingRef = useRef(false);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      try {
        const result = await fetcher();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        stopPolling();
        setData([]);
        setIsLoading(false);
      } finally {
        isFetchingRef.current = false;
      }
    }

    fetchData();

    if (interval) {
      intervalRef.current = setInterval(fetchData, interval);
    }

    return () => stopPolling();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading, stopPolling };
}
