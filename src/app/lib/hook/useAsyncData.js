import { useEffect, useRef, useState, useCallback } from "react";

export function useAsyncData(
  fetcher,
  { interval, deps = [], autoFetch = true } = {}
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const intervalRef = useRef(null);
  const isFetchingRef = useRef(false);
  const hasLoadedOnceRef = useRef(false);

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

      if (!hasLoadedOnceRef.current) setIsLoading(true);

      try {
        const result = await fetcher(...args);
        setData(result);
        hasLoadedOnceRef.current = true;

        // Start polling AFTER first fetch
        if (interval && !intervalRef.current) {
          intervalRef.current = setInterval(() => fetchData(...args), interval);
        }
      } catch (err) {
        stopPolling();
        setData([]);
        console.error(err);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    [fetcher, interval, stopPolling]
  );

  useEffect(() => {
    if (autoFetch) fetchData();
    return () => stopPolling();
  }, deps);

  return { data, isLoading, fetchData, stopPolling };
}
