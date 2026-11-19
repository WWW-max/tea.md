"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Blocks,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StyleEntry } from "./almanac-data";
import { useI18n } from "./i18n-context";
import { RichStyleShowcase } from "./rich-style-showcase";
import { SiteControls } from "./site-controls";
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
  const { locale } = useI18n();
  const isEn = locale === "en";

  const [fullWidth, setFullWidth] = useState(false);
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
      {/* 详情页顶部 shadcn 工具导航栏 */}
      <Card className="px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="size-3.5" />
              <span>{isEn ? "All Styles" : "返回画廊"}</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Badge className="font-mono">{item.num}</Badge>
            <h1 className="text-sm md:text-base font-bold tracking-tight">
              {isEn ? item.en : item.name}
            </h1>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {isEn ? `${item.name} · ${item.catEn}` : `${item.en} · ${item.cat}`}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFullWidth((f) => !f)}
            className="hidden lg:inline-flex"
          >
            {fullWidth ? (
              <>
                <Minimize2 className="size-3.5" />
                <span>{isEn ? "Show Inspector" : "展开调配栏"}</span>
              </>
            ) : (
              <>
                <Maximize2 className="size-3.5" />
                <span>{isEn ? "Full Width" : "全宽预览"}</span>
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" asChild>
            <Link href={`/styles/${prevItem.slug}`}>
              <ChevronLeft className="size-3.5" />
              <span className="hidden sm:inline">
                {prevItem.num} {isEn ? prevItem.en : prevItem.name}
              </span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/styles/${nextItem.slug}`}>
              <span className="hidden sm:inline">
                {nextItem.num} {isEn ? nextItem.en : nextItem.name}
              </span>
              <ChevronRight className="size-3.5" />
            </Link>
          </Button>

          <SiteControls />
        </div>
      </Card>

      {/* 主体：左 8 栏完整丰富样板页面 + 右 4 栏 shadcn Tabs 调配与提示词面板 */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <Card
          className={`${
            fullWidth ? "lg:col-span-12" : "lg:col-span-8"
          } overflow-hidden`}
        >
          <CardHeader className="border-b border-border flex flex-row flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {isEn
                  ? "Interactive Full Specimen Showcase"
                  : "完整交互样板间"}
              </span>
              <span
                className="size-3 rounded-full border border-black/20"
                style={{ backgroundColor: effectiveAccent }}
              />
            </div>
            <code className="font-mono text-muted-foreground">
              styles/{item.slug}/DESIGN.md
            </code>
          </CardHeader>

          <CardContent
            className={`tea-mixer-stage ${stagePadClass} bg-background`}
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
          </CardContent>

          <CardFooter className="border-t border-border justify-between gap-2 text-xs flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <Terminal className="size-3.5 text-muted-foreground shrink-0" />
              <code className="font-mono text-muted-foreground truncate">
                npx shadcn@latest add {origin}/r/{item.slug}.json
              </code>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                copyWithFeedback(
                  `npx shadcn@latest add ${origin}/r/${item.slug}.json`,
                  "cli"
                )
              }
            >
              {copiedKey === "cli" ? (
                <>
                  <Check className="size-3.5" />
                  <span>{isEn ? "CLI Copied" : "已复制命令"}</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>{isEn ? "Copy shadcn CLI" : "复制 shadcn 直装命令"}</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* 右栏：基于 shadcn Tabs + Slider 的参数化调配台 */}
        <Card
          className={`${
            fullWidth ? "lg:col-span-12" : "lg:col-span-4 lg:sticky lg:top-4"
          } p-4`}
        >
          <Tabs defaultValue="mixer" className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="mixer">
                <SlidersHorizontal className="size-3.5" />
                <span>{isEn ? "Mixer" : "调配"}</span>
              </TabsTrigger>
              <TabsTrigger value="registry">
                <Blocks className="size-3.5" />
                <span>{isEn ? "Code" : "原件"}</span>
              </TabsTrigger>
              <TabsTrigger value="lore">
                <BookOpen className="size-3.5" />
                <span>{isEn ? "Origin" : "溯源"}</span>
              </TabsTrigger>
              <TabsTrigger value="prompt">
                <Sparkles className="size-3.5" />
                <span>Prompt</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: 参数化调配器 */}
            <TabsContent value="mixer" className="space-y-4 text-xs">
              <div className="p-3.5 rounded-lg bg-background border border-border space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>{isEn ? "Surface Grain" : "肌理噪点浓度"}</span>
                    <span className="font-mono text-muted-foreground">{grain}%</span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[grain]}
                    onValueChange={([v]) => setGrain(v)}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="font-medium">
                    {isEn ? "Tactile Depth" : "物理拟物强度"}
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(
                      [
                        ["subtle", isEn ? "Subtle" : "克制"],
                        ["balanced", isEn ? "Balanced" : "均衡"],
                        ["heavy", isEn ? "Heavy" : "重度"],
                      ] as const
                    ).map(([val, label]) => (
                      <Button
                        key={val}
                        variant={depth === val ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDepth(val)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-7 space-y-1.5">
                    <div className="font-medium">{isEn ? "Density" : "留白密度"}</div>
                    <div className="grid grid-cols-3 gap-1">
                      {(
                        [
                          ["compact", isEn ? "Tight" : "紧凑"],
                          ["standard", isEn ? "Normal" : "标准"],
                          ["airy", isEn ? "Airy" : "疏朗"],
                        ] as const
                      ).map(([val, label]) => (
                        <Button
                          key={val}
                          variant={density === val ? "default" : "outline"}
                          size="sm"
                          className="px-1.5"
                          onClick={() => setDensity(val)}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{isEn ? "Accent" : "点缀色"}</span>
                      {customAccent && (
                        <button
                          type="button"
                          onClick={() => setCustomAccent(null)}
                          className="text-muted-foreground underline cursor-pointer"
                        >
                          {isEn ? "Reset" : "重置"}
                        </button>
                      )}
                    </div>
                    <label className="flex h-7 items-center gap-1.5 px-2 rounded-md border border-border bg-card cursor-pointer">
                      <input
                        type="color"
                        value={effectiveAccent}
                        onChange={(e) => setCustomAccent(e.target.value)}
                        className="size-4 border-0 p-0 bg-transparent cursor-pointer"
                      />
                      <span className="font-mono truncate">{effectiveAccent}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-1">
                    {(
                      [
                        ["design-md", "DESIGN.md"],
                        ["tailwind-css", "CSS"],
                        ["agent-rules", "Rules"],
                      ] as const
                    ).map(([fmt, label]) => (
                      <Button
                        key={fmt}
                        variant={exportFormat === fmt ? "default" : "outline"}
                        size="sm"
                        className="font-mono px-2"
                        onClick={() => setExportFormat(fmt)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyWithFeedback(mixerOutput, "mixer")}
                    >
                      {copiedKey === "mixer" ? (
                        <Check className="size-3.5" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      <span>{copiedKey === "mixer" ? (isEn ? "Copied" : "已复制") : isEn ? "Copy" : "复制"}</span>
                    </Button>
                    <Button size="sm" onClick={downloadCompiledFile}>
                      <Download className="size-3.5" />
                      <span>{isEn ? "Save" : "导出"}</span>
                    </Button>
                  </div>
                </div>

                <pre className="p-3 rounded-lg bg-background border border-border font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {mixerOutput}
                </pre>
              </div>
            </TabsContent>

            {/* Tab 2: 灵魂原件源码 */}
            {prim && (
              <TabsContent value="registry" className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-background border border-border space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold">{prim.componentName}</span>
                    <Badge variant="secondary" className="font-mono">
                      registry:block
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {isEn ? prim.summaryEn : prim.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-muted-foreground truncate">
                    components/tea/{prim.fileName}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => copyWithFeedback(prim.code, "prim")}
                  >
                    {copiedKey === "prim" ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>
                      {copiedKey === "prim"
                        ? isEn
                          ? "Copied"
                          : "已复制"
                        : isEn
                          ? "Copy TSX"
                          : "复制 TSX"}
                    </span>
                  </Button>
                </div>

                <pre className="p-3 rounded-lg bg-background border border-border font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto">
                  {prim.code}
                </pre>
              </TabsContent>
            )}

            {/* Tab 3: 美学溯源与色板 */}
            <TabsContent value="lore" className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="font-semibold text-muted-foreground uppercase tracking-wider">
                  {isEn ? "Origin & Material Reference" : "美学溯源"}
                </div>
                <p className="leading-relaxed">{isEn ? item.originEn : item.origin}</p>
              </div>

              <div className="space-y-1.5">
                <div className="font-semibold text-muted-foreground uppercase tracking-wider">
                  {isEn ? "Best Use Cases" : "适用场景"}
                </div>
                <p className="leading-relaxed">{isEn ? item.bestForEn : item.bestFor}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-muted-foreground uppercase tracking-wider">
                    {isEn ? "Material Swatches" : "材质色板 (点击复制)"}
                  </span>
                  {copiedKey?.startsWith("#") && (
                    <Badge variant="secondary" className="font-mono">
                      ✓ {copiedKey}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {item.swatches.map(([hex, zhLbl, enLbl]) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => copyWithFeedback(hex, hex)}
                      className="flex items-center gap-2 p-2 rounded-lg border border-border bg-background hover:bg-secondary text-left transition cursor-pointer"
                    >
                      <span
                        className="size-5 rounded border border-black/20 shrink-0"
                        style={{ background: hex }}
                      />
                      <span className="truncate">
                        <strong className="font-mono block">{hex}</strong>
                        <span className="text-muted-foreground">
                          {isEn ? enLbl : zhLbl}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="font-semibold text-muted-foreground uppercase tracking-wider">
                  {isEn ? "Anti-Slop Guardrails" : "禁忌护栏 (DON'Ts)"}
                </div>
                <ul className="space-y-1.5">
                  {activeDonts.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="font-mono text-foreground">—</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Tab 4: 纯净短指令 */}
            <TabsContent value="prompt" className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">
                  {isEn
                    ? "Paste into Claude / ChatGPT / v0 / Cursor:"
                    : "粘贴至 Claude / ChatGPT / v0 / Cursor："}
                </span>
                <Button
                  size="sm"
                  onClick={() => copyWithFeedback(activePrompt, "prompt")}
                >
                  {copiedKey === "prompt" ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  <span>
                    {copiedKey === "prompt"
                      ? isEn
                        ? "Copied"
                        : "已复制"
                      : isEn
                        ? "Copy"
                        : "复制"}
                  </span>
                </Button>
              </div>
              <pre className="p-3.5 rounded-lg bg-background border border-border font-mono text-xs whitespace-pre-wrap leading-relaxed select-all">
                {activePrompt}
              </pre>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
