"use client";

import { useEffect, useRef, useState } from "react";
import type { StyleEntry } from "./almanac-data";
import { useI18n } from "./i18n-context";

export function SandboxStage({
  slug,
  fallbackItem,
}: {
  slug: string;
  fallbackItem?: StyleEntry;
}) {
  const { locale } = useI18n();
  const isEn = locale === "en";

  switch (slug) {
    case "tactile-synth":
      return <TactileDemo isEn={isEn} />;
    case "cad-blueprint":
      return <BlueprintDemo isEn={isEn} />;
    case "thermal-receipt":
      return <ReceiptDemo isEn={isEn} />;
    case "eink-gc16":
      return <EinkDemo isEn={isEn} />;
    case "magi-terminal":
      return <MagiDemo isEn={isEn} />;
    case "xuan-wusilan":
      return <XuanDemo isEn={isEn} />;
    case "split-flap":
      return <SplitFlapDemo isEn={isEn} />;
    case "risograph-print":
      return <RisoDemo isEn={isEn} />;
    case "swiss-apothecary":
      return <ApothecaryDemo />;
    case "analog-tape-deck":
      return <TapeDeckDemo />;
    case "atomic-purple":
      return <AtomicPurpleDemo isEn={isEn} />;
    case "corkboard-dossier":
      return <CorkboardDemo isEn={isEn} />;
    default:
      return fallbackItem ? <AutoCommunityMiniStage item={fallbackItem} isEn={isEn} /> : null;
  }
}

function AutoCommunityMiniStage({ item, isEn }: { item: StyleEntry; isEn: boolean }) {
  const bg = item.swatches[0]?.[0] ?? "#f5f5f0";
  const ink = item.swatches[1]?.[0] ?? "#18181b";
  const accent = item.swatches[2]?.[0] ?? ink;
  const sub = item.swatches[3]?.[0] ?? accent;
  const radius = item.tokens?.radius ?? "8px";
  const bw = item.tokens?.borderWidth ?? "1.5px";
  const fontCls =
    item.tokens?.font === "serif"
      ? "font-serif"
      : item.tokens?.font === "sans"
        ? "font-sans"
        : "font-mono";
  const shadow =
    item.tokens?.shadow === "hard"
      ? `4px 4px 0 ${ink}`
      : item.tokens?.shadow === "soft"
        ? "0 8px 20px rgba(0,0,0,0.12)"
        : "none";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: ink,
        borderRadius: radius,
        border: `${bw} solid ${ink}`,
        boxShadow: shadow,
      }}
      className={`${fontCls} p-4 space-y-3 text-xs`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-current/20">
        <span className="font-bold uppercase tracking-wider">{item.slug}</span>
        <span
          style={{ backgroundColor: accent, color: bg, borderRadius: radius }}
          className="px-2 py-0.5 font-bold"
        >
          {isEn ? "COMMUNITY BLEND" : "社区配方"}
        </span>
      </div>
      <div className="text-sm font-bold">{isEn ? item.en : item.name}</div>
      <p className="opacity-80 line-clamp-2 leading-relaxed">
        {isEn ? item.originEn : item.origin}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <span
          style={{ backgroundColor: accent, color: bg, borderRadius: radius }}
          className="px-3 py-1 font-bold"
        >
          {isEn ? "Primary" : "主按钮"}
        </span>
        <span
          style={{ border: `1px solid ${sub}`, borderRadius: radius }}
          className="px-3 py-1 font-bold"
        >
          {isEn ? "Secondary" : "次按钮"}
        </span>
      </div>
    </div>
  );
}

function TactileDemo({ isEn }: { isEn: boolean }) {
  const [val, setVal] = useState(75);
  const [status, setStatus] = useState("READY");

  return (
    <div className="te-chassis rounded-2xl p-5 border border-[#c7c4ba] font-mono space-y-4">
      <div className="flex items-center justify-between pb-2.5 border-b border-[#ccc9bf] text-xs">
        <div className="flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500] shadow-[0_0_8px_#ff5500]" />
          TX-01 SYNTH CONSOLE
        </div>
        <span className="px-2 py-0.5 bg-[#26272b] text-white rounded text-xs">{status}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="te-lcd rounded-xl p-4 border border-[#7c8970] space-y-3">
          <div className="flex justify-between text-xs font-bold border-b border-[#1b2416]/25 pb-1">
            <span>LCD MONITOR</span>
            <span>CH-01</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-xs">TEMP:</span>
            <span className="text-2xl font-bold">{(val / 100).toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full accent-[#1b2416]"
          />
        </div>
        <div className="te-recess rounded-xl p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-around">
            <button
              type="button"
              onClick={() => setVal((v) => (v >= 95 ? 15 : v + 15))}
              className="w-16 h-16 rounded-full bg-[#26272b] shadow-lg flex items-center justify-center cursor-pointer"
              title={isEn ? "Click to step rotary knob" : "点击步进旋转阻尼旋钮"}
            >
              <div
                className="w-full h-full rounded-full relative transition-transform"
                style={{ transform: `rotate(${-135 + val * 2.7}deg)` }}
              >
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-[#ff5500]" />
              </div>
            </button>
            <div className="text-xs font-bold text-[#4a4944]">
              {isEn ? (
                <>
                  CLICK KNOB
                  <br />
                  OR KEYCAPS
                </>
              ) : (
                <>
                  点击旋钮
                  <br />
                  或按压琴键
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setStatus("RUNNING ▶")}
              className="te-key te-key-orange rounded-lg py-2 text-xs font-bold"
            >
              ▶ RUN
            </button>
            <button
              type="button"
              onClick={() => setStatus("STANDBY")}
              className="te-key bg-[#f2f0ea] text-[#1e1f22] rounded-lg py-2 text-xs font-bold"
            >
              ■ STOP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlueprintDemo({ isEn }: { isEn: boolean }) {
  const [dark, setDark] = useState(true);
  const [compact, setCompact] = useState(false);
  const [coords, setCoords] = useState("X:120 Y:064");
  const [boxWidth, setBoxWidth] = useState("FULL");
  const boxRef = useRef<HTMLDivElement>(null);

  const toggleResize = () => {
    setCompact((prev) => !prev);
    setTimeout(() => {
      if (boxRef.current) {
        setBoxWidth(`${Math.round(boxRef.current.getBoundingClientRect().width)}px`);
      }
    }, 220);
  };

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = String(Math.max(0, Math.round(e.clientX - r.left))).padStart(3, "0");
        const y = String(Math.max(0, Math.round(e.clientY - r.top))).padStart(3, "0");
        setCoords(`X:${x} Y:${y}`);
      }}
      className={`${dark ? "bp-dark" : "bp-light"} rounded-xl p-5 border bp-b font-mono space-y-4 transition-colors`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border bp-bs p-2.5 text-xs">
        <span className="font-bold">DWG // AG-2049</span>
        <span>{coords}</span>
        <button type="button" onClick={() => setDark((d) => !d)} className="px-2 py-0.5 border bp-b cursor-pointer">
          {isEn ? "Toggle Cyan / Vellum" : "切换深蓝 / 硫酸纸白"}
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs opacity-80">
        <span>├</span>
        <div className="h-px flex-1 border-t border-dashed bp-b" />
        <span>W: {boxWidth}</span>
        <div className="h-px flex-1 border-t border-dashed bp-b" />
        <span>┤</span>
      </div>
      <div
        ref={boxRef}
        style={{ width: compact ? "72%" : "100%" }}
        className="relative border bp-b p-4 space-y-3 transition-all"
      >
        <span className="absolute -top-2 -left-1.5 text-xs font-bold">+</span>
        <span className="absolute -top-2 -right-1.5 text-xs font-bold">+</span>
        <span className="absolute -bottom-2 -left-1.5 text-xs font-bold">+</span>
        <span className="absolute -bottom-2 -right-1.5 text-xs font-bold">+</span>
        <div className="flex justify-between text-xs">
          <span className="font-bold">VECTOR_CORE_SCHEMATIC</span>
          <span className="border border-emerald-400 text-emerald-400 px-1.5 font-bold">[APPROVED]</span>
        </div>
        <button
          type="button"
          onClick={toggleResize}
          className="px-3 py-1.5 border bp-b text-xs font-bold bg-sky-400/20 cursor-pointer"
        >
          {isEn ? "↔ Resize & Measure Live Width" : "↔ 伸缩模块并实时测量像素尺寸"}
        </button>
      </div>
    </div>
  );
}

function ReceiptDemo({ isEn }: { isEn: boolean }) {
  const [items, setItems] = useState([
    { label: "1x HALFTONE-RENDER", price: "$0.04" },
    { label: "2x PROMPT-COMPILE", price: "$0.02" },
  ]);
  const [dotStep, setDotStep] = useState(5);
  const [stamped, setStamped] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#faf7ef";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#191918";
    for (let y = dotStep / 2; y < c.height; y += dotStep) {
      for (let x = dotStep / 2; x < c.width; x += dotStep) {
        const ratio = (x / c.width) * 0.75 + Math.sin(y * 0.08) * 0.18;
        const r = Math.max(0.4, dotStep * 0.48 * Math.min(0.95, Math.max(0.08, ratio)));
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [dotStep]);

  return (
    <div className="bg-[#dcd8cf] p-5 rounded-xl">
      <div className="max-w-sm mx-auto">
        <div className="receipt-saw-top" />
        <div className="bg-[#faf7ef] text-[#191918] px-5 py-4 font-mono text-xs space-y-2.5 relative shadow-lg">
          <div className="text-center font-bold text-sm tracking-widest">TEA.MD POS #03</div>
          <div className="text-center text-[#57554f]">============================</div>
          <div className="space-y-1">
            {items.map((it, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{it.label}</span>
                <b>{it.price}</b>
              </div>
            ))}
          </div>
          <div className="text-center text-[#57554f]">----------------------------</div>
          <canvas ref={canvasRef} width={260} height={76} className="w-full border border-[#191918]" />
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => setItems((prev) => [...prev, { label: "1x EXTRA-STEEP", price: "$0.03" }])}
              className="px-2.5 py-1 border border-[#191918] font-bold hover:bg-[#191918] hover:text-white cursor-pointer"
            >
              {isEn ? "+ Print Row" : "+ 吐小票"}
            </button>
            <input
              type="range"
              min={3}
              max={10}
              value={dotStep}
              onChange={(e) => setDotStep(Number(e.target.value))}
              className="w-24 accent-[#191918]"
              title={isEn ? "Halftone dot spacing" : "调节半调网点颗粒度"}
            />
            <button
              type="button"
              onClick={() => setStamped((n) => n + 1)}
              className="px-2.5 py-1 border border-[#c82824] text-[#c82824] font-bold cursor-pointer"
            >
              {isEn ? "Stamp" : "盖章"}
            </button>
          </div>
          {stamped > 0 && (
            <div
              key={stamped}
              className="stamp-anim absolute right-4 top-8 border-2 border-[#c82824] text-[#c82824] px-2.5 py-0.5 font-bold text-sm pointer-events-none"
            >
              PAID
            </div>
          )}
        </div>
        <div className="receipt-saw-bottom" />
      </div>
    </div>
  );
}

function EinkDemo({ isEn }: { isEn: boolean }) {
  const [flashKey, setFlashKey] = useState(0);

  return (
    <div className="bg-[#2c2c2a] p-4 rounded-xl">
      <div
        key={flashKey}
        className={`${flashKey > 0 ? "eink-flash" : ""} bg-[#f1eee7] text-[#141413] p-5 border-2 border-[#141413] space-y-4`}
      >
        <div className="flex justify-between items-center border-b-2 border-[#141413] pb-2 text-xs font-mono font-bold">
          <span>📖 E-PAPER 300PPI</span>
          <button
            type="button"
            onClick={() => setFlashKey((k) => k + 1)}
            className="px-2.5 py-1 bg-[#141413] text-[#f1eee7] cursor-pointer"
          >
            {isEn ? "⚡ Trigger GC16 Flash" : "⚡ 触发 GC16 全局反色黑闪"}
          </button>
        </div>
        <p className="font-serif text-xs leading-relaxed">
          {isEn ? (
            <>
              Zero-glare electrophoretic paper rejects colors and blurred shadows. Bars below use{" "}
              <b>1-bit Bayer stipple dithering</b>:
            </>
          ) : (
            <>
              电子墨水屏拒绝一切彩色与模糊阴影。下方柱状图完全使用 <b>1-bit 棋盘点阵抖动（Dithering）</b>{" "}
              表达灰阶：
            </>
          )}
        </p>
        <div className="grid grid-cols-4 gap-3 items-end h-20 pt-2 border-b-2 border-[#141413] font-mono text-xs text-center">
          <div>
            <div className="h-8 border border-[#141413] dither-25" />
            Q1
          </div>
          <div>
            <div className="h-12 border border-[#141413] dither-50" />
            Q2
          </div>
          <div>
            <div className="h-16 border border-[#141413] bg-[#141413]" />
            Q3
          </div>
          <div>
            <div className="h-10 border border-[#141413] dither-50" />
            Q4
          </div>
        </div>
      </div>
    </div>
  );
}

function MagiDemo({ isEn }: { isEn: boolean }) {
  const [votes, setVotes] = useState([true, true, true]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let ph = 0;
    let id = 0;
    const loop = () => {
      const c = canvasRef.current;
      if (c) {
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#050806";
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.strokeStyle = "#22ff66";
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let x = 0; x < c.width; x++) {
            const y = c.height / 2 + Math.sin(x * 0.05 + ph) * 16 + Math.sin(x * 0.12 - ph * 1.5) * 6;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ph += 0.09;
        }
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const okCount = votes.filter(Boolean).length;
  const names = ["MELCHIOR", "BALTHASAR", "CASPER"];

  return (
    <div className="bg-[#080a09] text-[#ff9d00] border-2 border-[#ff9d00]/70 rounded-xl p-4 font-mono space-y-3">
      <div className="magi-hazard h-2.5 w-full" />
      <div className="flex justify-between text-xs">
        <span className="bg-[#ff9d00] text-black px-2 font-bold">MAGI // CONSENSUS</span>
        <span className={okCount >= 2 ? "text-[#22ff66] font-bold" : "text-[#ff2a2a] font-bold"}>
          {okCount}/3 {okCount >= 2 ? "APPROVED" : "REJECTED"}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
        {names.map((n, idx) => {
          const ok = votes[idx];
          return (
            <div
              key={n}
              className={`magi-oct border p-2.5 ${
                ok ? "border-[#22ff66] bg-[#22ff66]/15" : "border-[#ff2a2a] bg-[#ff2a2a]/20"
              }`}
            >
              <div className="opacity-70">{n}</div>
              <b className={ok ? "text-[#22ff66]" : "text-[#ff2a2a]"}>{ok ? "APPROVE" : "VETO"}</b>
            </div>
          );
        })}
      </div>
      <canvas ref={canvasRef} width={360} height={58} className="w-full h-14 bg-black border border-[#ff9d00]/40" />
      <button
        type="button"
        onClick={() => setVotes([Math.random() > 0.28, Math.random() > 0.28, Math.random() > 0.28])}
        className="w-full py-1.5 bg-[#ff9d00] text-black font-bold text-xs cursor-pointer"
      >
        {isEn ? "⚡ Re-Run Agent Consensus Vote" : "⚡ 重新发起智能体表决"}
      </button>
    </div>
  );
}

function XuanDemo({ isEn }: { isEn: boolean }) {
  const [sealed, setSealed] = useState(0);

  return (
    <div className="bg-[#f7f4eb] p-5 rounded-xl border border-[#dcd5c5]">
      <div className="wusilan-outer">
        <div className="wusilan-inner p-5 space-y-4 relative font-serif">
          <div className="flex items-center justify-between border-b border-[#22201d]/25 pb-3 text-xs">
            <span className="px-3 py-1 bg-[#22201d] text-[#f7f4eb] tracking-widest">
              {isEn ? "VOL. I · WOODBLOCK" : "卷一 · 宋刻规制"}
            </span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 border border-[#b82925] text-[#b82925] font-bold">「审定」</span>
              <span className="px-2 py-0.5 bg-[#b82925] text-[#f7f4eb] font-bold">珍本</span>
            </div>
          </div>
          <h3 className="text-base font-bold text-[#1c1a17]">
            {isEn ? "Wusilan Double Rules & Xuan Paper Whitespace" : "乌丝双细线栏格与宣纸留白"}
          </h3>
          <p className="text-xs leading-6 text-[#4a463f]">
            {isEn
              ? "Outer heavy rule paired with an inner hairline frame, anchored by a single cinnabar stone seal:"
              : "外粗内细双线为栏，一点朱砂印泥压阵。点击下方按钮体验钤印交互："}
          </p>
          <div className="flex items-center gap-3">
            <input
              placeholder={isEn ? "Inscribe margin note..." : "题写批注…"}
              className="bg-transparent border-b border-[#22201d]/50 py-1 text-xs text-[#22201d] focus:outline-none focus:border-[#b82925]"
            />
            <button
              type="button"
              onClick={() => setSealed((s) => s + 1)}
              className="px-3.5 py-1.5 bg-[#b82925] text-[#f7f4eb] text-xs tracking-widest cursor-pointer"
            >
              {isEn ? "Press Seal" : "钤印准奏"}
            </button>
          </div>
          {sealed > 0 && (
            <div
              key={sealed}
              className="stamp-anim absolute right-5 bottom-4 w-14 h-14 border-2 border-[#b82925] text-[#b82925] flex items-center justify-center text-center text-xs font-bold leading-tight pointer-events-none"
            >
              准予
              <br />
              刊行
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FLAP_MSGS = ["BUILD · PASSED", "DEPLOY · LIVE ", "GATE 07 · OPEN"];

function SplitFlapDemo({ isEn }: { isEn: boolean }) {
  const [idx, setIdx] = useState(0);
  const str = FLAP_MSGS[idx % FLAP_MSGS.length];

  return (
    <div className="bg-[#16171a] text-white rounded-xl p-5 font-mono space-y-4">
      <div className="bg-[#ffd100] text-[#141414] px-3.5 py-2 rounded font-bold text-xs flex justify-between">
        <span>✈ DEPARTURES // SPLIT-FLAP</span>
        <span>GATE B07</span>
      </div>
      <div key={idx} className="flex flex-wrap gap-1.5">
        {[...str].map((ch, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 20}ms` }}
            className="flap-cell flap-anim w-6 h-9 rounded flex items-center justify-center text-sm font-bold text-[#ffd100]"
          >
            {ch === " " ? "\u00A0" : ch}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIdx((n) => n + 1)}
        className="px-3.5 py-1.5 rounded bg-[#ffd100] text-[#141414] text-xs font-bold cursor-pointer"
      >
        {isEn ? "↻ Flip Mechanical Leaves" : "↻ 点击翻动机械叶片"}
      </button>
    </div>
  );
}

function RisoDemo({ isEn }: { isEn: boolean }) {
  const [offset, setOffset] = useState(5);

  return (
    <div className="riso-paper rounded-xl p-5 border-2 border-[#0078bf] space-y-4">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-bold">RISO SOY-INK OVERPRINT</span>
        <label className="flex items-center gap-2">
          {isEn ? "Offset:" : "错位偏移:"}
          <input
            type="range"
            min={0}
            max={12}
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="w-24 accent-[#ff48b0]"
          />
        </label>
      </div>
      <div className="relative p-1">
        <div
          className="riso-mul absolute inset-0 border-2 border-[#ff48b0] bg-[#ff48b0]/20 rounded-lg pointer-events-none"
          style={{ transform: `translate(${offset}px, ${offset}px)` }}
        />
        <div className="riso-mul relative border-2 border-[#0078bf] bg-white/70 rounded-lg p-4 space-y-2">
          <span className="inline-block px-2 py-0.5 bg-[#ff48b0] text-white font-mono text-xs font-bold">
            ZINE ISSUE № 08
          </span>
          <div className="text-lg font-black text-[#0078bf]">MISREGISTERED BEAUTY</div>
          <p className="text-xs">
            {isEn
              ? "Slide the offset control above to inspect Fluorescent Pink × Risograph Blue multiply overprinting."
              : "拖动上方滑块观察荧光粉与群青蓝双色版面的正片叠底错位效果。"}
          </p>
        </div>
      </div>
    </div>
  );
}

function ApothecaryDemo() {
  const [pct, setPct] = useState(70);

  return (
    <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg, #4b2509, #7c3f11)" }}>
      <div className="bg-[#f4f1ea] text-[#121211] border-2 border-[#121211] p-4 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-8 space-y-2 font-mono text-xs">
          <div className="border-b-4 border-[#121211] pb-1.5 font-sans text-base font-black">No. 09 — COMPOUND SPEC</div>
          <div className="flex justify-between border-b border-[#121211] py-1">
            <b>SOLVENT</b>
            <span>DISTILLED_RAG</span>
          </div>
          <div className="flex justify-between border-b-2 border-[#121211] py-1">
            <b>DOSAGE</b>
            <span>
              {pct}% ({Math.round(pct * 5)} mL)
            </span>
          </div>
          <div className="flex gap-1.5 pt-1">
            {[35, 70, 92].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setPct(v)}
                className={`px-2 py-1 border border-[#121211] cursor-pointer ${
                  pct === v ? "bg-[#121211] text-white" : ""
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex justify-center">
          <div className="w-16 h-32 border-2 border-[#121211] rounded-b-lg bg-white relative overflow-hidden flex items-end">
            <div
              className="w-full bg-[#b45309]/80 border-t-2 border-[#78350f] transition-all duration-500"
              style={{ height: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TapeDeckDemo() {
  const [angle, setAngle] = useState(-10);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(Math.round(-24 + Math.random() * 50));
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="rounded-xl p-4 border border-[#a8a396] font-mono space-y-3"
      style={{ background: "linear-gradient(180deg, #dcd9d0, #c2beb2)", color: "#1d1d1b" }}
    >
      <div className="flex justify-between text-xs font-bold border-b border-[#9e998c] pb-1.5">
        <span>NAKA-DECK // CrO₂</span>
        <span>VU METER</span>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div className="bg-[#232220] p-4 rounded-lg flex justify-around items-center">
          <div className="reel-spin w-12 h-12 rounded-full border-4 border-[#e5e1d8] flex items-center justify-center">
            <span className="w-3 h-3 rounded-full border border-dashed border-amber-400" />
          </div>
          <div className="reel-spin w-12 h-12 rounded-full border-4 border-[#e5e1d8] flex items-center justify-center">
            <span className="w-3 h-3 rounded-full border border-dashed border-amber-400" />
          </div>
        </div>
        <div className="vu-window rounded-lg p-3 h-28 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between text-xs font-bold">
            <span>-20 -5 0</span>
            <span className="text-[#b91c1c]">+3dB</span>
          </div>
          <div className="relative h-10 flex justify-center items-end">
            <div
              className="w-0.5 h-20 bg-[#b91c1c] origin-bottom transition-transform duration-150"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AtomicPurpleDemo({ isEn }: { isEn: boolean }) {
  const [alpha, setAlpha] = useState(42);
  const [lcd, setLcd] = useState("▶ PRESS A OR B RUBBER BUTTON");

  return (
    <div className="relative bg-[#231636] text-purple-100 rounded-xl p-5 overflow-hidden border-2 border-purple-400/50">
      <svg
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        viewBox="0 0 400 180"
        preserveAspectRatio="none"
      >
        <path
          d="M10 35 H120 L150 65 H290 L320 35 H390 M25 145 H160 L190 115 H360"
          stroke="#c084fc"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="120" cy="35" r="4.5" fill="#fbbf24" />
        <circle cx="290" cy="65" r="4.5" fill="#fbbf24" />
        <circle cx="160" cy="145" r="4.5" fill="#fbbf24" />
      </svg>
      <div
        className="atomic-frost relative z-10 rounded-xl p-4 border border-purple-300/40 space-y-3 font-mono text-xs"
        style={{ background: `rgba(126, 58, 242, ${alpha / 100})` }}
      >
        <div className="flex justify-between items-center">
          <b>ATOMIC PURPLE SHELL</b>
          <label className="flex items-center gap-1.5">
            {isEn ? "Translucency" : "透光度"}
            <input
              type="range"
              min={15}
              max={80}
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-20 accent-amber-400"
            />
          </label>
        </div>
        <div className="bg-[#151121]/90 p-3 rounded text-emerald-300 font-bold">{lcd}</div>
        <div className="flex justify-end gap-3 pr-2">
          <button
            type="button"
            onClick={() => setLcd("▶ BUTTON B PRESSED")}
            className="w-9 h-9 rounded-full bg-rose-500 text-white font-black shadow-[0_3px_0_#9f1239] active:translate-y-0.5 cursor-pointer"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => setLcd("▶ BUTTON A LAUNCH!")}
            className="w-9 h-9 rounded-full bg-emerald-400 text-zinc-950 font-black shadow-[0_3px_0_#065f46] active:translate-y-0.5 cursor-pointer"
          >
            A
          </button>
        </div>
      </div>
    </div>
  );
}

function CorkboardDemo({ isEn }: { isEn: boolean }) {
  const [revA, setRevA] = useState(false);
  const [revB, setRevB] = useState(false);

  return (
    <div className="cork-surface rounded-xl p-5 border-4 border-[#5c3d1e] relative">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        viewBox="0 0 400 170"
        preserveAspectRatio="none"
      >
        <path d="M 105 26 Q 200 68 295 28" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      </svg>
      <div className="grid grid-cols-2 gap-4 relative z-10 font-mono text-xs">
        <div className="bg-[#efe4c8] text-[#1f1c18] p-3.5 shadow-md -rotate-1 space-y-1.5">
          <div className="w-4 h-4 rounded-full bg-rose-600 border-2 border-white mx-auto -mt-5 shadow" />
          <b className="text-rose-700 block">DOSSIER #A</b>
          <p>
            {isEn ? "Codename " : "代号 "}
            <span onClick={() => setRevA((r) => !r)} className={`redacted ${revA ? "revealed" : ""}`}>
              PROJECT-OWL
            </span>
            {isEn ? " connected at dawn (click bar)." : " 已于凌晨接入（点击黑条揭秘）。"}
          </p>
        </div>
        <div className="bg-[#fef08a] text-[#1c1917] p-3.5 shadow-md rotate-1 space-y-1.5">
          <div className="w-4 h-4 rounded-full bg-rose-600 border-2 border-white mx-auto -mt-5 shadow" />
          <b className="underline block">CLUE #B</b>
          <p>
            {isEn ? "Key hash points to " : "密钥散列指向 "}
            <span onClick={() => setRevB((r) => !r)} className={`redacted ${revB ? "revealed" : ""}`}>
              SECTOR-09
            </span>
            {isEn ? " node." : " 节点。"}
          </p>
        </div>
      </div>
    </div>
  );
}
