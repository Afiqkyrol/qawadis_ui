import { describe, it, expect } from "vitest";
import { parseEmbedUrl } from "../app/lib/util/mapResolver";

describe("parseEmbedUrl", () => {
  it("extracts embed pb link from html", () => {
    const html =
      '<html><body><iframe src="https://www.google.com/maps/embed?pb=ABC123"></iframe></body></html>';
    const result = parseEmbedUrl("https://short.link/example", html);
    expect(result).toBe("https://www.google.com/maps/embed?pb=ABC123");
  });

  it("builds embed url from coords in finalUrl", () => {
    const finalUrl =
      "https://www.google.com/maps/place/The+Place/@3.0641795,101.4231428,15z";
    const result = parseEmbedUrl(finalUrl, "");
    expect(result).toContain("https://www.google.com/maps?");
    expect(result).toContain("3.0641795");
    expect(result).toContain("101.4231428");
  });

  it("converts normal maps url to embed when no html/coords", () => {
    const finalUrl = "https://www.google.com/maps/search/?api=1&query=abc";
    const result = parseEmbedUrl(finalUrl, "");
    expect(result).toBe(finalUrl.replace("/maps/", "/maps/embed/"));
  });

  it("returns null for non-google urls", () => {
    const finalUrl = "https://example.com/page";
    const result = parseEmbedUrl(finalUrl, "<html></html>");
    expect(result).toBeNull();
  });
});
