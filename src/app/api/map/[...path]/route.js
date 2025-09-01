// app/api/map/[...path]/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const shareUrl = searchParams.get("url");
  if (!shareUrl) {
    return new Response(JSON.stringify({ error: "Missing url query" }), {
      status: 400,
    });
  }

  try {
    const res = await fetch(shareUrl, { method: "GET", redirect: "follow" });
    const finalUrl = res.url;
    const html = await res.text();

    let match = html.match(
      /https:\/\/www\.google\.com\/maps\/embed\?pb=[^"'<> ]+/
    );
    if (match) {
      return new Response(JSON.stringify({ embedUrl: match[0] }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const coord = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    const place = finalUrl.match(/\/maps\/place\/([^\/@?]+)/);
    if (coord) {
      const lat = coord[1];
      const lng = coord[2];
      const placeName = place
        ? decodeURIComponent(place[1]).replace(/\+/g, " ")
        : null;

      const embedUrl = placeName
        ? `https://www.google.com/maps?q=${encodeURIComponent(
            placeName
          )}&ll=${lat},${lng}&z=16&output=embed`
        : `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`;

      return new Response(JSON.stringify({ embedUrl }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (finalUrl.includes("google.com/maps")) {
      return new Response(
        JSON.stringify({
          embedUrl: finalUrl.replace("/maps/", "/maps/embed/"),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Could not build embed url" }),
      { status: 500 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to resolve map" }),
      { status: 500 }
    );
  }
}
