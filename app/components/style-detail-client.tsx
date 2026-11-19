"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StyleEntry } from "./almanac-data";
import { useI18n } from "./i18n-context";
import { RichStyleShowcase } from "./rich-style-showcase";
import { compileMixerOutput, type MixerParams } from "./steep-mixer";
import { SOUL_PRIMITIVES } from "@/app/lib/soul-primitives";

interface NavNeighbor {
  slug: string;
  name: string;
  en: string;
  num: string;
}

export function StyleDetailClient({
  item,
  prevItem,
  nextItem,
}: {
  item: StyleEntry;
  prevItem: NavNeighbor;
  nextItem: NavNeighbor;
}) {
  const { locale, toggleLocale } = useI18n();
  const isEn = locale === "en";

  const [fullWidth, setFullWidth] = useState(false);
  const [recipeTab, setRecipeTab] = useState<"mixer" | "registry" | "lore" | "prompt">("mixer");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState("https://tea-md.vercel.app");

  const [grain, setGrain] = useState(45);
  const [depth, setDepth] = useState<MixerParams["depth"]>("balanced");
  const [density, setDensity] = useState<MixerParams["density"]>("standard");
  const [customAccent, setCustomAccent] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<MixerParams["format"]>("design-md");

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const defaultAccent = item.swatches[2]?.[0] ?? item.swatches[1]?.[0] ?? "#ff5500";
  const effectiveAccent = customAccent ?? defaultAccent;

  const mixerOutput = useMemo(() => {
    return compileMixerOutput(item, {
      grain,
      depth,
      density,
      accent: effectiveAccent,
      format: exportFormat,
      locale,
    });
  }, [item, grain, depth, density, effectiveAccent, exportFormat, locale]);

  const copyWithFeedback = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1400);
  };

  const downloadCompiledFile = () => {
    const ext =
      exportFormat === "tailwind-css"
        ? `${item.slug}-tokens.css`
        : exportFormat === "agent-rules"
          ? `.cursorrules-${item.slug}`
          : `DESIGN-${item.slug}.md`;
    const blob = new Blob([mixerOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ext;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stagePadClass =
    density === "compact" ? "p-3" : density === "airy" ? "p-7 md:p-9" : "p-4 md:p-6";

  const prim = SOUL_PRIMITIVES[item.slug];
  const activePrompt = isEn ? item.promptEn : item.prompt;
  const activeDonts = isEn ? item.dontsEn : item.donts;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-5">
      {/* 详情页顶部返回与切换导航 */}
      <header className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:opacity-90 transition"
          >
            {isEn ? "← All Blends" : "← 返回全部风格画廊"}
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs bg-[var(--primary)] text-[var(--primary-foreground)]">
              {item.num}
            </span>
            <h1 className="text-base md:text-lg font-bold tracking-tight">
              {isEn ? item.en : item.name}
            </h1>
            <span className="text-xs text-[var(--muted-foreground)] hidden sm:inline">
              {isEn ? `${item.name} · ${item.catEn}` : `${item.en} · ${item.cat}`}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setFullWidth((f) => !f)}
            className="px-2.5 py-1.5 rounded-lg bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] cursor-pointer font-medium"
          >
            {fullWidth
              ? isEn
                ? "◫ Show Inspector"
                : "◫ 展开右侧调配栏"
              : isEn
                ? "⛶ Full-Width Demo"
                : "⛶ 全宽沉浸预览"}
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            className="px-2.5 py-1.5 rounded-lg font-mono font-semibold bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] cursor-pointer"
          >
            {isEn ? "中文 / EN" : "EN / 中文"}
          </button>
          <button
            type="button"
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-2.5 py-1.5 rounded-lg bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] cursor-pointer"
          >
            ☀/🌙
          </button>
          <Link
            href={`/styles/${prevItem.slug}`}
            className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition"
          >
            ‹ {prevItem.num} {isEn ? prevItem.en : prevItem.name}
          </Link>
          <Link
            href={`/styles/${nextItem.slug}`}
            className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition"
          >
            {nextItem.num} {isEn ? nextItem.en : nextItem.name} ›
          </Link>
        </div>
      </header>

      {/* 主体：左 8 栏完整丰富样板页面 + 右 4 栏参数化调配与提示词面板 */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <section
          className={`${
            fullWidth ? "lg:col-span-12" : "lg:col-span-8"
          } bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden`}
        >
          <div className="px-4 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {isEn ? "Interactive Full Specimen Showcase" : "完整交互样板间（含核心装置、控件表单与卡片矩阵）"}
              </span>
              <span
                className="w-3 h-3 rounded-full border border-black/20"
                style={{ backgroundColor: effectiveAccent }}
              />
            </div>
            <span className="font-mono text-[var(--muted-foreground)]">
              styles/{item.slug}/DESIGN.md
            </span>
          </div>

          <div
            className={`tea-mixer-stage ${stagePadClass} bg-[var(--background)]`}
            style={
              {
                "--tea-grain-alpha": (grain / 600).toFixed(3),
                "--tea-accent": effectiveAccent,
              } as React.CSSProperties
            }
          >
            <div
              style={{
                transform:
                  depth === "heavy"
                    ? "scale(1.005)"
                    : depth === "subtle"
                      ? "scale(0.995)"
                      : "none",
                transition: "transform 160ms ease",
              }}
            >
              <RichStyleShowcase slug={item.slug} />
            </div>
          </div>

          <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--card)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <code className="font-mono text-[var(--muted-foreground)] truncate">
              npx shadcn@latest add {origin}/r/{item.slug}.json
            </code>
            <button
              type="button"
              onClick={() =>
                copyWithFeedback(
                  `npx shadcn@latest add ${origin}/r/${item.slug}.json`,
                  "cli"
                )
              }
              className="px-2.5 py-1 rounded-md font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] shrink-0 cursor-pointer"
            >
              {copiedKey === "cli"
                ? isEn
                  ? "✓ CLI Copied"
                  : "✓ 已复制安装命令"
                : isEn
                  ? "⚡ Copy shadcn CLI"
                  : "⚡ 复制 shadcn 直装命令"}
            </button>
          </div>
        </section>

        {/* 右栏：参数化茶方调配台 & 词条检视器 */}
        <aside
          className={`${
            fullWidth ? "lg:col-span-12" : "lg:col-span-4 lg:sticky lg:top-4"
          } bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col`}
        >
          <div className="grid grid-cols-4 border-b border-[var(--border)] text-xs font-medium">
            {(
              [
                ["mixer", isEn ? "🎛️ Mixer" : "🎛️ 调配器"],
                ["registry", isEn ? "🧩 Primitives" : "🧩 灵魂原件"],
                ["lore", isEn ? "📖 Origin" : "📖 溯源色板"],
                ["prompt", isEn ? "⚡ Prompt" : "⚡ 短指令"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setRecipeTab(id)}
                className={`py-3 px-2 text-center border-b-2 transition cursor-pointer ${
                  recipeTab === id
                    ? "border-[var(--primary)] text-[var(--foreground)] font-semibold"
                    : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {recipeTab === "mixer" && (
            <div className="p-4 space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] space-y-3">
                <label className="block space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>{isEn ? "Surface Grain Intensity" : "肌理噪点浓度 (Surface Grain)"}</span>
                    <span className="font-mono">{grain}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={grain}
                    onChange={(e) => setGrain(Number(e.target.value))}
                    className="w-full accent-[var(--primary)]"
                  />
                </label>

                <div className="space-y-1">
                  <div className="font-medium">
                    {isEn ? "Tactile Depth Profile" : "物理拟物强度 (Tactile Depth)"}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        ["subtle", isEn ? "Subtle" : "克制"],
                        ["balanced", isEn ? "Balanced" : "均衡"],
                        ["heavy", isEn ? "Heavy" : "重度"],
                      ] as const
                    ).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDepth(val)}
                        className={`py-1.5 px-2 rounded border font-medium cursor-pointer ${
                          depth === val
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                            : "border-[var(--border)] bg-[var(--card)]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-7 space-y-1">
                    <div className="font-medium">{isEn ? "Density" : "留白密度"}</div>
                    <div className="grid grid-cols-3 gap-1">
                      {(
                        [
                          ["compact", isEn ? "Tight" : "紧凑"],
                          ["standard", isEn ? "Normal" : "标准"],
                          ["airy", isEn ? "Airy" : "疏朗"],
                        ] as const
                      ).map(([val, label]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setDensity(val)}
                          className={`py-1 rounded border cursor-pointer ${
                            density === val
                              ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]"
                              : "border-[var(--border)] bg-[var(--card)]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{isEn ? "Accent" : "点缀色"}</span>
                      {customAccent && (
                        <button
                          type="button"
                          onClick={() => setCustomAccent(null)}
                          className="text-[var(--muted-foreground)] underline cursor-pointer"
                        >
                          {isEn ? "Reset" : "重置"}
                        </button>
                      )}
                    </div>
                    <label className="flex items-center gap-1.5 px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)] cursor-pointer">
                      <input
                        type="color"
                        value={effectiveAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        className="w-4 h-4 border-0 p-0 bg-transparent cursor-pointer"
                      />
                      <span className="font-mono truncate">{effectiveAccent}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
                    {(
                      [
                        ["design-md", "DESIGN.md"],
                        ["tailwind-css", "CSS"],
                        ["agent-rules", "Rules"],
                      ] as const
                    ).map(([fmt, label]) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setExportFormat(fmt)}
                        className={`px-2.5 py-1 text-xs font-mono cursor-pointer ${
                          exportFormat === fmt
                            ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold"
                            : "bg-[var(--background)] text-[var(--muted-foreground)]"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => copyWithFeedback(mixerOutput, "mixer")}
                      className="px-2.5 py-1 rounded-md font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] cursor-pointer"
                    >
                      {copiedKey === "mixer"
                        ? isEn
                          ? "✓ Copied"
                          : "✓ 已复制"
                        : isEn
                          ? "📋 Copy"
                          : "📋 复制"}
                    </button>
                    <button
                      type="button"
                      onClick={downloadCompiledFile}
                      className="px-2.5 py-1 rounded-md font-medium bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer"
                    >
                      {isEn ? "⬇ Save" : "⬇ 导出"}
                    </button>
                  </div>
                </div>

                <pre className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {mixerOutput}
                </pre>
              </div>
            </div>
          )}

          {recipeTab === "registry" && prim && (
            <div className="p-4 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[var(--foreground)]">
                    {prim.componentName}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--secondary)] font-mono text-[11px]">
                    registry:block
                  </span>
                </div>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {isEn ? prim.summaryEn : prim.summary}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[var(--muted-foreground)] truncate">
                  components/tea/{prim.fileName}
                </span>
                <button
                  type="button"
                  onClick={() => copyWithFeedback(prim.code, "prim")}
                  className="px-2.5 py-1 rounded-md font-medium bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer shrink-0"
                >
                  {copiedKey === "prim"
                    ? isEn
                      ? "✓ Copied"
                      : "✓ 已复制"
                    : isEn
                      ? "📋 Copy TSX"
                      : "📋 复制 TSX"}
                </button>
              </div>

              <pre className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                {prim.code}
              </pre>
            </div>
          )}

          {recipeTab === "lore" && (
            <div className="p-4 space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  {isEn ? "Origin & Material Reference" : "美学溯源 (Origin & Reference)"}
                </div>
                <p className="leading-relaxed">{isEn ? item.originEn : item.origin}</p>
              </div>

              <div className="space-y-1.5">
                <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  {isEn ? "Best Use Cases" : "最佳适用场景 (Best For)"}
                </div>
                <p className="leading-relaxed">{isEn ? item.bestForEn : item.bestFor}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                    {isEn ? "Material Swatches (Click to Copy)" : "核心材质色板 (点击复制 HEX)"}
                  </span>
                  {copiedKey?.startsWith("#") && (
                    <span className="text-xs font-mono text-[var(--primary)]">
                      ✓ {copiedKey}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.swatches.map(([hex, zhLbl, enLbl]) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => copyWithFeedback(hex, hex)}
                      className="flex items-center gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--secondary)] text-left transition cursor-pointer"
                    >
                      <span
                        className="w-5 h-5 rounded border border-black/20 shrink-0"
                        style={{ background: hex }}
                      />
                      <span className="truncate">
                        <strong className="font-mono block">{hex}</strong>
                        <span className="text-[var(--muted-foreground)]">
                          {isEn ? enLbl : zhLbl}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-[var(--border)]">
                <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  {isEn ? "Anti-Slop Guardrails (DON'Ts)" : "Anti-Slop 禁忌护栏 (严禁 AI 踩坑)"}
                </div>
                <ul className="space-y-1.5">
                  {activeDonts.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span>❌</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {recipeTab === "prompt" && (
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[var(--muted-foreground)]">
                  {isEn
                    ? "Paste directly into Claude / ChatGPT / v0 / Cursor:"
                    : "直接粘贴至 Claude / ChatGPT / v0 / Cursor："}
                </span>
                <button
                  type="button"
                  onClick={() => copyWithFeedback(activePrompt, "prompt")}
                  className="px-3 py-1.5 rounded-lg font-medium bg-[var(--primary)] text-[var(--primary-foreground)] transition cursor-pointer shrink-0"
                >
                  {copiedKey === "prompt"
                    ? isEn
                      ? "✓ Copied!"
                      : "✓ 已复制！"
                    : isEn
                      ? "📋 Copy"
                      : "📋 复制"}
                </button>
              </div>
              <pre className="p-3.5 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
                {activePrompt}
              </pre>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
