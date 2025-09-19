import { AppConstant } from "@/app/lib/constant/AppConstant";
import { proxyRequest } from "@/app/lib/util/proxyRequest";

export async function getLookupData(init, token) {
  try {
    return await proxyRequest("lookups/getLookupData", {
      method: "GET",
      query: { table: AppConstant.LT_SPORT_TABLE, active: true, init },
      token,
    });
  } catch (error) {
    throw error;
  }
}

export async function getMatchListByStatus(
  sportId,
  venue,
  date,
  time,
  statusId,
  init,
  token
) {
  try {
    return await proxyRequest("match/getMatchList", {
      method: "GET",
      query: { sportId, venue, date, time, statusId, init },
      token,
    });
  } catch (error) {
    throw error;
  }
}

export async function findMatchById(matchId, init, token) {
  try {
    return await proxyRequest("match/findMatchById", {
      method: "GET",
      query: { matchId, init },
      token,
    });
  } catch (error) {
    throw error;
  }
}

export async function getPlayerListByMatchId(matchId, status, init, token) {
  try {
    return await proxyRequest("match/getPlayerListByMatchId", {
      method: "GET",
      query: { matchId, init },
      token,
    });
  } catch (error) {
    throw error;
  }
}

export async function saveUserMatch(body, token) {
  try {
    return await proxyRequest("match/saveUserMatch", {
      method: "POST",
      body: body,
      token,
    });
  } catch (error) {
    throw error;
  }
}
