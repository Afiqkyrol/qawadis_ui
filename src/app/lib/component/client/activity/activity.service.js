import { AppConstant } from "@/app/lib/constant/AppConstant";
import { proxyRequest } from "@/app/lib/util/proxyRequest";

export async function getLookupData(init, token) {
  return await proxyRequest("lookups/getLookupData", {
    method: "GET",
    query: { table: AppConstant.LT_SPORT_TABLE, active: true, init },
    token,
  });
}

export async function getMatchListByStatus(
  sportId,
  venue,
  date,
  statusId,
  init,
  token
) {
  return await proxyRequest("match/getMatchList", {
    method: "GET",
    query: { sportId, venue, date, statusId, init },
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
