import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALMANAC_CATALOG } from "@/app/components/almanac-data";
import { StyleDetailClient } from "@/app/components/style-detail-client";

export function generateStaticParams() {
  return ALMANAC_CATALOG.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = ALMANAC_CATALOG.find((x) => x.slug === slug);
  if (!item) return { title: "Not Found · TEA.md" };
  return {
    title: `${item.name} (${item.en}) · TEA.md`,
    description: item.origin,
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = ALMANAC_CATALOG.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();

  const entry = ALMANAC_CATALOG[idx];
  const prev = ALMANAC_CATALOG[(idx - 1 + ALMANAC_CATALOG.length) % ALMANAC_CATALOG.length];
  const next = ALMANAC_CATALOG[(idx + 1) % ALMANAC_CATALOG.length];

  const mdPath = path.join(process.cwd(), "styles", slug, "DESIGN.md");
  const designMd = await readFile(mdPath, "utf-8");

  return (
    <StyleDetailClient
      item={{ ...entry, designMd }}
      prevItem={{ slug: prev.slug, name: prev.name, num: prev.num }}
      nextItem={{ slug: next.slug, name: next.name, num: next.num }}
    />
  );
}
