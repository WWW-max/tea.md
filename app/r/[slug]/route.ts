import { NextResponse } from "next/server";
import { loadAllStyles } from "@/app/lib/styles-loader";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const all = await loadAllStyles();
  return all.flatMap((item) => [
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

  const all = await loadAllStyles();
  const entry = all.find((x) => x.slug === slug);
  if (!entry || !entry.primitive) {
    return NextResponse.json({ error: "Style not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: entry.slug,
      type: "registry:block",
      title: `${entry.en} (${entry.name})`,
      description: entry.primitive.summaryEn,
      files: [
        {
          path: `components/tea/${entry.primitive.fileName}`,
          type: "registry:component",
          target: `components/tea/${entry.primitive.fileName}`,
          content: entry.primitive.code,
        },
        {
          path: `styles/${entry.slug}/DESIGN.md`,
          type: "registry:file",
          target: "~/DESIGN.md",
          content: entry.designMd ?? "",
        },
      ],
      docs: `Installed TEA.md [${entry.slug}]: ~/DESIGN.md + components/tea/${entry.primitive.fileName}`,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
