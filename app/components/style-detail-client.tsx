"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StyleEntry } from "./almanac-data";
import { BenchmarkScene, type SceneMode } from "./benchmark-scenes";
import { SandboxStage } from "./sandbox-stage";
import { compileMixerOutput, type MixerParams } from "./steep-mixer";
import { SOUL_PRIMITIVES } from "@/app/lib/soul-primitives";

export function StyleDetailClient({
  item,
  prevItem,
  nextItem,
}: {
  item: StyleEntry;
  prevItem: { slug: string; name: string; num: string };
  nextItem: { slug: string; name: string; num: string };
}) {
  const [sceneMode, setSceneMode] = useState<SceneMode>("sandbox");
  const [recipeTab, setRecipeTab] = useState<"mixer" | "registry" | "lore" | "prompt">("mixer");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState("https://tea-md.vercel.app");

  // Steep Mixer 参数状态
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
    });
  }, [item, grain, depth, density, effectiveAccent, exportFormat]);

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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-5">
      {/* 详情页顶部返回与切换导航 */}
      <header className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:opacity-90 transition"
          >
            ← 返回全部风格画廊
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono text-xs bg-[var(--primary)] text-[var(--primary-foreground)]">
              {item.num}
            </span>
            <h1 className="text-base md:text-lg font-bold tracking-tight">{item.name}</h1>
            <span className="text-xs text-[var(--muted-foreground)] hidden sm:inline">
              {item.en} · {item.cat}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
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
            ‹ {prevItem.num} {prevItem.name}
          </Link>
          <Link
            href={`/styles/${nextItem.slug}`}
            className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition"
          >
            {nextItem.num} {nextItem.name} ›
          </Link>
        </div>
      </header>

      {/* 详情双栏工作台 */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左栏：实时交互沙盒 + 3 大业务样板间切换 */}
        <section className="lg:col-span-7 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold">实时交互舞台</span>
              <span
                className="w-3 h-3 rounded-full border border-black/20"
                style={{ backgroundColor: effectiveAccent }}
                title={`当前强调色 ${effectiveAccent}`}
              />
              <span className="font-mono text-[var(--muted-foreground)]">
                styles/{item.slug}/DESIGN.md
              </span>
            </div>

            <div className="flex rounded-lg border border-[var(--border)] overflow-hidden text-xs">
              {(
                [
                  ["sandbox", "🎛️ 物理沙盒"],
                  ["chat", "🤖 AI 对话"],
                  ["dashboard", "📊 数据看板"],
                  ["landing", "📝 产品主页"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSceneMode(m)}
                  className={`px-2.5 py-1 font-medium cursor-pointer transition ${
                    sceneMode === m
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                      : "bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
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
                    ? "scale(1.01)"
                    : depth === "subtle"
                      ? "scale(0.99)"
                      : "none",
                transition: "transform 160ms ease",
              }}
            >
              {sceneMode === "sandbox" ? (
                <SandboxStage slug={item.slug} />
              ) : (
                <BenchmarkScene slug={item.slug} styleName={item.name} mode={sceneMode} />
              )}
            </div>
          </div>

          {/* shadcn Registry 一行命令直装栏 */}
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
              {copiedKey === "cli" ? "✓ 已复制安装命令" : "⚡ 复制 shadcn 直装命令"}
            </button>
          </div>
        </section>

        {/* 右栏：参数化茶方调配台 & 词条检视器 */}
        <aside className="lg:col-span-5 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col">
          <div className="grid grid-cols-4 border-b border-[var(--border)] text-xs font-medium">
            {(
              [
                ["mixer", "🎛️ 调配器"],
                ["registry", "🧩 灵魂原件"],
                ["lore", "📖 溯源色板"],
                ["prompt", "⚡ 短指令"],
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

          {/* Tab 1: 参数化调配器 */}
          {recipeTab === "mixer" && (
            <div className="p-4 space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] space-y-3">
                <label className="block space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>肌理噪点浓度 (Surface Grain)</span>
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
                  <div className="font-medium">物理拟物强度 (Tactile Depth)</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        ["subtle", "克制 (1px)"],
                        ["balanced", "均衡 (3px)"],
                        ["heavy", "重度机械 (5px)"],
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
                  <div className="col-span-8 space-y-1">
                    <div className="font-medium">留白呼吸度 (Density)</div>
                    <div className="grid grid-cols-3 gap-1">
                      {(
                        [
                          ["compact", "紧凑"],
                          ["standard", "标准"],
                          ["airy", "疏朗"],
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

                  <div className="col-span-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">点缀色</span>
                      {customAccent && (
                        <button
                          type="button"
                          onClick={() => setCustomAccent(null)}
                          className="text-[var(--muted-foreground)] underline cursor-pointer"
                        >
                          重置
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
                        ["tailwind-css", "Tailwind CSS"],
                        ["agent-rules", "Cursor Rules"],
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
                      {copiedKey === "mixer" ? "✓ 已复制" : "📋 复制"}
                    </button>
                    <button
                      type="button"
                      onClick={downloadCompiledFile}
                      className="px-2.5 py-1 rounded-md font-medium bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer"
                    >
                      ⬇ 导出文件
                    </button>
                  </div>
                </div>

                <pre className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                  {mixerOutput}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: 灵魂原件 */}
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
                <p className="text-[var(--muted-foreground)] leading-relaxed">{prim.summary}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[var(--muted-foreground)]">
                  components/tea/{prim.fileName}
                </span>
                <button
                  type="button"
                  onClick={() => copyWithFeedback(prim.code, "prim")}
                  className="px-2.5 py-1 rounded-md font-medium bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer"
                >
                  {copiedKey === "prim" ? "✓ 已复制源码" : "📋 复制 TSX 原件"}
                </button>
              </div>

              <pre className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {prim.code}
              </pre>
            </div>
          )}

          {/* Tab 3: 美学溯源与色板 */}
          {recipeTab === "lore" && (
            <div className="p-4 space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  美学溯源 (Origin & Reference)
                </div>
                <p className="leading-relaxed">{item.origin}</p>
              </div>

              <div className="space-y-1.5">
                <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  最佳适用场景 (Best For)
                </div>
                <p className="leading-relaxed">{item.bestFor}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                    核心材质色板 (点击复制 HEX)
                  </span>
                  {copiedKey?.startsWith("#") && (
                    <span className="text-xs font-mono text-[var(--primary)]">
                      ✓ 已复制 {copiedKey}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.swatches.map(([hex, label]) => (
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
                        <span className="text-[var(--muted-foreground)]">{label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-[var(--border)]">
                <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  Anti-Slop 禁忌护栏 (严禁 AI 踩坑)
                </div>
                <ul className="space-y-1.5">
                  {item.donts.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span>❌</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: 纯净短指令 */}
          {recipeTab === "prompt" && (
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[var(--muted-foreground)]">
                  直接粘贴至 Claude / ChatGPT / v0 / Cursor：
                </span>
                <button
                  type="button"
                  onClick={() => copyWithFeedback(item.prompt, "prompt")}
                  className="px-3 py-1.5 rounded-lg font-medium bg-[var(--primary)] text-[var(--primary-foreground)] transition cursor-pointer"
                >
                  {copiedKey === "prompt" ? "✓ 已复制！" : "📋 一键复制 Prompt"}
                </button>
              </div>
              <pre className="p-3.5 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
                {item.prompt}
              </pre>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
