"use client";

import Image from "next/image";
import { useState } from "react";
import type { ImageRef } from "@/content/types";
import { Icon } from "@/components/ui/Icon";

export function VideoPlayer({
  videoId,
  label,
  poster,
}: {
  videoId: string | null;
  label: string;
  poster: ImageRef | null;
}) {
  const [playing, setPlaying] = useState(false);

  if (videoId && playing) {
    return (
      <div className="aspect-video w-full max-w-[65rem] bg-black">
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Nex Management video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-video w-full max-w-[65rem] flex-col items-center justify-center gap-[18px] overflow-hidden border border-ink-3 bg-ink-2">
      {poster ? (
        <>
          <Image src={poster.src} alt="" fill sizes="(min-width: 1120px) 1040px, 100vw" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/50" />
        </>
      ) : null}
      <button
        type="button"
        onClick={() => setPlaying(true)}
        disabled={!videoId}
        aria-label={videoId ? "Play video" : "Video coming soon"}
        className="relative flex size-[84px] cursor-pointer items-center justify-center rounded-full border border-gold bg-gold/15 text-[#d4af37] transition-colors hover:bg-gold/30 disabled:cursor-default"
      >
        <Icon name="play" size={28} />
      </button>
      <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-muted-3">
        {videoId ? label : "[YouTube video – link pending]"}
      </p>
    </div>
  );
}
