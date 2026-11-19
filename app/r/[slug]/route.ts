import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { ALMANAC_CATALOG } from "@/app/components/almanac-data";
import { SOUL_PRIMITIVES } from "@/app/lib/soul-primitives";

export const dynamic = "force-static";

export function generateStaticParams() {
  return ALMANAC_CATALOG.flatMap((item) => [
    { slug: item.slug },
    { slug: `${item.slug}.json` },
  ]);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/\.json$/, "");

  const entry = ALMANAC_CATALOG.find((x) => x.slug === slug);
  const prim = SOUL_PRIMITIVES[slug];
  if (!entry || !prim) {
    return NextResponse.json({ error: "Style not found" }, { status: 404 });
  }

  const mdPath = path.join(process.cwd(), "styles", slug, "DESIGN.md");
  const designMd = await readFile(mdPath, "utf-8");

  return NextResponse.json(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: entry.slug,
      type: "registry:block",
      title: `${entry.en} (${entry.name})`,
      description: prim.summary,
      files: [
        {
          path: `components/tea/${prim.fileName}`,
          type: "registry:component",
          target: `components/tea/${prim.fileName}`,
          content: prim.code,
        },
        {
          path: `styles/${entry.slug}/DESIGN.md`,
          type: "registry:file",
          target: "~/DESIGN.md",
          content: designMd,
        },
      ],
      docs: `Installed TEA.md [${entry.slug}]: ~/DESIGN.md + components/tea/${prim.fileName}`,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
