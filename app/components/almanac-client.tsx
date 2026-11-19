"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type StyleEntry } from "./almanac-data";
import { SandboxStage } from "./sandbox-stage";

export function AlmanacClient({ entries }: { entries: StyleEntry[] }) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(entries[0]?.slug ?? "tactile-synth");
  const [recipeTab, setRecipeTab] = useState<"lore" | "prompt" | "designmd">("lore");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
    return (
      filtered.find((x) => x.slug === selectedSlug) ??
      filtered[0] ??
      entries[0]
    );
  }, [filtered, selectedSlug, entries]);

  const copyWithFeedback = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1400);
  };

  const downloadDesignMd = () => {
    if (!activeItem?.designMd) return;
    const blob = new Blob([activeItem.designMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DESIGN-${activeItem.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-5">
      {/* 顶部检索栏 */}
      <header className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 md:p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[var(--primary)] text-[var(--primary-foreground)]">
                T.E.A. // v0.1
              </span>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">
                🍵 TEA.md · 触感与编辑美学图鉴
              </h1>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              No more instant AI slop. 左看<strong>实时物理交互 Demo</strong>，右抄{" "}
              <strong>Prompt / DESIGN.md 规范配方</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={toggleTheme}
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
                  onClick={() => setSelectedSlug(item.slug)}
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
                <span className="text-xs font-mono text-[var(--muted-foreground)]">
                  styles/{activeItem.slug}/DESIGN.md
                </span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">🎮 可直接点击交互预览</span>
            </div>
            <div className="p-4 md:p-6 bg-[var(--background)]">
              <SandboxStage slug={activeItem.slug} />
            </div>
          </section>

          {/* 右栏：配方检视器 */}
          <aside className="lg:col-span-5 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden flex flex-col">
            <div className="grid grid-cols-3 border-b border-[var(--border)] text-xs font-medium">
              {(
                [
                  ["lore", "📖 美学词条 & 色板"],
                  ["prompt", "⚡ 短提示词 Prompt"],
                  ["designmd", "📄 DESIGN.md 源码"],
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

            {recipeTab === "designmd" && (
              <div className="p-4 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[var(--muted-foreground)]">
                    读取自 <code className="font-mono">styles/{activeItem.slug}/DESIGN.md</code>：
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyWithFeedback(activeItem.designMd ?? "", "md")}
                      className="px-3 py-1.5 rounded-lg font-medium bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] transition cursor-pointer"
                    >
                      {copiedKey === "md" ? "✓ 已复制！" : "📋 复制全文"}
                    </button>
                    <button
                      type="button"
                      onClick={downloadDesignMd}
                      className="px-3 py-1.5 rounded-lg font-medium bg-[var(--primary)] text-[var(--primary-foreground)] transition cursor-pointer"
                    >
                      ⬇ 下载 DESIGN.md
                    </button>
                  </div>
                </div>
                <pre className="p-3.5 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                  {activeItem.designMd}
                </pre>
              </div>
            )}
          </aside>
        </main>
      )}
    </div>
  );
}
