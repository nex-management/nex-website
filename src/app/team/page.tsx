import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings, getTeam, getTeamPageContent } from "@/content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata: Metadata = {
  title: "Leadership & Team",
  description:
    "The professionals behind Nex Management bring decades of combined experience in hospitality operations, real estate, and financial management.",
};

export default function TeamPage() {
  const { teamIntro, teamGroups, perspectivesIntro, careers } = getTeamPageContent();
  const team = getTeam();
  const site = getSiteSettings();
  const withPerspective = team.filter((member) => member.perspective);

  return (
    <>
      <Header currentPath="/team" />
      <main className="flex flex-1 flex-col">
        {/* Page intro */}
        <section className="border-b border-line bg-cream">
          <div className="container-x flex flex-wrap items-end gap-x-20 gap-y-10 pb-[88px] pt-24">
            <div className="flex min-w-0 flex-[1_1_26.25rem] flex-col gap-5">
              <Eyebrow tone="cream">{teamIntro.eyebrow}</Eyebrow>
              <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
                {teamIntro.heading}
              </Heading>
            </div>
            <p className="max-w-[35rem] flex-[1_1_25rem] pb-2.5 text-lg leading-[1.7] text-body">{teamIntro.text}</p>
          </div>
        </section>

        {/* Team grid */}
        <section aria-label="Team members" className="bg-white">
          <div className="container-x flex flex-col gap-[72px] pb-[110px] pt-[100px]">
            {teamGroups.map((group) => {
              const members = team.filter((member) => member.group === group.id);
              if (members.length === 0) return null;
              return (
                <div key={group.id} className="flex flex-col gap-9">
                  <div className="flex items-center gap-5">
                    <h2 className="eyebrow whitespace-nowrap text-gold-text">{group.label}</h2>
                    <div aria-hidden="true" className="h-px flex-1 bg-line" />
                  </div>
                  <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(18.75rem,1fr))] items-start gap-x-10 gap-y-14 p-0">
                    {members.map((member) => (
                      <li key={member.slug}>
                        <article className="flex flex-col gap-[22px]">
                          <Image
                            src={member.photo.src}
                            alt={member.photo.alt}
                            width={member.photo.width ?? 800}
                            height={member.photo.height ?? 1000}
                            sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
                            className="aspect-[4/5] w-full rounded-[2px] object-cover"
                          />
                          <div className="flex flex-col gap-2">
                            <h3 className="font-display text-[30px] font-semibold leading-[1.1] text-ink">{member.name}</h3>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-text">{member.title}</p>
                          </div>
                          <p className="text-[15px] leading-[1.7] text-muted">{member.bio}</p>
                          {member.email || member.linkedinUrl ? (
                            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-[13px] font-semibold tracking-[0.06em]">
                              {member.email ? (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="border-b border-gold pb-0.5 text-ink no-underline hover:text-gold-text"
                                >
                                  {member.email}
                                </a>
                              ) : null}
                              {member.linkedinUrl ? (
                                <a
                                  href={member.linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 border-b border-gold pb-0.5 text-ink no-underline hover:text-gold-text"
                                >
                                  <Icon name="linkedin" size={16} />
                                  LinkedIn
                                </a>
                              ) : member.email && site.showPlaceholders ? (
                                <span className="text-muted-3">[LinkedIn – pending]</span>
                              ) : null}
                            </div>
                          ) : null}
                        </article>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership perspectives */}
        {withPerspective.length > 0 ? (
          <section aria-labelledby="perspectives-heading" className="border-y border-line bg-cream">
            <div className="container-x flex flex-col gap-16 py-[110px]">
              <div className="flex flex-wrap items-end gap-x-20 gap-y-6">
                <div className="flex min-w-0 flex-[1_1_23.75rem] flex-col gap-[18px]">
                  <Eyebrow tone="cream">{perspectivesIntro.eyebrow}</Eyebrow>
                  <Heading id="perspectives-heading">{perspectivesIntro.heading}</Heading>
                </div>
                <p className="max-w-[32.5rem] flex-[1_1_23.75rem] pb-1.5 text-[17px] leading-[1.7] text-body">
                  {perspectivesIntro.text}
                </p>
              </div>

              <div className="flex flex-col">
                {withPerspective.map((member, index) => (
                  <figure
                    key={member.slug}
                    className={`flex flex-wrap gap-x-20 gap-y-8 border-t border-line-2 pt-14 ${
                      index === withPerspective.length - 1 ? "" : "pb-14"
                    }`}
                  >
                    <figcaption className="flex min-w-[15rem] flex-[0_1_18.75rem] items-center gap-5">
                      <Image
                        src={member.photo.src}
                        alt=""
                        width={160}
                        height={160}
                        sizes="80px"
                        className="size-20 shrink-0 rounded-full object-cover object-[50%_30%]"
                      />
                      <div className="flex flex-col gap-1.5">
                        <p className="font-display text-[26px] font-semibold leading-[1.1] text-ink">{member.shortName}</p>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">{member.title}</p>
                      </div>
                    </figcaption>
                    <blockquote className="min-w-0 flex-[1_1_32.5rem] border-l-2 border-gold pl-8 font-display text-2xl font-medium italic leading-[1.45] text-ink">
                      &ldquo;{member.perspective}&rdquo;
                    </blockquote>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Careers */}
        <section aria-labelledby="careers-heading" className="bg-white">
          <div className="container-x flex flex-col items-center gap-6 py-[110px] text-center">
            <Eyebrow>{careers.eyebrow}</Eyebrow>
            <Heading id="careers-heading">{careers.heading}</Heading>
            <p className="max-w-[37.5rem] text-[17px] leading-[1.7] text-body">{careers.text}</p>
            <ButtonLink href={`mailto:${site.email}`} variant="gold" className="mt-3 px-8">
              {careers.cta}
            </ButtonLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
