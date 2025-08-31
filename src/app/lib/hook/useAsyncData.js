import { useEffect, useRef, useState, useCallback } from "react";

export function useAsyncData(
  fetcher,
  { interval, deps = [], autoFetch = true } = {}
) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);
  const isFetchingRef = useRef(false);
  const hasLoadedOnceRef = useRef(false);
  const latestArgsRef = useRef([]);
  const prevArgsRef = useRef([]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const request = useCallback(
    async (...args) => {
      if (args.length > 0) {
        latestArgsRef.current = args;
      }

      const argsChanged =
        JSON.stringify(prevArgsRef.current) !==
        JSON.stringify(latestArgsRef.current);
      prevArgsRef.current = [...latestArgsRef.current];

      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      if (!hasLoadedOnceRef.current || !interval || argsChanged)
        setIsLoading(true);

      try {
        const result = await fetcher(...latestArgsRef.current);
        setData(result);
        setError(null);
        hasLoadedOnceRef.current = true;

        if (interval && !intervalRef.current) {
          intervalRef.current = setInterval(() => {
            request(...latestArgsRef.current);
          }, interval);
        }
      } catch (err) {
        setError(err);
        stopPolling();
        setData([]);
      } finally {
        isFetchingRef.current = false;
        setIsLoading(false);
      }
    },
    [fetcher, interval]
  );

  useEffect(() => {
    if (autoFetch) {
      request();
    }

    return () => stopPolling();
  }, deps);

  return { data, isLoading, error, request, stopPolling };
}
