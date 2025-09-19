export function parseEmbedUrl(finalUrl, html) {
  // try to extract embed pb from page HTML first
  if (html) {
    const match = html.match(
      /https:\/\/www\.google\.com\/maps\/embed\?pb=[^"'<> ]+/
    );
    if (match) return match[0];
  }

  // try to extract coordinates from finalUrl
  const coord = finalUrl && finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  const place = finalUrl && finalUrl.match(/\/maps\/place\/([^\/@?]+)/);

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

    return embedUrl;
  }

  // fallback: if finalUrl points to google maps, try to convert to embed path
  if (finalUrl && finalUrl.includes("google.com/maps")) {
    try {
      return finalUrl.replace("/maps/", "/maps/embed/");
    } catch (e) {
      return null;
    }
  }

  return null;
}
