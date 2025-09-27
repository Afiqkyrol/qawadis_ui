import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "./useNavigate";

export function useAsyncData(
  fetcher,
  {
    interval,
    deps = [],
    autoFetch = true,
    noLoading = false,
    redirectIfError = false,
    redirectTo = "/error",
  } = {}
) {
  const { goTo } = useNavigate();
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

      if ((!hasLoadedOnceRef.current || !interval || argsChanged) && !noLoading)
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

        return result;
      } catch (err) {
        setError(err);
        stopPolling();
        setData([]);
        if (redirectIfError) {
          goTo(redirectTo + "?error=" + encodeURIComponent(err.message));
        }
        throw err;
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
