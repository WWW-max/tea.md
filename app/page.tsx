import { readFile } from "node:fs/promises";
import path from "node:path";
import { ALMANAC_CATALOG } from "./components/almanac-data";
import { AlmanacClient } from "./components/almanac-client";

export default async function HomePage() {
  const entries = await Promise.all(
    ALMANAC_CATALOG.map(async (entry) => {
      const mdPath = path.join(process.cwd(), "styles", entry.slug, "DESIGN.md");
      const designMd = await readFile(mdPath, "utf-8");
      return { ...entry, designMd };
    })
  );

  return <AlmanacClient entries={entries} />;
}
