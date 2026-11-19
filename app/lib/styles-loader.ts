import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { StyleEntry, StylePrimitiveInfo, StyleTokens } from "@/app/components/almanac-data";

interface RawMetaJson {
  order?: number;
  slug?: string;
  name: string;
  en: string;
  cat: StyleEntry["cat"];
  catEn: StyleEntry["catEn"];
  origin: string;
  originEn: string;
  bestFor: string;
  bestForEn: string;
  swatches: [string, string, string][];
  donts: string[];
  dontsEn: string[];
  prompt: string;
  promptEn: string;
  tokens?: StyleTokens;
  primitive?: {
    componentName?: string;
    summary?: string;
    summaryEn?: string;
  };
}

function buildFallbackPrimitive(slug: string, meta: RawMetaJson): StylePrimitiveInfo {
  const pascal = slug
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");
  const compName = meta.primitive?.componentName || `${pascal}Surface`;
  const bg = meta.swatches[0]?.[0] ?? "#f5f5f0";
  const ink = meta.swatches[1]?.[0] ?? "#18181b";
  const accent = meta.swatches[2]?.[0] ?? ink;
  const radius = meta.tokens?.radius ?? "8px";
  const bw = meta.tokens?.borderWidth ?? "1.5px";
  const shadow =
    meta.tokens?.shadow === "hard"
      ? `4px 4px 0 ${ink}`
      : meta.tokens?.shadow === "soft"
        ? "0 8px 20px rgba(0,0,0,0.12)"
        : "none";

  const code = `import * as React from "react";

export function ${pascal}Surface({
  title,
  badge,
  children,
}: {
  title?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: "${bg}",
        color: "${ink}",
        borderRadius: "${radius}",
        border: "${bw} solid ${ink}",
        boxShadow: "${shadow}",
      }}
      className="p-5 space-y-3"
    >
      {(title || badge) && (
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-current/20">
          {title && <h3 className="text-sm font-bold tracking-tight">{title}</h3>}
          {badge && (
            <span
              style={{ backgroundColor: "${accent}", color: "${bg}" }}
              className="px-2 py-0.5 text-xs font-mono font-bold"
            >
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
`;

  return {
    componentName: compName,
    fileName: `${slug}-primitives.tsx`,
    summary: meta.primitive?.summary || `${meta.name} 主题基础材质容器原件`,
    summaryEn: meta.primitive?.summaryEn || `Base material surface primitive for ${meta.en}`,
    code,
  };
}

/**
 * 自动扫描 styles/<slug>/ 目录发现全部内置与社区贡献的风格（零中心化手工注册）
 */
export const loadAllStyles = cache(async (): Promise<StyleEntry[]> => {
  const stylesRoot = path.join(process.cwd(), "styles");
  const dirents = await readdir(stylesRoot, { withFileTypes: true });

  const loaded: Omit<StyleEntry, "num">[] = [];

  for (const d of dirents) {
    if (!d.isDirectory() || d.name.startsWith(".")) continue;
    const slug = d.name;
    const folder = path.join(stylesRoot, slug);
    const metaPath = path.join(folder, "meta.json");
    const mdPath = path.join(folder, "DESIGN.md");

    if (!existsSync(metaPath) || !existsSync(mdPath)) continue;

    const [rawMetaStr, designMd] = await Promise.all([
      readFile(metaPath, "utf-8"),
      readFile(mdPath, "utf-8"),
    ]);

    const meta = JSON.parse(rawMetaStr) as RawMetaJson;

    const primPath = path.join(folder, "primitive.tsx");
    let primitive: StylePrimitiveInfo;
    if (existsSync(primPath)) {
      const code = await readFile(primPath, "utf-8");
      primitive = {
        componentName: meta.primitive?.componentName || `${slug}Primitive`,
        fileName: `${slug}-primitives.tsx`,
        summary: meta.primitive?.summary || meta.origin,
        summaryEn: meta.primitive?.summaryEn || meta.originEn,
        code,
      };
    } else {
      primitive = buildFallbackPrimitive(slug, meta);
    }

    const previewHtmlPath = path.join(folder, "preview.html");
    const customPreviewHtml = existsSync(previewHtmlPath)
      ? await readFile(previewHtmlPath, "utf-8")
      : undefined;

    loaded.push({
      order: meta.order,
      slug,
      name: meta.name,
      en: meta.en,
      cat: meta.cat,
      catEn: meta.catEn,
      origin: meta.origin,
      originEn: meta.originEn,
      bestFor: meta.bestFor,
      bestForEn: meta.bestForEn,
      swatches: meta.swatches,
      donts: meta.donts,
      dontsEn: meta.dontsEn,
      prompt: meta.prompt,
      promptEn: meta.promptEn,
      tokens: meta.tokens,
      designMd,
      primitive,
      customPreviewHtml,
    });
  }

  // 先按显式 order 排序，社区未填 order 的新风格自动排在后面按字母序排列
  loaded.sort((a, b) => {
    const oa = a.order ?? 9999;
    const ob = b.order ?? 9999;
    if (oa !== ob) return oa - ob;
    return a.slug.localeCompare(b.slug);
  });

  return loaded.map((item, idx) => ({
    ...item,
    num: String(idx + 1).padStart(2, "0"),
  }));
});
