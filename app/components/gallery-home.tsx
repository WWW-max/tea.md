"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type StyleEntry } from "./almanac-data";
import { useI18n } from "./i18n-context";
import { SandboxStage } from "./sandbox-stage";

export function GalleryHome({ entries }: { entries: StyleEntry[] }) {
  const { locale, toggleLocale } = useI18n();
  const isEn = locale === "en";

  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [origin, setOrigin] = useState("https://tea-md.vercel.app");

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((item) => {
      const matchCat = category === "all" || item.cat === category;
      const matchQuery =
        !q ||
        `${item.name} ${item.en} ${item.slug} ${item.origin} ${item.originEn} ${item.bestFor} ${item.bestForEn}`
          .toLowerCase()
          .includes(q);
      return matchCat && matchQuery;
    });
  }, [entries, category, query]);

  const copyText = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-10 space-y-8">
      {/* 极简首屏：仅保留右上角轻量工具与醒目的标题 + 一句话 Slogan */}
      <header className="space-y-6">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] cursor-pointer"
            title="Switch Language / 切换中英文"
          >
            {isEn ? "中文 / EN" : "EN / 中文"}
          </button>
          <button
            type="button"
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] cursor-pointer"
          >
            {isEn ? "☀/🌙 Theme" : "☀/🌙 明暗"}
          </button>
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3 py-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            🍵 TEA.md
          </h1>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] font-medium">
            {isEn
              ? "Make your product look crafted, not AI-generated."
              : "告别千篇一律的「AI 味」，让你的产品外观拥有真实质感。"}
          </p>
        </div>
      </header>

      {/* 画廊次级筛选与搜索条 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)]">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const on = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                  on
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--card)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:opacity-90"
                }`}
              >
                {isEn ? c.en : c.zh}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isEn
              ? "Search styles..."
              : "搜索风格..."
          }
          className="w-full sm:w-56 px-3 py-1.5 rounded-lg text-xs bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]"
        />
      </div>

      {/* 所有风格卡片平铺画廊 */}
      {filtered.length === 0 ? (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-10 text-center text-sm text-[var(--muted-foreground)]">
          {isEn
            ? "No matching aesthetic blends found. Try another keyword."
            : "未找到匹配的美学词条，请尝试其他搜索关键词。"}
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div
              key={item.slug}
              className="group bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link href={`/styles/${item.slug}`} className="block flex-1">
                <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded font-mono text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)] shrink-0">
                      {item.num}
                    </span>
                    <h2 className="text-sm font-semibold truncate">
                      {isEn ? item.en : item.name}
                    </h2>
                    <span className="text-xs text-[var(--muted-foreground)] truncate hidden sm:inline">
                      {isEn ? item.name : item.en}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--muted-foreground)] shrink-0">
                    {isEn ? item.catEn : item.cat}
                  </span>
                </div>

                <div className="p-4 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
                  <div className="pointer-events-none select-none">
                    <SandboxStage slug={item.slug} />
                  </div>
                </div>
              </Link>

              <div className="px-4 py-3 flex items-center justify-between gap-3 text-xs bg-[var(--card)]">
                <div className="flex items-center gap-1.5">
                  {item.swatches.map(([hex, zhLbl, enLbl]) => (
                    <span
                      key={hex}
                      title={`${isEn ? enLbl : zhLbl}: ${hex}`}
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(isEn ? item.promptEn : item.prompt, item.slug)}
                    className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--secondary)] font-medium transition cursor-pointer"
                  >
                    {copiedKey === item.slug
                      ? isEn
                        ? "✓ Copied"
                        : "✓ 已复制"
                      : isEn
                        ? "📋 Copy Prompt"
                        : "📋 复制 Prompt"}
                  </button>
                  <Link
                    href={`/styles/${item.slug}`}
                    className="px-3 py-1 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] font-medium transition group-hover:opacity-90"
                  >
                    {isEn ? "Inspect & Mix →" : "进入详情 & 调参 →"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 底部远程 MCP Server 接入栏 */}
      <footer className="bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded font-mono font-semibold bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            MCP SERVER
          </span>
          <span className="text-[var(--muted-foreground)]">
            {isEn
              ? "Connect Cursor / Claude Code / Antigravity to fetch recipes & primitives:"
              : "支持 Cursor / Claude Code / Antigravity 远程检索美学配方与原件："}
          </span>
          <code className="font-mono text-[var(--foreground)]">{origin}/api/mcp</code>
        </div>
        <button
          type="button"
          onClick={() =>
            copyText(
              JSON.stringify(
                { mcpServers: { "tea-md": { url: `${origin}/api/mcp` } } },
                null,
                2
              ),
              "mcp"
            )
          }
          className="px-3 py-1.5 rounded-lg font-medium bg-[var(--primary)] text-[var(--primary-foreground)] cursor-pointer transition"
        >
          {copiedKey === "mcp"
            ? isEn
              ? "✓ Copied mcpServers JSON"
              : "✓ 已复制 mcpServers 配置"
            : isEn
              ? "🔌 Copy Remote MCP Config"
              : "🔌 复制远程 MCP 配置 JSON"}
        </button>
      </footer>
    </div>
  );
}
