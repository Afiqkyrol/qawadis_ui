import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the Vite alias import used inside the service file so tests can import it.
vi.mock("@/app/lib/constant/AppConstant", () => ({
  AppConstant: {
    LT_GENERAL_STATUS_TABLE: "LT001",
    LT_SPORT_TABLE: "LT002",
    GSTS_ACTIVE: 1,
    GSTS_INACTIVE: 2,
    GSTS_CANCELED: 3,
    GSTS_CLOSED: 4,
  },
}));

// Forward the '@/...' alias used by source files to the real module so imports succeed.
// Use a dynamic forwarder (importActual) so tests can spyOn the real function and
// the service will call the spied function instance.
vi.mock("@/app/lib/util/proxyRequest", async () => {
  const actual = await vi.importActual("../../app/lib/util/proxyRequest");
  return {
    proxyRequest: (...args) => actual.proxyRequest(...args),
  };
});

import * as proxyModule from "../../app/lib/util/proxyRequest";
import * as service from "../../app/home/activity/activity.service";
import { AppConstant } from "../../app/lib/constant/AppConstant";

describe("activity.service (integration via proxyRequest)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getLookupData builds correct URL and returns data", async () => {
    const mockedData = [{ id: 1 }];

    const spy = vi
      .spyOn(proxyModule, "proxyRequest")
      .mockResolvedValue(mockedData);

    const result = await service.getLookupData(false, undefined);
    expect(result).toEqual(mockedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("lookups/getLookupData", {
      method: "GET",
      query: { table: AppConstant.LT_SPORT_TABLE, active: true, init: false },
      token: undefined,
    });
  });

  it("getMatchListByStatus includes all query params and token header when provided", async () => {
    const mockedData = [{ match: "x" }];
    const sportId = 5;
    const venue = "v";
    const date = "2025-09-20";
    const time = "10:00";
    const statusId = 2;
    const init = true;
    const token = "ttt";

    const spy = vi
      .spyOn(proxyModule, "proxyRequest")
      .mockResolvedValue(mockedData);

    const res = await service.getMatchListByStatus(
      sportId,
      venue,
      date,
      time,
      statusId,
      init,
      token
    );

    expect(res).toEqual(mockedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("match/getMatchList", {
      method: "GET",
      query: { sportId, venue, date, time, statusId, init },
      token,
    });
  });

  it("findMatchById requests correct path and returns data", async () => {
    const mockedData = { id: 10 };
    const matchId = 10;
    const init = false;
    const token = undefined;

    const spy = vi
      .spyOn(proxyModule, "proxyRequest")
      .mockResolvedValue(mockedData);

    const res = await service.findMatchById(matchId, init, token);
    expect(res).toEqual(mockedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("match/findMatchById", {
      method: "GET",
      query: { matchId, init },
      token: undefined,
    });
  });

  it("getPlayerListByMatchId requests correct path and ignores unused status param", async () => {
    const mockedData = [{ player: "p" }];
    const matchId = 22;
    const status = 99; // service does not include this in query
    const init = true;

    const spy = vi
      .spyOn(proxyModule, "proxyRequest")
      .mockResolvedValue(mockedData);

    const res = await service.getPlayerListByMatchId(
      matchId,
      status,
      init,
      undefined
    );
    expect(res).toEqual(mockedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("match/getPlayerListByMatchId", {
      method: "GET",
      query: { matchId, init },
      token: undefined,
    });
  });

  it("saveUserMatch sends POST with JSON body and Content-Type header", async () => {
    const mockedData = 13;
    const body = { a: 1 };
    const token = "tok123";

    const spy = vi
      .spyOn(proxyModule, "proxyRequest")
      .mockResolvedValue(mockedData);

    const res = await service.saveUserMatch(body, token);
    expect(res).toBe(mockedData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("match/saveUserMatch", {
      method: "POST",
      body,
      token,
    });
  });

  it("propagates errors when backend responds with non-ok status", async () => {
    const err = new Error("Invalid input");
    vi.spyOn(proxyModule, "proxyRequest").mockRejectedValue(err);

    await expect(service.getLookupData(false, undefined)).rejects.toThrow(
      /Invalid input/
    );
  });
});
