"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";

export default function SmartMapEmbed({
  shareUrl,
  width = "100%",
  height = "300",
}) {
  const [embedMapUrl, setEmbedMapUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!shareUrl) return;

    const resolveUrl = async () => {
      try {
        setIsLoading(true);
        const resp = await fetch(
          `/api/map/resolve?url=${encodeURIComponent(shareUrl)}`
        );
        const { embedUrl } = await resp.json();

        setEmbedMapUrl(embedUrl);
      } catch (err) {
        console.error("Error resolving map link:", err);
      } finally {
        setIsLoading(false);
      }
    };

    resolveUrl();
  }, [shareUrl]);

  if (isLoading) {
    return (
      <Skeleton
        width={width}
        height={height}
        radius="md"
        style={{ marginBottom: "1rem" }}
      />
    );
  }

  if (!embedMapUrl) return null;

  return (
    <iframe
      src={embedMapUrl}
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
