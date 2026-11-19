import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StyleDetailClient } from "@/app/components/style-detail-client";
import { loadAllStyles } from "@/app/lib/styles-loader";

export async function generateStaticParams() {
  const all = await loadAllStyles();
  return all.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const all = await loadAllStyles();
  const item = all.find((x) => x.slug === slug);
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
  const all = await loadAllStyles();
  const idx = all.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();

  const entry = all[idx];
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];

  return (
    <StyleDetailClient
      item={entry}
      prevItem={{ slug: prev.slug, name: prev.name, en: prev.en, num: prev.num }}
      nextItem={{ slug: next.slug, name: next.name, en: next.en, num: next.num }}
    />
  );
}
