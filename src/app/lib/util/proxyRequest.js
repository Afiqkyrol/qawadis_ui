import { notificationError } from "./notification";

/**
 * Error wrapper for backend errors so callers always get an Error instance
 * with the raw payload preserved on `.raw` and HTTP status on `.status`.
 */
export class BackendError extends Error {
  constructor(message, raw = null, status = null) {
    super(message);
    this.name = "BackendError";
    this.raw = raw;
    this.status = status;
  }
}

/**
 * Create a proxyRequest function with injectable fetch and baseUrl.
 * - baseUrl: optional prefix (e.g., 'http://localhost:3000') used in tests
 * - fetchImpl: an implementation of fetch (defaults to global fetch)
 */
export function createProxyRequest({
  baseUrl = "",
  fetchImpl = globalThis.fetch,
} = {}) {
  return async function proxyRequest(
    path,
    { method = "GET", query = {}, body, token } = {}
  ) {
    try {
      // Build URL (prefix with baseUrl when provided)
      let url = `/api/proxy/${path}`;
      if (baseUrl) url = baseUrl.replace(/\/$/, "") + url;

      // filter out undefined/null query params
      if (query && Object.keys(query).length) {
        const entries = Object.entries(query).filter(
          ([, v]) => v !== undefined && v !== null
        );
        const queryString = new URLSearchParams(
          Object.fromEntries(entries)
        ).toString();
        if (queryString) url += `?${queryString}`;
      }

      const res = await fetchImpl(url, {
        method,
        cache: "no-store",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(method !== "GET" ? { "Content-Type": "application/json" } : {}),
        },
        body: method !== "GET" && body ? JSON.stringify(body) : undefined,
      });

      let result;
      try {
        result = await res.json();
      } catch (e) {
        throw new BackendError(
          "Invalid JSON response from backend",
          null,
          res.status ?? null
        );
      }

      if (!res.ok || !result || typeof result !== "object") {
        const message =
          result?.detailMessage ||
          "Unable to process request. Please try again later.";
        throw new BackendError(message, result ?? null, res.status ?? null);
      }

      return result.data ?? [];
    } catch (err) {
      const out = err instanceof Error ? err : new Error(String(err));
      // notify and rethrow
      try {
        notificationError("An error occurred!", out.message);
      } catch (_) {
        // swallow notification errors
      }
      throw out;
    }
  };
}

// Default instance for backwards compatibility (uses global fetch and no baseUrl)
export const proxyRequest = createProxyRequest({
  baseUrl: "",
  fetchImpl: typeof fetch !== "undefined" ? fetch : globalThis.fetch,
});

export default proxyRequest;
