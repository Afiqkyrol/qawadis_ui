import { notificationError } from "@/app/lib/util/notification";

/**
 * Generic proxy request (GET, POST, etc.)
 * @param {string} path - Backend path after /api/proxy/
 * @param {object} options - Options object
 * @param {'GET'|'POST'} options.method - HTTP method
 * @param {object} [options.query] - Query parameters
 * @param {object} [options.body] - Body for POST/PUT/PATCH
 * @param {string} [options.token] - Authorization token
 * @returns {Promise<any[]>} - Returns data array or empty array on error
 */
export async function proxyRequest(
  path,
  { method = "GET", query = {}, body, token } = {}
) {
  try {
    // Build URL and append query parameters (for any method)
    let url = `/api/proxy/${path}`;
    if (query && Object.keys(query).length) {
      const queryString = new URLSearchParams(query).toString();
      url += `?${queryString}`;
    }

    const res = await fetch(url, {
      method,
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(method !== "GET" ? { "Content-Type": "application/json" } : {}),
      },
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    const result = await res.json();

    if (!res.ok || !result || typeof result !== "object") {
      notificationError(
        "An error occurred!",
        result?.detailMessage || "Invalid data received from API."
      );
      return [];
    }

    return result.data || [];
  } catch (err) {
    notificationError(
      "An error occurred!",
      "Unable to load data. Please try again later."
    );
    return [];
  }
}
