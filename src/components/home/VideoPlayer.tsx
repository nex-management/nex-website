"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageRef } from "@/content/types";
import { Icon } from "@/components/ui/Icon";
import { Picture } from "@/components/ui/Picture";

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
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The play button disappears once the video starts; keyboard focus moves into the player.
  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  if (videoId && playing) {
    return (
      <div className="aspect-video w-full max-w-[65rem] bg-black">
        <iframe
          ref={frameRef}
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Nex Management – our story (YouTube video)"
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
          <Picture image={poster} alt="" sizes="(min-width: 1120px) 1040px, 100vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />
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
      <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-sand-2">{label}</p>
    </div>
  );
}
