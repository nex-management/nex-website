"use client";

/**
 * Studio tool: "Starter content". One click copies the content that ships
 * with the code (site settings, hotels, team with photos, testimonials,
 * services) into the Sanity dataset, so editing starts from a filled-in
 * panel. Documents that already exist are left untouched, so it is safe to
 * run again.
 */
import { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import { Box, Button, Card, Flex, Heading, Stack, Text } from "@sanity/ui";
import { apiVersion } from "./env";
import {
  starterFinancialStrength,
  starterHeroImage,
  starterHotels,
  starterServices,
  starterSiteSettings,
  starterTeam,
  starterTestimonials,
  type StarterDocument,
} from "./starterContent";

type Plan = { label: string; ids: string[] }[];

function plan(): Plan {
  return [
    { label: "Site settings", ids: [starterSiteSettings()._id] },
    { label: "Financial strength", ids: [starterFinancialStrength()._id] },
    { label: "Hotels", ids: starterHotels().map((d) => d._id) },
    { label: "Team members (with photos)", ids: starterTeam().map((t) => t.doc._id) },
    { label: "Testimonials", ids: starterTestimonials().map((d) => d._id) },
    { label: "Services", ids: starterServices().map((d) => d._id) },
  ];
}

const ALL_IDS = plan().flatMap((p) => p.ids);

export function StarterContentTool() {
  const client = useClient({ apiVersion });
  const [existing, setExisting] = useState<Set<string> | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Bumped to re-check which starter documents already exist in the dataset.
  const [checkRound, setCheckRound] = useState(0);
  const recheck = useCallback(() => setCheckRound((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch<string[]>(`*[_id in $ids]._id`, { ids: ALL_IDS })
      .then((ids) => {
        if (!cancelled) setExisting(new Set(ids));
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [client, checkRound]);

  const missing = existing ? ALL_IDS.filter((id) => !existing.has(id)) : [];

  async function run() {
    if (!existing) return;
    setBusy(true);
    setError(null);
    const lines: string[] = [];
    const say = (line: string) => {
      lines.push(line);
      setLog([...lines]);
    };
    try {
      const docs: StarterDocument[] = [starterFinancialStrength(), ...starterHotels(), ...starterTestimonials(), ...starterServices()].filter(
        (d) => !existing.has(d._id),
      );

      const settings = starterSiteSettings();
      if (!existing.has(settings._id)) {
        if (starterHeroImage) {
          const res = await fetch(starterHeroImage.path);
          if (!res.ok) throw new Error(`Could not load the opening image ${starterHeroImage.path} (${res.status}).`);
          const asset = await client.assets.upload("image", await res.blob(), { filename: starterHeroImage.filename, contentType: "image/jpeg" });
          say("Uploaded the homepage opening image");
          docs.push({ ...settings, heroImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } });
        } else {
          docs.push(settings);
        }
      }

      for (const member of starterTeam()) {
        if (existing.has(member.doc._id)) continue;
        const res = await fetch(member.photoPath);
        if (!res.ok) throw new Error(`Could not load the photo ${member.photoPath} (${res.status}).`);
        const blob = await res.blob();
        const asset = await client.assets.upload("image", blob, { filename: member.photoFilename, contentType: "image/jpeg" });
        say(`Uploaded photo for ${String(member.doc.name)}`);
        docs.push({ ...member.doc, photo: { _type: "image", asset: { _type: "reference", _ref: asset._id } } });
      }

      if (docs.length === 0) {
        say("Nothing to add – everything is already there.");
      } else {
        const tx = client.transaction();
        for (const doc of docs) tx.createIfNotExists(doc);
        await tx.commit();
        say(`Created ${docs.length} document${docs.length === 1 ? "" : "s"}.`);
        say("Done. The website picks up Sanity content within about an hour (immediately if the webhook is set up).");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      recheck();
    }
  }

  return (
    <Box padding={5} style={{ maxWidth: 720 }}>
      <Stack gap={5}>
        <Stack gap={3}>
          <Heading as="h1" size={3}>
            Starter content
          </Heading>
          <Text size={2} muted>
            Copies the content the website launched with into this editing panel: site settings, hotels, team members with their photos,
            testimonials and services. Anything that already exists here is left untouched, so this is safe to run more than once.
          </Text>
        </Stack>

        <Card padding={4} radius={2} shadow={1}>
          <Stack gap={3}>
            {plan().map((group) => {
              const todo = existing ? group.ids.filter((id) => !existing.has(id)).length : null;
              return (
                <Flex key={group.label} justify="space-between" gap={3}>
                  <Text size={2}>{group.label}</Text>
                  <Text size={2} muted>
                    {existing === null ? "checking…" : todo === 0 ? "already there" : `${todo} of ${group.ids.length} to add`}
                  </Text>
                </Flex>
              );
            })}
          </Stack>
        </Card>

        <Flex gap={3} align="center">
          <Button
            text={busy ? "Adding…" : missing.length ? `Add starter content (${missing.length} items)` : "Nothing to add"}
            tone="primary"
            disabled={busy || existing === null || missing.length === 0}
            onClick={run}
          />
          <Button text="Re-check" mode="ghost" disabled={busy} onClick={recheck} />
        </Flex>

        {error ? (
          <Card padding={3} radius={2} tone="critical">
            <Text size={2}>{error}</Text>
          </Card>
        ) : null}

        {log.length ? (
          <Card padding={3} radius={2} tone="transparent" border>
            <Stack gap={2}>
              {log.map((line, i) => (
                <Text key={i} size={1}>
                  {line}
                </Text>
              ))}
            </Stack>
          </Card>
        ) : null}
      </Stack>
    </Box>
  );
}
