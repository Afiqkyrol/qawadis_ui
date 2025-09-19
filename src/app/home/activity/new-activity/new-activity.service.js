import { proxyRequest } from "../../../lib/util/proxyRequest";

export async function saveMatch(body, token) {
  try {
    return await proxyRequest("match/saveMatchs", {
      method: "POST",
      body: body,
      token,
    });
  } catch (error) {
    throw error;
  }
}
