import { useEffect, useRef, useState, useCallback } from "react";

export function useAsyncData(
  fetcher,
  { interval, deps = [], autoFetch = true } = {}
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const intervalRef = useRef(null);
  const isFetchingRef = useRef(false);
  const hasLoadedOnceRef = useRef(false); // track first fetch

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fetchData = useCallback(
    async (...args) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      if (interval && !hasLoadedOnceRef.current) setIsLoading(true);
      else if (!interval) setIsLoading(true);

      try {
        const result = await fetcher(...args);
        setData(result);
        hasLoadedOnceRef.current = true;
      } catch (err) {
        stopPolling();
        setData([]);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    [fetcher, interval, stopPolling]
  );

  useEffect(() => {
    if (!autoFetch) return;

    fetchData();

    if (interval) {
      intervalRef.current = setInterval(fetchData, interval);
    }

    return () => stopPolling();
  }, deps);

  return { data, isLoading, fetchData, stopPolling };
}
