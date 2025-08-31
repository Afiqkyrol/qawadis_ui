import { AppConstant } from "../constant/AppConstant";
import { proxyRequest } from "../util/proxyRequest";
import { useAsyncData } from "./useAsyncData";

async function getLookupList(table, token) {
  const response = await proxyRequest("lookups/getLookupData", {
    method: "GET",
    query: { table, active: true, init: false },
    token,
  });

  return response?.lookupData?.map((data) => {
    let valueKey = "id";
    if (table === AppConstant.LT_SPORT_TABLE) valueKey = "sportId";
    if (table === AppConstant.LT_GENERAL_STATUS_TABLE) valueKey = "statusId";

    return {
      label: data.description,
      value: data[valueKey],
    };
  });
}

export function useLookupData(table, token) {
  return useAsyncData(() => getLookupList(table, token), { autoFetch: true });
}
