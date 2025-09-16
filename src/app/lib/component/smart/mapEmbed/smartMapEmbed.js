"use client";

import { Skeleton } from "@mantine/core";
import { useState, useEffect } from "react";

// global cache (lives across renders while app runs)
const embedCache = new Map();

export default function SmartMapEmbed({
  shareUrl,
  isLoading,
  width = "100%",
  height = "300",
}) {
  const [cachedUrl, setCachedUrl] = useState(null);

  useEffect(() => {
    if (!shareUrl) return;

    // if cached, reuse it
    if (embedCache.has(shareUrl)) {
      setCachedUrl(embedCache.get(shareUrl));
    } else {
      // here you can normalize/shareUrl if needed
      embedCache.set(shareUrl, shareUrl);
      setCachedUrl(shareUrl);
    }
  }, [shareUrl]);

  if (isLoading) {
    return (
      <Skeleton
        width={width}
        title="Loading map..."
        height={height}
        radius="md"
        style={{ marginBottom: "1rem" }}
      />
    );
  }

  if (!cachedUrl) return null;

  return (
    <iframe
      src={cachedUrl}
      width={width}
      height={height}
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        marginBottom: "1rem",
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
