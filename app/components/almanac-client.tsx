"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type StyleEntry } from "./almanac-data";
import { SandboxStage } from "./sandbox-stage";
import { compileMixerOutput, DEPTH_SCALE, type MixerParams } from "./steep-mixer";
import { SOUL_PRIMITIVES } from "@/app/lib/soul-primitives";

export function AlmanacClient({ entries }: { entries: StyleEntry[] }) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(entries[0]?.slug ?? "tactile-synth");
  const [recipeTab, setRecipeTab] = useState<"mixer" | "registry" | "lore" | "prompt">("mixer");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState("https://tea-md.vercel.app");

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  // Steep Mixer 参数状态
  const [grain, setGrain] = useState(45);
  const [depth, setDepth] = useState<MixerParams["depth"]>("balanced");
  const [density, setDensity] = useState<MixerParams["density"]>("standard");
  const [customAccent, setCustomAccent] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<MixerParams["format"]>("design-md");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((item) => {
      const matchCat = category === "all" || item.cat === category;
      const matchQuery =
        !q ||
        `${item.name} ${item.en} ${item.slug} ${item.origin} ${item.prompt}`
          .toLowerCase()
          .includes(q);
      return matchCat && matchQuery;
    });
  }, [entries, category, query]);

  const activeItem = useMemo(() => {
    return filtered.find((x) => x.slug === selectedSlug) ?? filtered[0] ?? entries[0];
  }, [filtered, selectedSlug, entries]);

  const defaultAccent = activeItem?.swatches[2]?.[0] ?? activeItem?.swatches[1]?.[0] ?? "#ff5500";
  const effectiveAccent = customAccent ?? defaultAccent;

  const mixerOutput = useMemo(() => {
    if (!activeItem) return "";
    return compileMixerOutput(activeItem, {
      grain,
      depth,
      density,
      accent: effectiveAccent,
      format: exportFormat,
    });
  }, [activeItem, grain, depth, density, effectiveAccent, exportFormat]);

  const handleSelectStyle = (slug: string) => {
    setSelectedSlug(slug);
    setCustomAccent(null);
  };

  const copyWithFeedback = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1400);
  };

  const downloadCompiledFile = () => {
    if (!activeItem) return;
    const ext =
      exportFormat === "tailwind-css"
        ? `${activeItem.slug}-tokens.css`
        : exportFormat === "agent-rules"
          ? `.cursorrules-${activeItem.slug}`
          : `DESIGN-${activeItem.slug}.md`;
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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-5">
      {/* 顶部检索栏 */}
      <header className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 md:p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[var(--primary)] text-[var(--primary-foreground)]">
                T.E.A. // v0.2
              </span>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">
                🍵 TEA.md · 触感与编辑美学引擎
              </h1>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              No more instant AI slop. 左看<strong>实时物理交互预览</strong>，右用{" "}
              <strong>Steep Mixer 动态调参编译 DESIGN.md / CSS Tokens</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => document.documentElement.classList.toggle("dark")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] shrink-0 cursor-pointer"
            >
              ☀/🌙 外框明暗
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索概念：乌丝栏 / GC16 / Riso / 博朗..."
              className="w-full sm:w-64 px-3 py-1.5 rounded-lg text-xs bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const on = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  on
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:opacity-90"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* 12 词条导航网格 */}
        {filtered.length === 0 ? (
          <div className="text-xs text-[var(--muted-foreground)] py-2">
            未找到匹配的美学词条，请尝试其他关键词。
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-1">
            {filtered.map((item) => {
              const selected = item.slug === activeItem.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => handleSelectStyle(item.slug)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition flex flex-col justify-between gap-1.5 cursor-pointer ${
                    selected
                      ? "border-[var(--primary)] bg-[var(--secondary)] text-[var(--foreground)] shadow-sm"
                      : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[var(--muted-foreground)]">{item.num}</span>
                    <div className="flex items-center gap-1">
                      {item.swatches.map(([hex]) => (
                        <span
                          key={hex}
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ background: hex }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="font-semibold truncate">{item.name}</div>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* 双栏工作台 */}
      {activeItem && (
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* 左栏：实时交互沙盒 */}
          <section className="lg:col-span-7 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                  {activeItem.num}
                </span>
                <h2 className="text-sm font-semibold">{activeItem.name}</h2>
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: effectiveAccent }}
                  title={`当前强调色 ${effectiveAccent}`}
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)]">
                <span>噪点 {grain}%</span>
                <span>·</span>
                <span>键程 {Math.max(1, Math.round(3 * DEPTH_SCALE[depth]))}px</span>
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
                <SandboxStage slug={activeItem.slug} />
              </div>
            </div>

            {/* shadcn Registry 一行命令直装栏 */}
            <div className="px-4 py-2.5 border-t border-[var(--border)] bg-[var(--card)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <code className="font-mono text-[var(--muted-foreground)] truncate">
                npx shadcn@latest add {origin}/r/{activeItem.slug}.json
              </code>
              <button
                type="button"
                onClick={() =>
                  copyWithFeedback(
                    `npx shadcn@latest add ${origin}/r/${activeItem.slug}.json`,
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

            {/* Tab 1: 参数化实时编译器 (Steep Mixer) */}
            {recipeTab === "mixer" && (
              <div className="p-4 space-y-4 text-xs">
                {/* 4 项物理滑块控制 */}
                <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] space-y-3">
                  {/* 颗粒浓度 */}
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

                  {/* 拟物深度 */}
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

                  {/* 版面密度与主色 */}
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

                {/* 输出格式切换器 + 复制/下载 */}
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

            {/* Tab 2: 美学溯源与色板 */}
            {recipeTab === "lore" && (
              <div className="p-4 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                    美学溯源 (Origin & Reference)
                  </div>
                  <p className="leading-relaxed">{activeItem.origin}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                    最佳适用场景 (Best For)
                  </div>
                  <p className="leading-relaxed">{activeItem.bestFor}</p>
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
                    {activeItem.swatches.map(([hex, label]) => (
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
                    {activeItem.donts.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>❌</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: 灵魂原件 (shadcn Registry) */}
            {recipeTab === "registry" && SOUL_PRIMITIVES[activeItem.slug] && (
              <div className="p-4 space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[var(--foreground)]">
                      {SOUL_PRIMITIVES[activeItem.slug].componentName}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--secondary)] font-mono text-[11px]">
                      registry:block
                    </span>
                  </div>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {SOUL_PRIMITIVES[activeItem.slug].summary}
                  </p>
                  <p className="text-[var(--muted-foreground)] pt-1">
                    运行上方 <code className="font-mono">npx shadcn@latest add</code> 将自动向你的工程写入{" "}
                    <code className="font-mono">DESIGN.md</code> 与下列物理原件源码：
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[var(--muted-foreground)]">
                    components/tea/{SOUL_PRIMITIVES[activeItem.slug].fileName}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyWithFeedback(SOUL_PRIMITIVES[activeItem.slug].code, "prim")
                    }
                    className="px-2.5 py-1 rounded-md font-medium bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer"
                  >
                    {copiedKey === "prim" ? "✓ 已复制源码" : "📋 复制 TSX 原件"}
                  </button>
                </div>

                <pre className="p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {SOUL_PRIMITIVES[activeItem.slug].code}
                </pre>
              </div>
            )}

            {/* Tab 3: 纯净短指令 */}
            {recipeTab === "prompt" && (
              <div className="p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[var(--muted-foreground)]">
                    直接粘贴至 Claude / ChatGPT / v0 / Cursor：
                  </span>
                  <button
                    type="button"
                    onClick={() => copyWithFeedback(activeItem.prompt, "prompt")}
                    className="px-3 py-1.5 rounded-lg font-medium bg-[var(--primary)] text-[var(--primary-foreground)] transition cursor-pointer"
                  >
                    {copiedKey === "prompt" ? "✓ 已复制！" : "📋 一键复制 Prompt"}
                  </button>
                </div>
                <pre className="p-3.5 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
                  {activeItem.prompt}
                </pre>
              </div>
            )}
          </aside>
        </main>
      )}
    </div>
  );
}
