import { proxyRequest } from "@/app/lib/util/proxyRequest";

export async function getMatchListByStatus(status, init, token) {
  return await proxyRequest("match/getMatchListByStatus", {
    method: "GET",
    query: { status, init, refreshInterval: 5000 },
    token,
  });
}
