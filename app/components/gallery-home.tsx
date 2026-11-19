"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, type StyleEntry } from "./almanac-data";
import { SandboxStage } from "./sandbox-stage";

export function GalleryHome({ entries }: { entries: StyleEntry[] }) {
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
        `${item.name} ${item.en} ${item.slug} ${item.origin} ${item.bestFor}`
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
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* 顶部品牌与全局筛选栏 */}
      <header className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[var(--primary)] text-[var(--primary-foreground)]">
                T.E.A. // v0.2
              </span>
              <h1 className="text-lg md:text-2xl font-bold tracking-tight">
                🍵 TEA.md · 触感与编辑美学图鉴
              </h1>
            </div>
            <p className="text-xs md:text-sm text-[var(--muted-foreground)]">
              No more instant AI slop. 浏览平铺风格样本，点击任意卡片进入<strong>交互沙盒、业务样板间切换与 DESIGN.md 调配台</strong>。
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
              placeholder="搜索风格：乌丝栏 / GC16 / Riso / 博朗..."
              className="w-full sm:w-64 px-3 py-1.5 rounded-lg text-xs bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* 分类筛选胶囊 */}
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
                    : "bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:opacity-90"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 所有风格卡片平铺画廊 */}
      {filtered.length === 0 ? (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-10 text-center text-sm text-[var(--muted-foreground)]">
          未找到匹配的美学词条，请尝试其他搜索关键词。
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <div
              key={item.slug}
              className="group bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* 点击上半部分直接进入对应风格详情页 */}
              <Link href={`/styles/${item.slug}`} className="block flex-1">
                {/* 卡片头 */}
                <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded font-mono text-xs bg-[var(--secondary)] text-[var(--secondary-foreground)] shrink-0">
                      {item.num}
                    </span>
                    <h2 className="text-sm font-semibold truncate">{item.name}</h2>
                    <span className="text-xs text-[var(--muted-foreground)] truncate hidden sm:inline">
                      {item.en}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--muted-foreground)] shrink-0">
                    {item.cat}
                  </span>
                </div>

                {/* 卡片中部：真实材质微缩预览窗（禁用内部指针拦截，确保整卡点击顺畅跳转） */}
                <div className="p-4 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
                  <div className="pointer-events-none select-none">
                    <SandboxStage slug={item.slug} />
                  </div>
                </div>
              </Link>

              {/* 卡片底栏：色板圆点 + 快捷复制 Prompt + 进入详情按钮 */}
              <div className="px-4 py-3 flex items-center justify-between gap-3 text-xs bg-[var(--card)]">
                <div className="flex items-center gap-1.5" title="核心色板">
                  {item.swatches.map(([hex, label]) => (
                    <span
                      key={hex}
                      title={`${label}: ${hex}`}
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(item.prompt, item.slug)}
                    className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--secondary)] font-medium transition cursor-pointer"
                  >
                    {copiedKey === item.slug ? "✓ 已复制" : "📋 复制 Prompt"}
                  </button>
                  <Link
                    href={`/styles/${item.slug}`}
                    className="px-3 py-1 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] font-medium transition group-hover:opacity-90"
                  >
                    进入详情 & 调参 →
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
            支持 Cursor / Claude Code / Antigravity 远程检索美学配方与原件：
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
          {copiedKey === "mcp" ? "✓ 已复制 mcpServers 配置" : "🔌 复制远程 MCP 配置 JSON"}
        </button>
      </footer>
    </div>
  );
}
