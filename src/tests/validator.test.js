import { describe, it, expect } from "vitest";
import { validateEmail } from "../app/lib/util/validator";

describe("validateEmail", () => {
  it("validates good emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("first.last+tag@sub.domain.co")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateEmail("missing@domain")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });
});
