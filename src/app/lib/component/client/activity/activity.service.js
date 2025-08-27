import { proxyRequest } from "@/app/lib/util/proxyRequest";

export async function getMatchListByStatus(status, init, token) {
  return await proxyRequest("match/getMatchListByStatus", {
    method: "GET",
    query: { status, init },
    token,
  });
}

export async function findMatchById(matchId, init, token) {
  return await proxyRequest("match/findMatchById", {
    method: "GET",
    query: { matchId, init },
    token,
  });
}

export async function getPlayerListByMatchId(matchId, status, init, token) {
  return await proxyRequest("match/getPlayerListByMatchId", {
    method: "GET",
    query: { matchId, init },
    token,
  });
}

export async function saveUserMatch(body, token) {
  return await proxyRequest("match/saveUserMatch", {
    method: "POST",
    body: body,
    token,
  });
}
