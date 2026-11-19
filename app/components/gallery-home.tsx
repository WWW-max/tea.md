"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, Plug, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CATEGORIES, type StyleEntry } from "./almanac-data";
import { useI18n } from "./i18n-context";
import { SandboxStage } from "./sandbox-stage";
import { SiteControls } from "./site-controls";

export function GalleryHome({ entries }: { entries: StyleEntry[] }) {
  const { locale } = useI18n();
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
      {/* 极简首屏：右上角 shadcn 语言/主题控件 + 居中大标题与一句话 Slogan */}
      <header className="space-y-6">
        <div className="flex items-center justify-end">
          <SiteControls />
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-3 py-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">TEA.md</h1>
          <p className="text-base md:text-lg text-muted-foreground font-medium">
            {isEn
              ? "Make your product look crafted, not AI-generated."
              : "告别千篇一律的「AI 味」，让你的产品外观拥有真实质感。"}
          </p>
        </div>
      </header>

      {/* 画廊筛选与搜索栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => {
            const on = category === c.id;
            return (
              <Button
                key={c.id}
                variant={on ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(c.id)}
              >
                {isEn ? c.en : c.zh}
              </Button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="size-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? "Search styles..." : "搜索风格..."}
            className="pl-8"
          />
        </div>
      </div>

      {/* 所有风格卡片平铺画廊 */}
      {filtered.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">
          {isEn
            ? "No matching aesthetic blends found. Try another keyword."
            : "未找到匹配的美学词条，请尝试其他搜索关键词。"}
        </Card>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => (
            <Card
              key={item.slug}
              className="group overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-md"
            >
              <Link href={`/styles/${item.slug}`} className="block flex-1">
                <CardHeader className="border-b border-border flex flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="secondary" className="font-mono shrink-0">
                      {item.num}
                    </Badge>
                    <h2 className="text-sm font-semibold truncate">
                      {isEn ? item.en : item.name}
                    </h2>
                    <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                      {isEn ? item.name : item.en}
                    </span>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {isEn ? item.catEn : item.cat}
                  </Badge>
                </CardHeader>

                <CardContent className="bg-background border-b border-border relative overflow-hidden">
                  <div className="pointer-events-none select-none">
                    <SandboxStage slug={item.slug} />
                  </div>
                </CardContent>
              </Link>

              <CardFooter className="justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {item.swatches.map(([hex, zhLbl, enLbl]) => (
                    <span
                      key={hex}
                      title={`${isEn ? enLbl : zhLbl}: ${hex}`}
                      className="size-4 rounded-full border border-black/20"
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyText(isEn ? item.promptEn : item.prompt, item.slug)}
                  >
                    {copiedKey === item.slug ? (
                      <>
                        <Check className="size-3.5" />
                        <span>{isEn ? "Copied" : "已复制"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>{isEn ? "Copy Prompt" : "复制 Prompt"}</span>
                      </>
                    )}
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/styles/${item.slug}`}>
                      <span>{isEn ? "Inspect" : "查看详情"}</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}

      {/* 底部远程 MCP Server 接入卡片 */}
      <Card className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-mono gap-1">
            <Plug className="size-3" />
            MCP SERVER
          </Badge>
          <span className="text-muted-foreground">
            {isEn
              ? "Connect Cursor / Claude Code / Antigravity to fetch recipes & primitives:"
              : "支持 Cursor / Claude Code / Antigravity 远程检索美学配方与原件："}
          </span>
          <code className="font-mono text-foreground">{origin}/api/mcp</code>
        </div>
        <Button
          size="sm"
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
        >
          {copiedKey === "mcp" ? (
            <>
              <Check className="size-3.5" />
              <span>{isEn ? "Copied mcpServers" : "已复制配置"}</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>{isEn ? "Copy MCP Config" : "复制远程 MCP 配置"}</span>
            </>
          )}
        </Button>
      </Card>
    </div>
  );
}
