import Image from "next/image";
import { getSiteSettings, getTeam, getTeamPageContent } from "@/content";
import { teamIntro } from "@/content/team";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd, personJsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, Heading } from "@/components/ui/Typography";

export const metadata = pageMeta({ title: "Leadership & Team", description: teamIntro.text, path: "/team" });

export default async function TeamPage() {
  const { teamIntro, teamGroups, perspectivesIntro, careers } = getTeamPageContent();
  const [team, site] = await Promise.all([getTeam(), getSiteSettings()]);
  const withPerspective = team.filter((member) => member.perspective);

  return (
    <>
      <Header currentPath="/team" />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {/* Page intro */}
        <section className="border-b border-line bg-cream">
          <div className="container-x band-y flex flex-wrap items-end gap-x-20 gap-y-10">
            <div className="flex min-w-0 max-w-[46rem] flex-[1_1_36rem] flex-col gap-5">
              <Eyebrow tone="cream">{teamIntro.eyebrow}</Eyebrow>
              <Heading as="h1" size="xl" className="!text-[clamp(2.875rem,5.2vw,4.75rem)]">
                {teamIntro.heading}
              </Heading>
            </div>
            <p className="max-w-[35rem] flex-[0_1_28rem] pb-2.5 text-lg leading-[1.7] text-body">{teamIntro.text}</p>
          </div>
        </section>

        {/* Team grid */}
        <section aria-label="Team members" className="bg-white">
          <div className="container-x section-y flex flex-col gap-[72px]">
            {teamGroups.map((group) => {
              const members = team.filter((member) => member.group === group.id);
              if (members.length === 0) return null;
              return (
                <div key={group.id} className="flex flex-col gap-9">
                  <div className="flex items-center gap-5">
                    <h2 className="eyebrow whitespace-nowrap text-gold-text">{group.label}</h2>
                    <div aria-hidden="true" className="h-px flex-1 bg-line" />
                  </div>
                  <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] items-start gap-x-10 gap-y-14 p-0">
                    {members.map((member, index) => (
                      <li key={member.slug}>
                        <article className="flex flex-col gap-[22px]">
                          <Image
                            src={member.photo.src}
                            alt={member.photo.alt}
                            unoptimized={member.photo.unoptimized}
                            width={member.photo.width ?? 800}
                            height={member.photo.height ?? 1000}
                            sizes="(min-width: 1280px) 380px, (min-width: 768px) 50vw, 100vw"
                            // The first portrait is the page's largest visible image: load it first.
                            priority={group.id === "leadership" && index === 0}
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
            <div className="container-x section-y flex flex-col gap-16">
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
                        unoptimized={member.photo.unoptimized}
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
                    <blockquote className="min-w-0 max-w-[44rem] flex-[1_1_32.5rem] border-l-2 border-gold pl-8 font-display text-[22px] font-medium italic leading-[1.5] text-ink">
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
          <div className="container-x section-y flex flex-col items-center gap-6 text-center">
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
      <JsonLd data={team.map(personJsonLd)} />
    </>
  );
}
