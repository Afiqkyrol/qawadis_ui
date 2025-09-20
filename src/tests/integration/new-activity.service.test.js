import { describe, it, expect, vi, afterEach } from "vitest";
import { saveMatch } from "../../app/home/activity/new-activity/new-activity.service";
import * as proxyModule from "../../app/lib/util/proxyRequest";

describe("new-activity service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls proxyRequest with correct path and options", async () => {
    const mockResp = 13;
    const spy = vi
      .spyOn(proxyModule, "proxyRequest")
      .mockResolvedValue(mockResp);

    const body = { foo: "bar" };
    const token = "token";

    const data = await saveMatch(body, token);

    expect(typeof data).toBe("number");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("match/saveMatch", {
      method: "POST",
      body,
      token,
    });
  });

  it("throws backend error object as-is when proxyRequest rejects", async () => {
    const backendError = "An error occurred!";
    vi.spyOn(proxyModule, "proxyRequest").mockRejectedValue(backendError);

    await expect(saveMatch({ foo: "bar" }, "token")).rejects.toBe(backendError);
  });

  it("rethrows Error instances thrown by proxyRequest", async () => {
    const err = new Error("network failure");
    vi.spyOn(proxyModule, "proxyRequest").mockRejectedValue(err);

    await expect(saveMatch({ foo: "bar" }, "token")).rejects.toThrow(
      "network failure"
    );
  });
});
