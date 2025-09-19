import { AppConstant } from "../constant/AppConstant";
import { proxyRequest } from "../util/proxyRequest";
import { useAsyncData } from "./useAsyncData";

const lookupCache = new Map();

async function getLookupList(table, token) {
  try {
    if (lookupCache.has(table)) {
      return lookupCache.get(table);
    }

    const response = await proxyRequest("lookups/getLookupData", {
      method: "GET",
      query: { table, active: true, init: false },
      token,
    });

    const mapped = response?.lookupData?.map((data) => {
      let valueKey = "id";
      if (table === AppConstant.LT_SPORT_TABLE) valueKey = "sportId";
      if (table === AppConstant.LT_GENERAL_STATUS_TABLE) valueKey = "statusId";

      return {
        label: data.description,
        value: data[valueKey],
      };
    });

    lookupCache.set(table, mapped); // cache it
    return mapped;
  } catch (error) {
    throw error;
  }
}

export function useLookupData(table, token) {
  return useAsyncData(() => getLookupList(table, token), { autoFetch: true });
}
