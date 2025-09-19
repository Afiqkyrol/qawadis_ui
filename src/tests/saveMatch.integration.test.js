import { describe, it, expect, vi, afterEach } from "vitest";
import { saveMatch } from "../app/home/activity/new-activity/new-activity.service";
import * as proxyModule from "../app/lib/util/proxyRequest";

describe("saveMatch service", () => {
  afterEach(() => {
    if (proxyModule.proxyRequest && proxyModule.proxyRequest.mockRestore) {
      proxyModule.proxyRequest.mockRestore();
    }
  });

  it("resolves and returns data when backend returns success shape", async () => {
    const mockResp = {
      success: true,
      data: { success: true, data: expect.any(Number) },
    };
    vi.spyOn(proxyModule, "proxyRequest").mockResolvedValue(mockResp);

    const data = await saveMatch({ foo: "bar" }, "token");
    expect(data).toEqual(mockResp.data);
  });

  it("throws standardized error object when backend indicates failure", async () => {
    const mockResp = {
      success: false,
      error: "Validation failed",
      status: 400,
    };
    vi.spyOn(proxyModule, "proxyRequest").mockResolvedValue(mockResp);

    await expect(saveMatch({ foo: "bar" }, "token")).rejects.toMatchObject({
      success: false,
      error: expect.any(String),
      status: expect.any(Number),
    });
  });

  it("throws standardized error on network / proxyRequest rejection", async () => {
    vi.spyOn(proxyModule, "proxyRequest").mockRejectedValue(
      new Error("network")
    );

    await expect(saveMatch({ foo: "bar" }, "token")).rejects.toMatchObject({
      success: false,
      error: "network",
      status: 500,
    });
  });
});
