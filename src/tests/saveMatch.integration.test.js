import { describe, it, expect, vi, afterEach } from "vitest";
import { saveMatch } from "../app/home/activity/new-activity/new-activity.service";
import * as proxyModule from "../app/lib/util/proxyRequest";

describe("saveMatch service", () => {
  afterEach(() => {
    // restore all spies/mocks
    vi.restoreAllMocks();
  });

  it("returns backend data when proxyRequest resolves with standardized success", async () => {
    const mockResp = 13; // because proxyRequest already returns only data
    vi.spyOn(proxyModule, "proxyRequest").mockResolvedValue(mockResp);

    const data = await saveMatch({ foo: "bar" }, "token");
    expect(data).toBe(13);
  });

  it("throws backend error object as-is when proxyRequest rejects", async () => {
    const backendError = {
      success: false,
      message: "An error occurred!",
      data: null,
      detailMessage: "Invalid input",
    };
    vi.spyOn(proxyModule, "proxyRequest").mockRejectedValue(backendError);

    await expect(saveMatch({ foo: "bar" }, "token")).rejects.toBe(backendError);
  });
});
