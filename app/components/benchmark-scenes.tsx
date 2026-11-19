"use client";

import { useState } from "react";
import { useI18n } from "./i18n-context";

export type SceneMode = "sandbox" | "chat" | "dashboard" | "landing";

interface SceneSkin {
  outer: string;
  card: string;
  recess: string;
  badge: string;
  primaryBtn: string;
  secondaryBtn: string;
  barClass: string;
  muted: string;
  sawtooth?: boolean;
  wusilan?: boolean;
  hazard?: boolean;
  riso?: boolean;
  pcb?: boolean;
  eink?: boolean;
}

const SKINS: Record<string, SceneSkin> = {
  "tactile-synth": {
    outer: "te-chassis rounded-2xl p-5 border border-[#c7c4ba] font-mono",
    card: "te-recess rounded-xl p-4",
    recess: "te-lcd rounded-lg p-3 border border-[#7c8970]",
    badge: "px-2 py-0.5 rounded bg-[#26272b] text-[#f4f3ef] text-xs font-bold",
    primaryBtn: "te-key te-key-orange rounded-lg px-3.5 py-2 text-xs font-bold cursor-pointer",
    secondaryBtn: "te-key bg-[#f2f0ea] text-[#1e1f22] rounded-lg px-3 py-2 text-xs font-bold cursor-pointer",
    barClass: "bg-[#1b2416]",
    muted: "text-[#575651]",
  },
  "cad-blueprint": {
    outer: "bp-dark rounded-none p-5 border bp-b font-mono",
    card: "border bp-b p-4 bg-sky-950/35 relative",
    recess: "border border-dashed bp-bs p-3 bg-sky-950/50",
    badge: "border border-emerald-400 text-emerald-300 px-2 py-0.5 text-xs font-bold",
    primaryBtn: "border bp-b bg-sky-400/25 hover:bg-sky-400/35 px-3.5 py-1.5 text-xs font-bold cursor-pointer",
    secondaryBtn: "border bp-bs px-3 py-1.5 text-xs cursor-pointer",
    barClass: "bg-sky-300/80 border border-sky-200",
    muted: "text-sky-200/70",
  },
  "thermal-receipt": {
    outer: "bg-[#faf7ef] text-[#191918] px-6 py-4 font-mono shadow-lg max-w-lg mx-auto",
    card: "border-y border-dashed border-[#8c8980] py-3",
    recess: "bg-[#f1ede2] p-3 border border-[#191918]",
    badge: "border-2 border-[#c82824] text-[#c82824] px-2 py-0.5 text-xs font-bold -rotate-3 inline-block",
    primaryBtn: "bg-[#191918] text-[#faf7ef] px-3.5 py-1.5 text-xs font-bold cursor-pointer",
    secondaryBtn: "border border-[#191918] px-3 py-1.5 text-xs font-bold cursor-pointer",
    barClass: "bg-[#191918]",
    muted: "text-[#57554f]",
    sawtooth: true,
  },
  "eink-gc16": {
    outer: "bg-[#f1eee7] text-[#141413] border-2 border-[#141413] p-5 font-serif",
    card: "border border-[#141413] p-4",
    recess: "border border-[#141413] p-3 dither-25 bg-[#f1eee7]",
    badge: "border border-[#141413] bg-[#141413] text-[#f1eee7] px-2 py-0.5 text-xs font-mono font-bold",
    primaryBtn: "bg-[#141413] text-[#f1eee7] px-3.5 py-1.5 text-xs font-mono font-bold cursor-pointer",
    secondaryBtn: "border border-[#141413] bg-[#f1eee7] px-3 py-1.5 text-xs font-mono font-bold cursor-pointer",
    barClass: "dither-50 border border-[#141413]",
    muted: "text-[#141413]/75",
    eink: true,
  },
  "magi-terminal": {
    outer: "bg-[#080a09] text-[#ff9d00] border-2 border-[#ff9d00]/80 p-5 font-mono space-y-3",
    card: "magi-oct border border-[#ff9d00]/60 bg-[#ff9d00]/10 p-4",
    recess: "border border-[#22ff66]/50 bg-black p-3 text-[#22ff66]",
    badge: "bg-[#ff9d00] text-black px-2 py-0.5 text-xs font-bold",
    primaryBtn: "bg-[#ff9d00] text-black px-3.5 py-1.5 text-xs font-bold uppercase cursor-pointer",
    secondaryBtn: "border border-[#ff9d00] text-[#ff9d00] px-3 py-1.5 text-xs font-bold cursor-pointer",
    barClass: "bg-[#22ff66]",
    muted: "text-[#ff9d00]/70",
    hazard: true,
  },
  "xuan-wusilan": {
    outer: "p-5 font-serif text-[#22201d]",
    card: "border border-[#22201d]/30 p-4 bg-[#f7f4eb]",
    recess: "border-l-2 border-[#b82925] pl-3 py-2 bg-[#f2eee3]",
    badge: "border-[1.5px] border-[#b82925] text-[#b82925] px-2 py-0.5 text-xs font-bold tracking-widest",
    primaryBtn: "bg-[#b82925] text-[#f7f4eb] px-4 py-1.5 text-xs tracking-widest cursor-pointer",
    secondaryBtn: "border border-[#22201d] text-[#22201d] px-3.5 py-1.5 text-xs tracking-widest cursor-pointer",
    barClass: "bg-[#22201d]",
    muted: "text-[#5c574f]",
    wusilan: true,
  },
  "split-flap": {
    outer: "bg-[#16171a] text-[#f5f5f0] rounded-xl p-5 font-mono border border-zinc-700",
    card: "bg-[#202227] border border-zinc-700 rounded-lg p-4",
    recess: "flap-cell rounded p-3 text-[#ffd100]",
    badge: "bg-[#ffd100] text-[#141414] px-2.5 py-0.5 rounded text-xs font-bold",
    primaryBtn: "bg-[#ffd100] text-[#141414] rounded px-3.5 py-1.5 text-xs font-bold cursor-pointer",
    secondaryBtn: "border border-zinc-500 text-zinc-200 rounded px-3 py-1.5 text-xs font-bold cursor-pointer",
    barClass: "bg-[#ffd100]",
    muted: "text-zinc-400",
  },
  "risograph-print": {
    outer: "riso-paper rounded-xl p-5 border-2 border-[#0078bf]",
    card: "riso-mul border-2 border-[#0078bf] bg-white/75 rounded-lg p-4",
    recess: "riso-mul border border-[#ff48b0] bg-[#ff48b0]/15 rounded p-3",
    badge: "bg-[#ff48b0] text-white px-2 py-0.5 text-xs font-mono font-bold",
    primaryBtn: "riso-mul bg-[#0078bf] text-white px-3.5 py-1.5 rounded-sm text-xs font-mono font-bold shadow-[3px_3px_0_#ff48b0] cursor-pointer",
    secondaryBtn: "border-2 border-[#0078bf] text-[#0078bf] px-3 py-1.5 rounded-sm text-xs font-mono font-bold cursor-pointer",
    barClass: "bg-[#ff48b0] riso-mul",
    muted: "text-[#334155]",
    riso: true,
  },
  "swiss-apothecary": {
    outer: "bg-[#f4f1ea] text-[#121211] border-2 border-[#121211] p-5 font-mono",
    card: "border-t-4 border-b-2 border-[#121211] py-3",
    recess: "border border-[#121211] bg-white p-3",
    badge: "bg-[#121211] text-[#f4f1ea] px-2 py-0.5 text-xs font-bold",
    primaryBtn: "bg-[#121211] text-[#f4f1ea] px-3.5 py-1.5 text-xs font-bold cursor-pointer",
    secondaryBtn: "border border-[#121211] text-[#121211] px-3 py-1.5 text-xs font-bold cursor-pointer",
    barClass: "bg-[#b45309] border-t-2 border-[#78350f]",
    muted: "text-[#4a4946]",
  },
  "analog-tape-deck": {
    outer: "rounded-xl p-5 border border-[#a8a396] font-mono text-[#1d1d1b] bg-gradient-to-b from-[#dcd9d0] to-[#c2beb2]",
    card: "bg-[#232220] text-[#f3efe6] rounded-lg p-4 border border-[#474540]",
    recess: "vu-window rounded-lg p-3 border border-[#524d42]",
    badge: "bg-[#22211f] text-[#f5c869] px-2 py-0.5 rounded-sm text-xs font-bold",
    primaryBtn: "bg-[#d94e1f] text-white px-3.5 py-1.5 rounded-sm text-xs font-bold cursor-pointer",
    secondaryBtn: "bg-[#e5e1d8] text-[#181715] px-3 py-1.5 rounded-sm text-xs font-bold cursor-pointer",
    barClass: "bg-[#d94e1f]",
    muted: "text-[#57544d]",
  },
  "atomic-purple": {
    outer: "atomic-frost rounded-xl p-5 border border-purple-300/40 text-purple-50 font-mono bg-[#7e3af2]/45",
    card: "bg-[#151121]/85 border border-purple-300/30 rounded-lg p-4",
    recess: "bg-[#0d0a16] border border-emerald-400/40 rounded p-3 text-emerald-300",
    badge: "bg-amber-400 text-zinc-950 px-2 py-0.5 rounded text-xs font-black",
    primaryBtn: "bg-emerald-400 text-zinc-950 rounded-full px-4 py-1.5 text-xs font-black shadow-[0_3px_0_#065f46] active:translate-y-0.5 cursor-pointer",
    secondaryBtn: "bg-rose-500 text-white rounded-full px-3.5 py-1.5 text-xs font-black shadow-[0_3px_0_#9f1239] cursor-pointer",
    barClass: "bg-emerald-400",
    muted: "text-purple-200/80",
    pcb: true,
  },
  "corkboard-dossier": {
    outer: "cork-surface rounded-xl p-5 border-4 border-[#5c3d1e] font-mono text-[#1f1c18]",
    card: "bg-[#efe4c8] p-4 shadow-md -rotate-1 border border-[#cbbba0]",
    recess: "bg-[#fef08a] p-3 shadow rotate-1 text-[#1c1917]",
    badge: "bg-rose-600 text-white px-2 py-0.5 rounded-sm text-xs font-bold",
    primaryBtn: "bg-rose-700 text-white px-3.5 py-1.5 text-xs font-bold shadow cursor-pointer",
    secondaryBtn: "bg-white border border-[#1f1c18] px-3 py-1.5 text-xs font-bold cursor-pointer",
    barClass: "bg-rose-700",
    muted: "text-[#574c3f]",
  },
};

export function BenchmarkScene({
  slug,
  styleName,
  mode,
}: {
  slug: string;
  styleName: string;
  mode: Exclude<SceneMode, "sandbox">;
}) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const skin = SKINS[slug] ?? SKINS["tactile-synth"];
  const [chatInput, setChatInput] = useState("");
  const [extraMessages, setExtraMessages] = useState<{ role: string; text: string }[]>([]);

  const baseMessages = isEn
    ? [
        { role: "user", text: "Audit node latency and apply material UI tokens." },
        {
          role: "agent",
          text: "Scan complete: P99 latency dropped from 142ms to 38ms at steady 60fps.",
        },
      ]
    : [
        { role: "user", text: "帮我检查当前节点延迟并生成优化方案" },
        {
          role: "agent",
          text: "已完成扫描：P99 延迟由 142ms 降至 38ms，物理材质渲染帧率稳定 60fps。",
        },
      ];

  const sendReply = () => {
    if (!chatInput.trim()) return;
    setExtraMessages((prev) => [
      ...prev,
      { role: "user", text: chatInput.trim() },
      {
        role: "agent",
        text: isEn
          ? `[${slug.toUpperCase()}] Executed under active aesthetic constraints.`
          : `[${slug.toUpperCase()}] 已按当前美学规范执行指令。`,
      },
    ]);
    setChatInput("");
  };

  const allMessages = [...baseMessages, ...extraMessages];

  const innerContent = (
    <div className="space-y-4 text-xs">
      {skin.hazard && <div className="magi-hazard h-2.5 w-full" />}

      {mode === "chat" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-current/15">
            <span className="font-bold text-sm">AGENT SESSION · {styleName}</span>
            <span className={skin.badge}>ONLINE</span>
          </div>

          <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
            {allMessages.map((m, idx) => (
              <div key={idx} className={m.role === "user" ? skin.card : skin.recess}>
                <div className="font-bold opacity-70 mb-1">
                  {m.role === "user" ? "USER //" : "TEA_AGENT //"}
                </div>
                <div className="leading-relaxed">{m.text}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendReply()}
              placeholder={
                isEn ? "Send a test message in this aesthetic..." : "输入测试消息体验当前皮肤对话态..."
              }
              className="flex-1 bg-transparent border border-current/40 px-3 py-1.5 text-xs focus:outline-none"
            />
            <button type="button" onClick={sendReply} className={skin.primaryBtn}>
              {isEn ? "SEND" : "发送指令"}
            </button>
          </div>
        </div>
      )}

      {mode === "dashboard" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-sm">TELEMETRY OVERVIEW</span>
            <span className={skin.badge}>LIVE SYNC</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["ACTIVE NODES", "1,024"],
              ["LATENCY P95", "24 ms"],
              ["ERROR RATE", "0.02%"],
            ].map(([k, v]) => (
              <div key={k} className={skin.recess}>
                <div className="opacity-70 text-[11px]">{k}</div>
                <div className="text-base font-bold mt-0.5">{v}</div>
              </div>
            ))}
          </div>

          <div className={skin.card}>
            <div className="flex justify-between mb-2 font-bold">
              <span>THROUGHPUT (LAST 5 DAYS)</span>
              <span>98.4% SLA</span>
            </div>
            <div className="grid grid-cols-5 gap-2.5 items-end h-20 pt-2">
              {[45, 72, 95, 64, 86].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className={`w-full ${skin.barClass}`} style={{ height: `${h}%` }} />
                  <span className="opacity-75">D{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === "landing" && (
        <div className="space-y-4 py-1">
          <span className={skin.badge}>EDITION 2026 // {slug.toUpperCase()}</span>
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight">
              {isEn
                ? "Break Free From Generic Plastic AI Slop"
                : "告别千篇一律的 AI 塑料感界面"}
            </h3>
            <p className={`leading-relaxed ${skin.muted}`}>
              {isEn
                ? `The exact same layout transformed under "${styleName}" — complete with physical tactility, crisp rule hierarchy, and authentic surface grain.`
                : `同一套业务结构，在「${styleName}」材质体系下自动呈现独特的器物触感、边框秩序与物理交互反馈。`}
            </p>
          </div>
          <div className={skin.recess}>
            {isEn
              ? "✓ Zero Slop Gradients   ·   ✓ Tactile Physics   ·   ✓ Ready-to-Use DESIGN.md"
              : "✓ 零毛玻璃泛滥   ·   ✓ 真实物理隐喻   ·   ✓ 开箱即用 DESIGN.md"}
          </div>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button type="button" className={skin.primaryBtn}>
              {isEn ? "Steep This Blend →" : "立即应用此茶方 →"}
            </button>
            <button type="button" className={skin.secondaryBtn}>
              {isEn ? "Read Spec" : "查看规范文档"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (skin.sawtooth) {
    return (
      <div className="bg-[#dcd8cf] p-4 rounded-xl">
        <div className="max-w-lg mx-auto">
          <div className="receipt-saw-top" />
          <div className={skin.outer}>{innerContent}</div>
          <div className="receipt-saw-bottom" />
        </div>
      </div>
    );
  }

  if (skin.wusilan) {
    return (
      <div className="bg-[#f7f4eb] p-4 rounded-xl border border-[#dcd5c5]">
        <div className="wusilan-outer">
          <div className={`wusilan-inner ${skin.outer}`}>{innerContent}</div>
        </div>
      </div>
    );
  }

  if (skin.pcb) {
    return (
      <div className="relative bg-[#231636] rounded-2xl p-5 overflow-hidden border-2 border-purple-400/50">
        <svg
          className="absolute inset-0 w-full h-full opacity-45 pointer-events-none"
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
        >
          <path
            d="M10 35 H130 L165 70 H310 L340 40 H395 M20 180 H170 L205 145 H380"
            stroke="#c084fc"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="130" cy="35" r="4.5" fill="#fbbf24" />
          <circle cx="310" cy="70" r="4.5" fill="#fbbf24" />
          <circle cx="170" cy="180" r="4.5" fill="#fbbf24" />
        </svg>
        <div className={`relative z-10 ${skin.outer}`}>{innerContent}</div>
      </div>
    );
  }

  return (
    <div key={skin.eink ? `${slug}-${mode}` : undefined} className={`${skin.eink ? "eink-flash" : ""} ${skin.outer}`}>
      {innerContent}
    </div>
  );
}
