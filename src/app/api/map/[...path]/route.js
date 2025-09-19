// app/api/map/[...path]/route.js
import { parseEmbedUrl } from "@/app/lib/util/mapResolver";

const embedUrlCache = new Map();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const shareUrl = searchParams.get("url");
  if (!shareUrl) {
    return new Response(JSON.stringify({ error: "Missing url query" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check cache first
  if (embedUrlCache.has(shareUrl)) {
    return new Response(
      JSON.stringify({
        embedUrl: embedUrlCache.get(shareUrl),
        fromCache: true,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const res = await fetch(shareUrl, { method: "GET", redirect: "follow" });
    const finalUrl = res.url;
    const html = await res.text();

    const embedUrl = parseEmbedUrl(finalUrl, html);
    if (embedUrl) {
      embedUrlCache.set(shareUrl, embedUrl);
      return new Response(JSON.stringify({ embedUrl, fromCache: false }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Could not build embed url" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to resolve map" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
