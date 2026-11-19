import { NextResponse } from "next/server";
import { loadAllStyles } from "@/app/lib/styles-loader";

export const dynamic = "force-static";

export async function GET() {
  const all = await loadAllStyles();
  const items = all.map((item) => ({
    name: item.slug,
    type: "registry:block",
    title: `${item.en} (${item.name})`,
    description: item.primitive?.summaryEn ?? item.originEn,
    files: [
      {
        path: `components/tea/${item.primitive?.fileName ?? `${item.slug}-primitives.tsx`}`,
        type: "registry:component",
      },
      {
        path: `styles/${item.slug}/DESIGN.md`,
        type: "registry:file",
        target: "~/DESIGN.md",
      },
    ],
  }));

  return NextResponse.json(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "tea-md",
      homepage: "https://github.com/WWW-max/tea.md",
      items,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
