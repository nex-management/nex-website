import { getHomeContent, getSiteSettings } from "@/content";
import { SectionIntro } from "@/components/ui/Typography";
import { VideoPlayer } from "./VideoPlayer";

/** Extracts the YouTube video id from watch / share / embed URLs. */
export function youtubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export async function Video() {
  const { video } = getHomeContent();
  const site = await getSiteSettings();
  const id = youtubeId(site.videoUrl);

  if (!id) return null;

  return (
    <section aria-labelledby="video-heading" className="bg-ink text-white">
      <div className="container-x section-y flex flex-col items-center gap-12">
        <SectionIntro
          eyebrow={video.eyebrow}
          heading={video.heading}
          lead={video.text}
          tone="dark"
          align="center"
          headingId="video-heading"
        />
        <VideoPlayer videoId={id} label={video.buttonLabel} poster={site.videoPoster ?? site.heroImage} />
      </div>
    </section>
  );
}
