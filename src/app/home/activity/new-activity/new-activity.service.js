import { proxyRequest } from "@/app/lib/util/proxyRequest";

export async function saveMatch(body, token) {
  try {
    return await proxyRequest("match/saveMatch", {
      method: "POST",
      body: body,
      token,
    });
  } catch (err) {
    throw err;
  }
}
