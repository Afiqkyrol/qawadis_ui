import { proxyRequest } from "../../../lib/util/proxyRequest";

export async function saveMatch(body, token) {
  return await proxyRequest("match/saveMatch", {
    method: "POST",
    body: body,
    token,
  });
}
