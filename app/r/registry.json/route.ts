import { NextResponse } from "next/server";
import { ALMANAC_CATALOG } from "@/app/components/almanac-data";
import { SOUL_PRIMITIVES } from "@/app/lib/soul-primitives";

export const dynamic = "force-static";

export async function GET() {
  const items = ALMANAC_CATALOG.map((item) => {
    const prim = SOUL_PRIMITIVES[item.slug];
    return {
      name: item.slug,
      type: "registry:block",
      title: `${item.en} (${item.name})`,
      description: prim?.summary ?? item.origin,
      files: [
        {
          path: `components/tea/${prim?.fileName ?? `${item.slug}.tsx`}`,
          type: "registry:component",
        },
        {
          path: `styles/${item.slug}/DESIGN.md`,
          type: "registry:file",
          target: "~/DESIGN.md",
        },
      ],
    };
  });

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
