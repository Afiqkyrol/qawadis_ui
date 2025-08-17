import { notificationError } from "@/app/lib/util/notification";

export async function getMatchListByStatus(status, init, token) {
  let result = {};

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/match/getMatchListByStatus?status=${status}&init=${init}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Fetching match list...");
    if (!response.ok) {
      notificationError(result.message, result.detailMessage);
      return [];
    }

    result = await response.json();

    if (!result || typeof result !== "object") {
      notificationError(
        "An error occurred!",
        "Invalid data format received from API."
      );
      return;
    }

    return result.data || [];
  } catch (e) {
    notificationError(
      "An error occurred!",
      "Unable to load activity data. Please try again later."
    );
    return [];
  }
}
