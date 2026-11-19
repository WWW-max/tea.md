"use client";

import { useEffect, useRef, useState } from "react";
import type { StyleEntry } from "./almanac-data";
import { useI18n } from "./i18n-context";

export function RichStyleShowcase({ item }: { item: StyleEntry }) {
  const { locale } = useI18n();
  const isEn = locale === "en";
  const slug = item.slug;

  const renderHeroApparatus = () => {
    if (item.customPreviewHtml) {
      return (
        <iframe
          title={`${item.en} custom preview`}
          srcDoc={item.customPreviewHtml}
          sandbox="allow-scripts"
          className="w-full min-h-[340px] rounded-xl border border-border bg-background"
        />
      );
    }

    switch (slug) {
      case "tactile-synth":
        return <TactileRichShowcase isEn={isEn} />;
      case "cad-blueprint":
        return <BlueprintRichShowcase isEn={isEn} />;
      case "thermal-receipt":
        return <ReceiptRichShowcase isEn={isEn} />;
      case "eink-gc16":
        return <EinkRichShowcase isEn={isEn} />;
      case "magi-terminal":
        return <MagiRichShowcase isEn={isEn} />;
      case "xuan-wusilan":
        return <XuanRichShowcase isEn={isEn} />;
      case "split-flap":
        return <SplitFlapRichShowcase isEn={isEn} />;
      case "risograph-print":
        return <RisoRichShowcase isEn={isEn} />;
      case "swiss-apothecary":
        return <ApothecaryRichShowcase isEn={isEn} />;
      case "analog-tape-deck":
        return <TapeDeckRichShowcase isEn={isEn} />;
      case "atomic-purple":
        return <AtomicPurpleRichShowcase isEn={isEn} />;
      case "corkboard-dossier":
        return <CorkboardRichShowcase isEn={isEn} />;
      case "looseleaf-sketch":
        return <LooseleafRichShowcase isEn={isEn} />;
      case "pixel-8bit":
        return <Pixel8BitRichShowcase isEn={isEn} />;
      case "neobrutalism":
        return <NeobrutalismRichShowcase isEn={isEn} />;
      case "aurora-spotlight":
        return <AuroraSpotlightRichShowcase isEn={isEn} />;
      default:
        return <AutoCommunityHeroStage item={item} isEn={isEn} />;
    }
  };

  return (
    <div className="space-y-6">
      {renderHeroApparatus()}
      {SPECIMEN_THEMES[slug] ? (
        <StyleSpecimenExtension slug={slug} isEn={isEn} />
      ) : (
        <AutoCommunitySpecimen item={item} isEn={isEn} />
      )}
    </div>
  );
}

function AutoCommunityHeroStage({ item, isEn }: { item: StyleEntry; isEn: boolean }) {
  const [meter, setMeter] = useState(72);
  const bg = item.swatches[0]?.[0] ?? "#f5f5f0";
  const ink = item.swatches[1]?.[0] ?? "#18181b";
  const accent = item.swatches[2]?.[0] ?? ink;
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
      ? `5px 5px 0 ${ink}`
      : item.tokens?.shadow === "soft"
        ? "0 12px 28px rgba(0,0,0,0.14)"
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
      className={`${fontCls} p-6 space-y-4`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-current/20 text-xs">
        <span className="font-bold uppercase tracking-wider">{item.en}</span>
        <span
          style={{ backgroundColor: accent, color: bg, borderRadius: radius }}
          className="px-2.5 py-0.5 font-bold"
        >
          {item.slug.toUpperCase()}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{isEn ? item.en : item.name}</h3>
        <p className="text-xs opacity-85 leading-relaxed">
          {isEn ? item.originEn : item.origin}
        </p>
      </div>
      <div className="space-y-1.5 text-xs pt-1">
        <div className="flex justify-between font-bold">
          <span>{isEn ? "INTERACTIVE INTENSITY" : "交互参数预览"}</span>
          <span>{meter}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          value={meter}
          onChange={(e) => setMeter(Number(e.target.value))}
          style={{ accentColor: accent }}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
}

function AutoCommunitySpecimen({ item, isEn }: { item: StyleEntry; isEn: boolean }) {
  const bg = item.swatches[0]?.[0] ?? "#f5f5f0";
  const ink = item.swatches[1]?.[0] ?? "#18181b";
  const accent = item.swatches[2]?.[0] ?? ink;
  const radius = item.tokens?.radius ?? "8px";
  const bw = item.tokens?.borderWidth ?? "1.5px";
  const fontCls =
    item.tokens?.font === "serif"
      ? "font-serif"
      : item.tokens?.font === "sans"
        ? "font-sans"
        : "font-mono";

  return (
    <div
      style={{
        backgroundColor: bg,
        color: ink,
        borderRadius: radius,
        border: `${bw} solid ${ink}`,
      }}
      className={`${fontCls} p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs`}
    >
      <div style={{ border: `1px solid ${ink}`, borderRadius: radius }} className="p-4 space-y-3">
        <div className="font-bold uppercase">{isEn ? "CONTROLS & INPUT" : "基础按钮与表单标本"}</div>
        <div className="flex gap-2">
          <button
            type="button"
            style={{ backgroundColor: accent, color: bg, borderRadius: radius }}
            className="px-3.5 py-1.5 font-bold cursor-pointer"
          >
            {isEn ? "Primary Action" : "主操作按钮"}
          </button>
          <button
            type="button"
            style={{ border: `1px solid ${ink}`, borderRadius: radius }}
            className="px-3.5 py-1.5 font-bold cursor-pointer"
          >
            {isEn ? "Secondary" : "次要操作"}
          </button>
        </div>
        <input
          defaultValue={isEn ? "Sample input..." : "输入示例文本…"}
          style={{ border: `1px solid ${ink}`, borderRadius: radius }}
          className="w-full bg-transparent px-3 py-1.5 focus:outline-none"
        />
      </div>
      <div style={{ border: `1px solid ${ink}`, borderRadius: radius }} className="p-4 space-y-2">
        <div className="font-bold uppercase">{isEn ? "GUARDRAIL SUMMARY" : "核心设计约束"}</div>
        {(isEn ? item.dontsEn : item.donts).slice(0, 3).map((d, i) => (
          <div key={i} className="opacity-85">
            • {d}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   01. 工业硬件合成器完整工作台 (Braun × Teenage Engineering)
============================================================================ */
function TactileRichShowcase({ isEn }: { isEn: boolean }) {
  const [temp, setTemp] = useState(72);
  const [tokens, setTokens] = useState(4096);
  const [gain, setGain] = useState(68);
  const [status, setStatus] = useState("READY");
  const [soundOn, setSoundOn] = useState(true);
  const [steps, setSteps] = useState([true, false, true, true, false, true, false, true]);
  const audioRef = useRef<AudioContext | null>(null);

  const playClick = (freq = 1200) => {
    if (!soundOn) return;
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioRef.current = new Ctx();
      }
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.02);
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {
      // ignore audio block
    }
  };

  const dragKnob = (
    e: React.MouseEvent,
    startVal: number,
    min: number,
    max: number,
    scale: number,
    setter: (v: number) => void
  ) => {
    e.preventDefault();
    const startY = e.clientY;
    const onMove = (ev: MouseEvent) => {
      const next = Math.min(max, Math.max(min, Math.round(startVal + (startY - ev.clientY) * scale)));
      setter(next);
    };
    const onUp = () => {
      playClick(1350);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const activeBars = Math.round((gain / 100) * 16);

  return (
    <div className="te-chassis rounded-2xl p-5 md:p-6 border border-[#c7c4ba] font-mono space-y-5">
      {/* 顶部铭牌与声音开关 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#ccc9bf]">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#ff5500] shadow-[0_0_8px_#ff5500]" />
          <span className="text-xs font-bold tracking-widest uppercase">
            TX-01 // FIELD AGENT SYNTHESIZER
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#d5d2c8] text-[#55544f]">REV.B</span>
        </div>
        <button
          type="button"
          onClick={() => setSoundOn((s) => !s)}
          className="flex items-center gap-2 text-xs cursor-pointer"
        >
          <span className="text-[#575651]">{isEn ? "CLICK AUDIO" : "机械按键音"}</span>
          <span className="te-recess w-10 h-5 rounded-full p-0.5 flex items-center">
            <span
              className="w-4 h-4 rounded-full transition-transform"
              style={{
                transform: soundOn ? "translateX(18px)" : "translateX(0px)",
                backgroundColor: soundOn ? "#ff5500" : "#7a7870",
              }}
            />
          </span>
        </button>
      </div>

      {/* 中部主控区：LCD 监视屏 + 双阻尼旋钮推子 + 机械键帽 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        <div className="xl:col-span-5 te-lcd rounded-xl p-4 border border-[#7c8970] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs border-b border-[#1b2416]/25 pb-2">
            <span className="font-bold">PATCH: AUTONOMOUS_V3</span>
            <span className="px-1.5 py-0.5 bg-[#1b2416] text-[#9ba88d] rounded-sm font-bold">
              {status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs opacity-75">TEMP (K1)</div>
              <div className="text-2xl font-bold">{(temp / 100).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs opacity-75">MAX TOKENS (K2)</div>
              <div className="text-2xl font-bold">{tokens}</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs opacity-80">
              <span>DSP THROUGHPUT</span>
              <span>{gain}%</span>
            </div>
            <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1 h-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full rounded-[1px] ${
                    i < activeBars ? "bg-[#1b2416]" : "bg-[#1b2416]/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 te-recess rounded-xl p-4 flex items-center justify-around gap-2 select-none">
          <div className="flex flex-col items-center gap-2">
            <div
              onMouseDown={(e) => dragKnob(e, temp, 0, 100, 0.7, setTemp)}
              onClick={() => {
                playClick();
                setTemp((v) => (v + 12) % 101);
              }}
              title={isEn ? "Drag vertically or click" : "上下拖拽或点击旋转"}
              className="w-16 h-16 rounded-full bg-[#26272b] shadow-[0_5px_10px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center cursor-ns-resize"
            >
              <div
                className="w-full h-full relative"
                style={{ transform: `rotate(${-135 + temp * 2.7}deg)` }}
              >
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-[#ff5500]" />
              </div>
            </div>
            <span className="text-xs font-bold text-[#3f3e3a]">TEMP ↕</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              onMouseDown={(e) => dragKnob(e, tokens, 512, 8192, 36, setTokens)}
              onClick={() => {
                playClick();
                setTokens((v) => (v >= 8192 ? 1024 : v + 1024));
              }}
              title={isEn ? "Drag vertically or click" : "上下拖拽或点击旋转"}
              className="w-16 h-16 rounded-full bg-[#f3f1eb] shadow-[0_5px_10px_rgba(0,0,0,0.22),inset_0_2px_1px_#ffffff] border border-[#c2bfb6] flex items-center justify-center cursor-ns-resize"
            >
              <div
                className="w-full h-full relative"
                style={{
                  transform: `rotate(${-135 + ((tokens - 512) / (8192 - 512)) * 270}deg)`,
                }}
              >
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-[#232426]" />
              </div>
            </div>
            <span className="text-xs font-bold text-[#3f3e3a]">TOKENS ↕</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={gain}
              onChange={(e) => setGain(Number(e.target.value))}
              className="w-20 accent-[#ff5500] cursor-pointer"
            />
            <span className="text-xs font-bold text-[#3f3e3a]">GAIN</span>
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col justify-between gap-3">
          <input
            type="text"
            defaultValue="agent_chain_01.patch"
            className="te-recess rounded-lg px-3 py-2 text-xs text-[#1e1f22] focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
          />
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                playClick(950);
                setStatus("RUNNING");
              }}
              className="te-key te-key-orange rounded-lg py-2.5 text-xs font-bold cursor-pointer"
            >
              ▶ RUN
            </button>
            <button
              type="button"
              onClick={() => {
                playClick(1100);
                setStatus("REC ●");
              }}
              className="te-key bg-[#f2f0ea] text-[#232426] rounded-lg py-2.5 text-xs font-bold cursor-pointer"
            >
              ● REC
            </button>
            <button
              type="button"
              onClick={() => {
                playClick(860);
                setStatus("MUTED");
              }}
              className="te-key bg-[#f0a800] text-[#1e1f22] rounded-lg py-2.5 text-xs font-bold cursor-pointer"
            >
              MUTE
            </button>
            <button
              type="button"
              onClick={() => {
                playClick(720);
                setStatus("STANDBY");
              }}
              className="te-key bg-[#26272b] text-white rounded-lg py-2.5 text-xs font-bold cursor-pointer"
            >
              ■ STOP
            </button>
          </div>
        </div>
      </div>

      {/* 底部：8 步进硬件音序器/任务流水线开关阵列 */}
      <div className="te-recess rounded-xl p-4 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#3f3e3a]">
            {isEn
              ? "8-STEP PIPELINE SEQUENCER (CLICK PADS TO TOGGLE STAGE)"
              : "8 步进流水线触发器（点击实体琴键垫切换节点启停）"}
          </span>
          <span className="text-[#575651]">
            ACTIVE: {steps.filter(Boolean).length}/8
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {steps.map((on, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                playClick(1400);
                setSteps((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
              }}
              className="te-key bg-[#f2f0ea] rounded-lg p-2 flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  on ? "bg-[#ff5500] shadow-[0_0_6px_#ff5500]" : "bg-[#b5b2a8]"
                }`}
              />
              <span className="text-xs font-bold text-[#232426]">S0{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   02. 工程蓝图与 CAD 精密制图完整工作台
============================================================================ */
function BlueprintRichShowcase({ isEn }: { isEn: boolean }) {
  const [dark, setDark] = useState(true);
  const [coords, setCoords] = useState("X: 0240 // Y: 0118");
  const [stampIdx, setStampIdx] = useState(0);
  const [compact, setCompact] = useState(false);
  const [widthPx, setWidthPx] = useState(520);
  const [pin, setPin] = useState<1 | 2 | 3>(1);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidthPx(Math.round(entry.contentRect.width));
    });
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, []);

  const stamps = [
    { label: "[STAMP: APPROVED]", cls: "border-emerald-400 text-emerald-400" },
    { label: "[STAMP: DRAFT REV.2]", cls: "border-amber-400 text-amber-400" },
    { label: "[STAMP: HOLD]", cls: "border-rose-400 text-rose-400" },
  ];

  const pinDetails = {
    1: isEn
      ? ["[NODE 01] Dual-Isolated Power Bus", "Automatic transfer switch (<4ms ATS), 96.4% peak load efficiency under REV-9 spec."]
      : ["[NODE 01] 双路隔离供电总线", "采用主备自动切换（ATS < 4ms），峰值负载效率 96.4%，符合工程制图 REV-9 标准。"],
    2: isEn
      ? ["[NODE 02] Negative-Pressure Cooling Duct", "Static turbine array maintains core junction below 62°C at <24dBA acoustic floor."]
      : ["[NODE 02] 定向负压散热风道", "静压涡轮阵列维持核心结温低于 62°C，全速噪声严格控制在 24dBA 以内。"],
    3: isEn
      ? ["[NODE 03] Dual-Ring Optical Mesh", "40Gbps self-healing ring topology with <80μs single-cut reroute latency."]
      : ["[NODE 03] 光纤环形冗余总线", "支持 40Gbps 双环自愈拓扑，单点断线自动重路由耗时 < 80μs。"],
  };

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = String(Math.max(0, Math.round(e.clientX - r.left))).padStart(4, "0");
        const y = String(Math.max(0, Math.round(e.clientY - r.top))).padStart(4, "0");
        setCoords(`X: ${x} // Y: ${y}`);
      }}
      className={`${dark ? "bp-dark" : "bp-light"} p-5 md:p-6 border bp-b font-mono space-y-5 transition-colors`}
    >
      {/* 工程图签头 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border bp-bs p-3 bg-sky-500/10 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 border bp-b font-bold">DWG NO. AG-2049</span>
          <span>SCALE 1:1</span>
          <span className="opacity-80">{coords}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="px-2.5 py-1 border bp-b hover:bg-sky-400/20 cursor-pointer"
          >
            {isEn ? "Switch Cyanotype / Vellum" : "切换蓝图底色 (深蓝 / 硫酸纸白)"}
          </button>
          <button
            type="button"
            onClick={() => setStampIdx((i) => (i + 1) % stamps.length)}
            className={`px-2.5 py-1 border-2 font-bold cursor-pointer ${stamps[stampIdx].cls}`}
          >
            {stamps[stampIdx].label}
          </button>
        </div>
      </div>

      {/* 主制图区：左动态标尺容器 + 右引出线批注 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 space-y-2">
          <div className="flex items-center gap-2 text-xs opacity-80 select-none">
            <span>├</span>
            <div className="h-px flex-1 border-t border-dashed bp-b" />
            <span>W: {widthPx}px</span>
            <div className="h-px flex-1 border-t border-dashed bp-b" />
            <span>┤</span>
          </div>

          <div
            ref={boxRef}
            style={{ width: compact ? "74%" : "100%" }}
            className="relative border bp-b p-4 space-y-4 bg-sky-500/5 transition-all"
          >
            <span className="absolute -top-2 -left-1.5 text-xs font-bold">+</span>
            <span className="absolute -top-2 -right-1.5 text-xs font-bold">+</span>
            <span className="absolute -bottom-2 -left-1.5 text-xs font-bold">+</span>
            <span className="absolute -bottom-2 -right-1.5 text-xs font-bold">+</span>

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">MODULE // VECTOR_ROUTER_CORE</span>
              <span className="opacity-70">TOLERANCE ±0.02ms</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <label className="space-y-1 block">
                <span className="opacity-75">MESH_ENDPOINT</span>
                <input
                  type="text"
                  defaultValue="wss://core.mesh/v2"
                  className="w-full bg-transparent border bp-bs px-2.5 py-1.5 text-xs focus:outline-none"
                />
              </label>
              <label className="space-y-1 block">
                <span className="opacity-75">MAX_RETRIES</span>
                <input
                  type="number"
                  defaultValue={4}
                  className="w-full bg-transparent border bp-bs px-2.5 py-1.5 text-xs focus:outline-none"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => setCompact((c) => !c)}
              className="px-3 py-1.5 border bp-b bg-sky-400/20 hover:bg-sky-400/30 text-xs font-bold cursor-pointer"
            >
              {isEn
                ? "↔ Toggle Container Width (Watch Live CAD Ruler)"
                : "↔ 测试伸缩容器宽度（观察上方 CAD 标尺实时重算）"}
            </button>
          </div>
        </div>

        {/* 折线引出批注与参数表 */}
        <div className="xl:col-span-5 space-y-4">
          <div className="border border-dashed bp-bs p-4 space-y-3 text-xs">
            <div className="font-bold uppercase opacity-80">
              {isEn ? "INSPECT CALLOUT PINS:" : "点击查看工程批注锚点 (Callout Pins)："}
            </div>
            <div className="flex flex-wrap gap-2">
              {([1, 2, 3] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPin(n)}
                  className={`px-2.5 py-1 border text-xs cursor-pointer ${
                    pin === n ? "bp-b bg-sky-400/25 font-bold" : "bp-bs opacity-75"
                  }`}
                >
                  [0{n}] {isEn ? `NODE_0${n}` : n === 1 ? "供电拓扑" : n === 2 ? "散热风道" : "冗余总线"}
                </button>
              ))}
            </div>
            <div className="relative pl-5 pt-2 border-l bp-b space-y-1">
              <div className="absolute left-0 top-4 w-4 border-t bp-b" />
              <div className="font-bold">{pinDetails[pin][0]}</div>
              <p className="opacity-80 leading-relaxed">{pinDetails[pin][1]}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 border bp-bs divide-x bp-bs text-center text-xs">
            <div className="p-2.5">
              <div className="opacity-65">UPTIME</div>
              <div className="font-bold text-sm mt-0.5">99.98%</div>
            </div>
            <div className="p-2.5">
              <div className="opacity-65">LATENCY</div>
              <div className="font-bold text-sm mt-0.5">11.4ms</div>
            </div>
            <div className="p-2.5">
              <div className="opacity-65">REVISION</div>
              <div className="font-bold text-sm mt-0.5">R-09</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   03. 热敏小票与报刊半调网点完整工作台
============================================================================ */
function ReceiptRichShowcase({ isEn }: { isEn: boolean }) {
  const [items, setItems] = useState([
    { name: "1x CLAUDE-AGENT-LOOP (18k)", price: 0.06 },
    { name: "3x MCP-VECTOR-LOOKUP", price: 0.03 },
    { name: "1x SANDBOX-COMPILE (3.8s)", price: 0.02 },
  ]);
  const [stamped, setStamped] = useState(0);
  const [torn, setTorn] = useState(false);
  const [dotStep, setDotStep] = useState(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width: w, height: h } = canvas;
    ctx.fillStyle = "#faf7ef";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#191918";

    const cx = w * 0.48;
    const cy = h * 0.5;
    const maxR = Math.min(w, h) * 0.43;

    for (let y = dotStep / 2; y < h; y += dotStep) {
      for (let x = dotStep / 2; x < w; x += dotStep) {
        const dist = Math.hypot(x - cx, y - cy);
        let darkness = 0.1 + (x / w) * 0.2;
        if (dist < maxR) {
          const lx = (x - (cx - maxR * 0.35)) / maxR;
          const ly = (y - (cy - maxR * 0.35)) / maxR;
          darkness = Math.min(0.95, Math.max(0.06, Math.hypot(lx, ly) * 0.68));
        }
        const r = dotStep * 0.52 * darkness;
        if (r > 0.4) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, [dotStep]);

  const total = items.reduce((acc, x) => acc + x.price, 0);

  return (
    <div className="bg-[#dcd8cf] p-5 md:p-6 rounded-xl">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* 左侧：完整锯齿热敏纸账单 */}
        <div className="xl:col-span-7">
          <div className="receipt-saw-top" />
          <div className="bg-[#faf7ef] text-[#191918] px-6 py-4 font-mono text-xs space-y-3 relative shadow-lg">
            <div className="text-center space-y-0.5">
              <div className="text-base font-bold tracking-widest">TEA.MD PRESS &amp; CO.</div>
              <div className="text-[#57554f]">POS TERM #08 // API USAGE RECEIPT</div>
              <div className="text-[#57554f]">================================</div>
            </div>

            <div className="space-y-1.5">
              {items.map((it, i) => (
                <div key={i} className="flex justify-between">
                  <span>{it.name}</span>
                  <span className="font-bold">${it.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="text-[#57554f]">--------------------------------</div>
            <div className="flex justify-between text-sm font-bold">
              <span>TOTAL DUE</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="relative py-1.5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setItems((prev) => [
                    ...prev,
                    { name: "1x VISION-HALFTONE-PASS", price: 0.03 },
                  ])
                }
                className="px-3 py-1.5 border border-[#191918] bg-white hover:bg-[#191918] hover:text-white font-bold transition cursor-pointer"
              >
                {isEn ? "+ Feed New Line Item" : "+ 吐出新账单明细"}
              </button>
              <button
                type="button"
                onClick={() => setStamped((s) => s + 1)}
                className="px-3 py-1.5 border border-[#c82824] text-[#c82824] hover:bg-[#c82824] hover:text-white font-bold transition cursor-pointer"
              >
                {isEn ? "💮 Slam PAID Stamp" : "💮 盖「PAID」橡胶戳"}
              </button>

              {stamped > 0 && (
                <div
                  key={stamped}
                  className="stamp-anim pointer-events-none absolute right-2 -top-2 border-2 border-[#c82824] text-[#c82824] px-3 py-0.5 font-bold tracking-widest text-sm"
                >
                  PAID · 2026
                </div>
              )}
            </div>

            {/* 虚线可撕副券 + 条形码 */}
            <div
              style={{
                transform: torn ? "translateY(12px) rotate(2deg)" : "none",
                opacity: torn ? 0.55 : 1,
              }}
              className="pt-2.5 border-t-2 border-dashed border-[#8c8980] space-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-between text-[#57554f]">
                <span>✂ {isEn ? "COUPON STUB: 50K FREE TOKENS" : "优惠副券：首月赠送 50K 额度"}</span>
                <button
                  type="button"
                  onClick={() => setTorn((t) => !t)}
                  className="underline font-bold text-[#191918] cursor-pointer"
                >
                  {torn ? (isEn ? "Re-attach" : "粘回副券") : isEn ? "Tear Stub" : "点击沿虚线撕下"}
                </button>
              </div>
              <svg className="w-full h-9" viewBox="0 0 240 32" preserveAspectRatio="none">
                <g fill="#191918">
                  {[4, 11, 16, 24, 30, 36, 45, 51, 58, 64, 72, 78, 87, 93, 100, 108, 115, 121, 130, 137, 144, 152, 159, 166, 174, 181, 188, 196, 204, 211, 219, 226, 233].map(
                    (x, idx) => (
                      <rect key={x} x={x} width={(idx % 3) + 1.5} height="32" />
                    )
                  )}
                </g>
              </svg>
            </div>
          </div>
          <div className="receipt-saw-bottom" />
        </div>

        {/* 右侧：报刊半调网点渲染工作台 */}
        <div className="xl:col-span-5 bg-[#faf7ef] text-[#191918] p-4 border border-[#bab4a6] font-mono text-xs space-y-3 shadow-md">
          <div className="font-bold border-b border-[#191918] pb-1.5 flex justify-between">
            <span>NEWSPRINT HALFTONE LAB</span>
            <span>1-BIT INK</span>
          </div>
          <p className="text-[#57554f] leading-relaxed">
            {isEn
              ? "Images on thermal paper and broadsheets convert luminance into dot radius rather than RGB gradients:"
              : "在热敏纸与复古报刊美学中，禁止直接放全彩原图——通过油墨圆点半径大小模拟光影层次："}
          </p>
          <canvas
            ref={canvasRef}
            width={280}
            height={170}
            className="w-full border border-[#191918] bg-[#faf7ef]"
          />
          <label className="flex items-center justify-between gap-2 pt-1">
            <span>
              {isEn ? "Dot Pitch:" : "网屏间距:"} <b>{dotStep}px</b>
            </span>
            <input
              type="range"
              min={3}
              max={11}
              value={dotStep}
              onChange={(e) => setDotStep(Number(e.target.value))}
              className="w-36 accent-[#191918]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   04. 电子墨水屏 GC16 完整阅读与点阵分析器
============================================================================ */
function EinkRichShowcase({ isEn }: { isEn: boolean }) {
  const [flashKey, setFlashKey] = useState(0);
  const [dogEar, setDogEar] = useState(false);
  const [highlighted, setHighlighted] = useState(true);

  const triggerRefresh = () => setFlashKey((k) => k + 1);

  return (
    <div className="bg-[#2c2c2a] p-4 md:p-5 rounded-2xl">
      <div
        key={flashKey}
        className={`${
          flashKey > 0 ? "eink-flash" : ""
        } bg-[#f1eee7] text-[#141413] rounded-md p-5 border-2 border-[#141413] space-y-5`}
      >
        {/* 顶部墨水屏系统状态栏 */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#141413] text-xs font-mono">
          <div className="flex items-center gap-2 font-bold">
            <span>📖 PAPER_OS 3.2</span>
            <span className="px-1.5 py-0.5 border border-[#141413]">300 PPI · CARTA 1200</span>
          </div>
          <button
            type="button"
            onClick={triggerRefresh}
            className="px-3 py-1 bg-[#141413] text-[#f1eee7] font-bold cursor-pointer"
          >
            {isEn ? "⚡ Full GC16 De-Ghost Flash" : "⚡ 触发 GC16 全局反色清残影"}
          </button>
        </div>

        {/* 主体双栏：左深度排版阅读与折角书签 + 右 1-bit 抖动灰阶图表 */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
          <div className="xl:col-span-7 relative border border-[#141413] p-5 space-y-3 font-serif">
            <button
              type="button"
              onClick={() => setDogEar((d) => !d)}
              title={isEn ? "Toggle dog-ear bookmark" : "点击折叠书签角"}
              style={{ width: dogEar ? 42 : 28, height: dogEar ? 42 : 28 }}
              className="absolute top-0 right-0 border-l border-b border-[#141413] bg-[#dfdcd3] text-xs font-mono flex items-center justify-center cursor-pointer"
            >
              {dogEar ? "★" : "折"}
            </button>

            <div className="text-xs font-mono uppercase tracking-widest">
              {isEn ? "CHAPTER 04 · CALM TECHNOLOGY" : "第四章 · 零发光界面的注意力回归"}
            </div>
            <h3 className="text-lg font-bold pr-8">
              {isEn
                ? "Why Reflective Paper Outlasts Glowing Glass"
                : "当界面取消毛玻璃与彩色渐变之后"}
            </h3>
            <p className="text-xs leading-6">
              {isEn
                ? "Electrophoretic microcapsules physically move black and white pigments without backlight flicker. "
                : "电泳微胶囊依靠物理黑白粒子翻转显影，无背光频闪与蓝紫渐变干扰。"}
              <span
                onClick={() => setHighlighted((h) => !h)}
                className={`cursor-pointer ${
                  highlighted ? "underline decoration-2 underline-offset-4 bg-[#dfdcd3] px-1" : ""
                }`}
              >
                {isEn
                  ? "Click this sentence to toggle e-reader margin ink highlight."
                  : "点击本句可切换墨水屏阅读器划线批注状态。"}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
              <span className="px-2 py-0.5 border border-[#141413] dither-25 font-bold">25% DITHER</span>
              <span className="px-2 py-0.5 border border-[#141413] dither-50 bg-[#f1eee7] font-bold">
                50% BAYER
              </span>
              <span className="px-2 py-0.5 bg-[#141413] text-[#f1eee7] font-bold">100% CARBON</span>
            </div>
          </div>

          <div className="xl:col-span-5 border border-[#141413] p-4 flex flex-col justify-between font-mono text-xs space-y-3">
            <div className="font-bold border-b border-[#141413] pb-1.5">
              {isEn ? "BAYER STIPPLE THROUGHPUT" : "1-BIT 像素抖动灰阶统计图"}
            </div>
            <div className="grid grid-cols-5 gap-2.5 items-end h-28 pt-2 border-b-2 border-[#141413]">
              {[
                ["M", "h-12 dither-25"],
                ["T", "h-16 dither-50"],
                ["W", "h-24 bg-[#141413]"],
                ["T", "h-20 dither-50"],
                ["F", "h-14 dither-25"],
              ].map(([d, cls], i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                  <div className={`w-full border border-[#141413] ${cls}`} />
                  <span>{d}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <span>BATTERY: 94% (3 WEEKS)</span>
              <span>PAGE 42 / 180</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   05. 磁带未来主义 / EVA MAGI 完整超算终端
============================================================================ */
function MagiRichShowcase({ isEn }: { isEn: boolean }) {
  const [votes, setVotes] = useState([true, true, true]);
  const [armed, setArmed] = useState(false);
  const [overrideTriggered, setOverrideTriggered] = useState(false);
  const [freq, setFreq] = useState(50);
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
          ctx.strokeStyle = "rgba(255,157,0,0.16)";
          ctx.beginPath();
          ctx.moveTo(0, c.height / 2);
          ctx.lineTo(c.width, c.height / 2);
          ctx.stroke();

          ctx.strokeStyle = overrideTriggered ? "#ff2a2a" : "#22ff66";
          ctx.lineWidth = 2;
          ctx.beginPath();
          const k = 0.02 + (freq / 100) * 0.08;
          for (let x = 0; x < c.width; x++) {
            const y =
              c.height / 2 +
              Math.sin(x * k + ph) * 20 +
              Math.sin(x * (k * 2.3) - ph * 1.6) * 8;
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
  }, [freq, overrideTriggered]);

  const okCount = votes.filter(Boolean).length;
  const nodes = [
    { name: "MELCHIOR-1", role: "ARCHITECT" },
    { name: "BALTHASAR-2", role: "SECURITY" },
    { name: "CASPER-3", role: "COST_GUARD" },
  ];

  return (
    <div className="bg-[#080a09] text-[#ff9d00] border-2 border-[#ff9d00]/80 rounded-xl p-5 font-mono space-y-4">
      <div className="magi-hazard h-3 w-full" />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#ff9d00] text-black font-bold">
            SUPERCOMPUTER // MAGI-SYS
          </span>
          <span className="text-[#22ff66]">SYNC: 99.9%</span>
        </div>
        <span
          className={`px-2.5 py-0.5 border font-bold ${
            overrideTriggered
              ? "bg-[#ff2a2a] text-black border-[#ff2a2a]"
              : okCount >= 2
                ? "border-[#22ff66] text-[#22ff66]"
                : "border-[#ff2a2a] text-[#ff2a2a]"
          }`}
        >
          {overrideTriggered
            ? "⚠ MANUAL OVERRIDE ACTIVE"
            : `CONSENSUS: ${okCount}/3 ${okCount >= 2 ? "APPROVED" : "REJECTED"}`}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* 三贤人智能体投票矩阵 */}
        <div className="xl:col-span-7 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            {nodes.map((n, i) => {
              const ok = votes[i];
              return (
                <div
                  key={n.name}
                  className={`magi-oct border-2 p-3 space-y-1 ${
                    ok
                      ? "border-[#22ff66] bg-[#22ff66]/15"
                      : "border-[#ff2a2a] bg-[#ff2a2a]/20"
                  }`}
                >
                  <div className="opacity-75">{n.name}</div>
                  <div className={`text-sm font-bold ${ok ? "text-[#22ff66]" : "text-[#ff2a2a]"}`}>
                    {ok ? "APPROVE" : "VETO"}
                  </div>
                  <div className="opacity-70">{n.role}</div>
                </div>
              );
            })}
          </div>

          {/* 双步解锁危险操作栏 */}
          <div className="border border-[#ff9d00]/40 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                setOverrideTriggered(false);
                setVotes([Math.random() > 0.28, Math.random() > 0.28, Math.random() > 0.28]);
              }}
              className="px-3 py-1.5 bg-[#ff9d00] text-black font-bold uppercase cursor-pointer"
            >
              {isEn ? "⚡ Deliberate Proposal" : "⚡ 发起三节点智能体表决"}
            </button>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={armed}
                onChange={(e) => setArmed(e.target.checked)}
                className="accent-[#ff2a2a]"
              />
              <span>{isEn ? "ARM OVERRIDE" : "解除安全保险盖"}</span>
            </label>

            <button
              type="button"
              disabled={!armed}
              onClick={() => setOverrideTriggered(true)}
              className={`px-3 py-1.5 font-bold transition ${
                armed
                  ? "bg-[#ff2a2a] text-black cursor-pointer"
                  : "border border-[#ff2a2a] text-[#ff2a2a] opacity-35 cursor-not-allowed"
              }`}
            >
              {isEn ? "☢ EXECUTE" : "☢ 强制执行"}
            </button>
          </div>
        </div>

        {/* 右侧：实时荧光示波器 */}
        <div className="xl:col-span-5 border border-[#ff9d00]/50 p-3 bg-black flex flex-col justify-between space-y-2 text-xs">
          <div className="flex justify-between">
            <span>HARMONIC WAVEFORM</span>
            <span className="text-[#22ff66]">{freq} Hz</span>
          </div>
          <canvas
            ref={canvasRef}
            width={320}
            height={90}
            className="w-full h-24 bg-[#050806] border border-[#ff9d00]/30"
          />
          <label className="flex items-center justify-between gap-2">
            <span>FREQ MODULATION</span>
            <input
              type="range"
              min={10}
              max={95}
              value={freq}
              onChange={(e) => setFreq(Number(e.target.value))}
              className="w-28 accent-[#ff9d00]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   06. 宋刻乌丝栏与宣纸朱砂印完整书院页
============================================================================ */
function XuanRichShowcase({ isEn }: { isEn: boolean }) {
  const [tab, setTab] = useState(0);
  const [sealed, setSealed] = useState(0);
  const [inkFlow, setInkFlow] = useState(true);

  const chapters = isEn
    ? [
        ["Song-Dynasty Wusilan & Editorial Whitespace", "Stripping away ornate clichés, only unbleached Xuan paper grain, double-hairline Wusilan frames, and a single touch of cinnabar paste remain."],
        ["Thread-Bound Folios & Hanging Bookmark Tabs", "Active navigation tabs hang downward like silk book ribbons instead of generic blue underline bars."],
        ["Hairline Brush Inputs & Stone Seal Badges", "Form inputs rest on a single 1px pine-soot ink rule that warms into cinnabar red upon focus."],
      ]
    : [
        ["宋刻乌丝栏与现代留白秩序", "摒弃一切祥云金龙等陈旧堆砌，仅取手工生宣微润肌理、外粗内细乌丝双线栏格与一点朱砂印泥，重构安静克制的东方数字界面。"],
        ["线装书签垂挂导航与古籍索引", "顶部导航如丝质书签自然垂挂于乌丝栏下，选中之卷微垂半寸，取代千篇一律的圆角胶囊切换条。"],
        ["一字墨线表单与寿山石闲章", "输入框仅留底边一缕松烟墨细线，落笔聚焦时化作朱砂红；状态标签皆以阳文、阴文石章呈现。"],
      ];

  return (
    <div className="bg-[#f7f4eb] p-5 md:p-6 rounded-xl border border-[#dcd5c5]">
      <div className="wusilan-outer">
        <div className="wusilan-inner p-5 md:p-6 space-y-6 font-serif">
          {/* 顶部垂挂书签导航 + 阴阳文朱砂印 */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#2b2824]/25 pb-4 text-xs">
            <div className="flex items-start gap-2.5">
              {(isEn
                ? ["Vol. I · Critique", "Vol. II · Folios", "Vol. III · Incense"]
                : ["卷一 · 批阅", "卷二 · 藏书", "卷三 · 茗香"]
              ).map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setTab(idx)}
                  className={`px-3 pt-2 tracking-widest rounded-b-sm transition-all cursor-pointer ${
                    tab === idx
                      ? "pb-4 bg-[#22201d] text-[#f7f4eb] shadow-sm"
                      : "pb-2 border border-[#22201d]/35 text-[#22201d]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 border-[1.5px] border-[#b82925] text-[#b82925] font-bold tracking-widest">
                「甲辰审定」
              </span>
              <span className="px-2 py-0.5 bg-[#b82925] text-[#f7f4eb] font-bold tracking-widest">
                珍本
              </span>
            </div>
          </div>

          {/* 主体双栏：左批阅正文与钤印表单 + 右水墨晕染池 */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
            <div className="xl:col-span-8 space-y-3 relative">
              <h3 className="text-lg font-bold tracking-wide text-[#1c1a17]">{chapters[tab][0]}</h3>
              <p className="text-xs leading-6 text-[#4a463f]">{chapters[tab][1]}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <input
                  type="text"
                  placeholder={isEn ? "Inscribe colophon note..." : "题写跋文批注…"}
                  className="bg-transparent border-b border-[#22201d]/50 px-1 py-1.5 text-xs text-[#22201d] placeholder-[#8a8377] focus:outline-none focus:border-[#b82925]"
                />
                <button
                  type="button"
                  onClick={() => setSealed((s) => s + 1)}
                  className="px-4 py-1.5 bg-[#b82925] text-[#f7f4eb] text-xs tracking-widest cursor-pointer"
                >
                  {isEn ? "Press Cinnabar Seal" : "钤印准奏"}
                </button>
                <button
                  type="button"
                  onClick={() => setInkFlow((f) => !f)}
                  className="px-3.5 py-1.5 border border-[#22201d] text-[#22201d] text-xs tracking-widest cursor-pointer"
                >
                  {isEn ? "Toggle Ink Wash" : "水墨晕染启停"}
                </button>
              </div>

              {sealed > 0 && (
                <div
                  key={sealed}
                  className="stamp-anim pointer-events-none absolute right-2 top-0 w-16 h-16 border-2 border-[#b82925] text-[#b82925] bg-[#b82925]/5 flex items-center justify-center text-center text-xs font-bold leading-tight"
                >
                  准予
                  <br />
                  刊行
                </div>
              )}
            </div>

            <div className="xl:col-span-4 h-32 border border-[#22201d]/25 bg-[#f2eee3] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="relative flex items-center justify-center">
                {inkFlow && (
                  <span className="w-10 h-10 rounded-full bg-[#1c1a17]/25 animate-ping absolute" />
                )}
                <span className="w-3.5 h-3.5 rounded-full bg-[#1c1a17]" />
              </div>
              <span className="text-xs text-[#5c574f] mt-5">
                {inkFlow
                  ? isEn
                    ? "Ink diffusing on Xuan paper..."
                    : "水墨氤氲流转中…"
                  : isEn
                    ? "Ink settled."
                    : "墨迹已凝定"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   07. 机械翻页时刻表与航空登机牌完整展板
============================================================================ */
function SplitFlapRichShowcase({ isEn }: { isEn: boolean }) {
  const [boardIdx, setBoardIdx] = useState(0);
  const schedules = [
    [
      { gate: "A01", target: "CORE-API  ", status: "ON TIME " },
      { gate: "B07", target: "EDGE-CDN  ", status: "BOARDING" },
    ],
    [
      { gate: "A01", target: "CORE-API  ", status: "DEPLOYED" },
      { gate: "C12", target: "MCP-NODE  ", status: "ON TIME " },
    ],
  ];

  const rows = schedules[boardIdx % schedules.length];

  return (
    <div className="bg-[#16171a] text-[#f5f5f0] rounded-2xl p-5 md:p-6 font-mono space-y-5 border border-zinc-700">
      <div className="bg-[#ffd100] text-[#141414] rounded-lg px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 font-bold">
        <span className="text-sm">✈ DEPARTURES // RELEASE PIPELINE TIMETABLE</span>
        <button
          type="button"
          onClick={() => setBoardIdx((n) => n + 1)}
          className="text-xs px-3 py-1 bg-[#141414] text-[#ffd100] rounded cursor-pointer"
        >
          {isEn ? "↻ Flip Timetable" : "↻ 翻动下一班时刻牌"}
        </button>
      </div>

      {/* 多行机械翻页矩阵 */}
      <div key={boardIdx} className="space-y-2.5">
        {rows.map((r, rIdx) => (
          <div
            key={rIdx}
            className="flex flex-wrap items-center justify-between gap-2 bg-[#1d1f24] p-2.5 rounded-lg border border-zinc-800"
          >
            <span className="px-2 py-1 bg-zinc-900 text-[#ffd100] text-xs font-bold rounded">
              GATE {r.gate}
            </span>
            <div className="flex gap-1">
              {[...r.target].map((ch, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 18}ms` }}
                  className="flap-cell flap-anim w-6 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              {[...r.status].map((ch, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${(i + 5) * 20}ms` }}
                  className={`flap-cell flap-anim w-6 h-8 rounded flex items-center justify-center text-xs font-bold ${
                    r.status.includes("DEPLOYED") ? "text-[#4ade80]" : "text-[#ffd100]"
                  }`}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 完整航空登机牌撕裂副联卡片 */}
      <div className="relative bg-[#f6f4ee] text-[#16171a] rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center overflow-hidden">
        <span className="w-5 h-5 rounded-full bg-[#16171a] absolute -left-2.5 top-1/2 -translate-y-1/2" />
        <span className="w-5 h-5 rounded-full bg-[#16171a] absolute -right-2.5 top-1/2 -translate-y-1/2" />
        <div className="md:col-span-8 space-y-1.5 pr-3 md:border-r-2 md:border-dashed md:border-zinc-400 pl-2">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>BOARDING PASS // PROD-CLUSTER</span>
            <span>SEAT 01A</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold">V2.4.0</span>
            <span className="text-xs font-bold text-zinc-500">────✈────▶</span>
            <span className="text-2xl font-bold">MAINNET</span>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-2 pl-2 pr-2">
          <span className="text-xs text-zinc-500">GATE CLEARANCE</span>
          <button
            type="button"
            onClick={() => setBoardIdx((n) => n + 1)}
            className="w-full py-2 rounded bg-[#16171a] text-[#ffd100] text-xs font-bold tracking-widest cursor-pointer"
          >
            {isEn ? "SCAN TO BOARD →" : "扫码登机发布 →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   08. Risograph 孔版双色错位油印完整画报页
============================================================================ */
function RisoRichShowcase({ isEn }: { isEn: boolean }) {
  const [offset, setOffset] = useState(5);
  const [drums, setDrums] = useState<[string, string]>(["#ff48b0", "#0078bf"]);

  const [inkA, inkB] = drums;

  return (
    <div
      className="riso-paper rounded-xl p-5 md:p-6 border-2 space-y-5"
      style={{ borderColor: inkB }}
    >
      {/* 双油墨滚筒切换与套色偏移校准器 */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-dashed text-xs font-mono"
        style={{ borderColor: `${inkB}66` }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold">INK DRUMS:</span>
          <button
            type="button"
            onClick={() => setDrums(["#ff48b0", "#0078bf"])}
            className="px-2.5 py-1 rounded-sm bg-[#ff48b0] text-white font-bold cursor-pointer"
          >
            {isEn ? "Pink × Blue" : "荧光粉 × 群青蓝"}
          </button>
          <button
            type="button"
            onClick={() => setDrums(["#ff6c2f", "#00838a"])}
            className="px-2.5 py-1 rounded-sm bg-[#ff6c2f] text-white font-bold cursor-pointer"
          >
            {isEn ? "Orange × Teal" : "亮橘红 × 松石绿"}
          </button>
        </div>
        <label className="flex items-center gap-2 font-bold">
          <span>
            {isEn ? "Plate Offset:" : "套色错位偏移:"} {offset}px
          </span>
          <input
            type="range"
            min={0}
            max={12}
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
            className="w-28 accent-[#ff48b0]"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
        {/* 主视觉错位叠印海报 */}
        <div className="xl:col-span-7 relative p-1">
          <div
            className="riso-mul absolute inset-0 border-2 rounded-lg pointer-events-none transition-transform"
            style={{
              borderColor: inkA,
              backgroundColor: `${inkA}24`,
              transform: `translate(${offset}px, ${offset}px)`,
            }}
          />
          <div
            className="riso-mul relative border-2 rounded-lg p-5 bg-white/70 space-y-3"
            style={{ borderColor: inkB }}
          >
            <span
              className="inline-block px-2 py-0.5 text-xs font-mono font-bold text-white"
              style={{ backgroundColor: inkA }}
            >
              ZINE EDITION № 14
            </span>
            <h3 className="text-xl font-black tracking-tight" style={{ color: inkB }}>
              IMPERFECT SOY-INK OVERPRINT.
            </h3>
            <p className="text-xs leading-relaxed text-[#1d2733]">
              {isEn
                ? "Two translucent soy-ink drums multiply directly on uncoated paper. Hover the button below to watch the misregistered plates snap into alignment."
                : "两只植物大豆油墨滚筒在粗糙纸面上正片叠底（mix-blend-mode: multiply）。悬停下方按钮体验双色版套准合拢："}
            </p>
            <button
              type="button"
              onClick={() => setOffset((o) => (o >= 10 ? 2 : o + 3))}
              className="relative group text-xs font-mono font-bold px-4 py-2 cursor-pointer"
            >
              <span
                className="riso-mul absolute inset-0 rounded-sm transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                style={{
                  backgroundColor: inkA,
                  transform: `translate(${Math.max(2, offset * 0.7)}px, ${Math.max(2, offset * 0.7)}px)`,
                }}
              />
              <span
                className="riso-mul relative z-10 text-white px-3 py-1.5 rounded-sm"
                style={{ backgroundColor: inkB }}
              >
                {isEn ? "PRINT NEXT EDITION →" : "印制下一期特刊 →"}
              </span>
            </button>
          </div>
        </div>

        {/* 右侧：双圆正片叠底色彩实验室 */}
        <div
          className="xl:col-span-5 p-4 border border-dashed rounded-lg flex flex-col items-center justify-center space-y-3"
          style={{ borderColor: inkB }}
        >
          <div className="relative w-28 h-28 flex items-center justify-center">
            <div
              className="riso-mul w-20 h-20 rounded-full absolute transition-transform"
              style={{
                backgroundColor: inkA,
                transform: `translate(${-6 - offset}px, -4px)`,
              }}
            />
            <div
              className="riso-mul w-20 h-20 rounded-full absolute transition-transform"
              style={{
                backgroundColor: inkB,
                transform: `translate(${6 + offset}px, 5px)`,
              }}
            />
          </div>
          <span className="text-xs font-mono text-center">
            {isEn
              ? "Overlapping 2 inks yields a 3rd overprint shade automatically"
              : "双色油墨交叠处自动叠印生成第三种深邃墨色"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   09. 瑞士药剂处方签与实验室弯月面量筒完整配方单
============================================================================ */
function ApothecaryRichShowcase({ isEn }: { isEn: boolean }) {
  const [pct, setPct] = useState(75);

  return (
    <div
      className="rounded-2xl p-5 md:p-7"
      style={{ background: "linear-gradient(135deg, #4b2509 0%, #7c3f11 55%, #381a05 100%)" }}
    >
      <div className="bg-[#f4f1ea] text-[#121211] p-5 md:p-6 border-2 border-[#121211] grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-3">
          <div className="border-b-4 border-[#121211] pb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-black tracking-tight">No. 09 — RAG COMPOUND</h3>
            <span className="text-xs font-mono font-bold">500 mL // BATCH 26-K</span>
          </div>

          <div className="divide-y border-b-2 border-[#121211] divide-[#121211] text-xs font-mono">
            <div className="py-2 flex justify-between">
              <span className="font-bold">ACTIVE DISTILLATE</span>
              <span>GEMINI-CARBON-CORE</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="font-bold">CONCENTRATION</span>
              <span>
                {pct.toFixed(1)}% v/v ({Math.round(pct * 5)} mL)
              </span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="font-bold">CONTAMINATION GUARD</span>
              <span className="px-1.5 bg-[#121211] text-[#f4f1ea] font-bold">CLINICAL GRADE</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="font-bold">STORAGE CONDITION</span>
              <span>AMBER UV-PROTECTED VIAL</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
            <span className="font-bold">{isEn ? "DOSAGE:" : "注入配比浓度："}</span>
            {[30, 55, 75, 95].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setPct(v)}
                className={`px-3 py-1 border border-[#121211] cursor-pointer transition ${
                  pct === v ? "bg-[#121211] text-[#f4f1ea] font-bold" : "hover:bg-[#121211]/10"
                }`}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col items-center justify-center xl:border-l border-[#121211]/30 xl:pl-4">
          <div className="relative w-24 h-44 border-2 border-[#121211] rounded-b-xl bg-white overflow-hidden flex items-end">
            <div
              className="w-full bg-[#b45309]/80 border-t-2 border-[#78350f] transition-all duration-500"
              style={{ height: `${pct}%` }}
            />
            <div className="absolute inset-y-2 right-0 w-8 flex flex-col justify-between text-[11px] font-mono pointer-events-none pr-1 text-right">
              <span className="border-t border-[#121211]">500</span>
              <span className="border-t border-[#121211]">375</span>
              <span className="border-t border-[#121211]">250</span>
              <span className="border-t border-[#121211]">125</span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold mt-2">MENISCUS CYLINDER</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   10. Hi-Fi 磁带卡座与双声道钨丝暖光指针 VU 表完整面板
============================================================================ */
function TapeDeckRichShowcase({ isEn }: { isEn: boolean }) {
  const [playing, setPlaying] = useState(true);
  const [counter, setCounter] = useState(142);
  const [vuL, setVuL] = useState(-8);
  const [vuR, setVuR] = useState(-4);

  useEffect(() => {
    const id = setInterval(() => {
      if (!playing) {
        setVuL(-40);
        setVuR(-40);
        return;
      }
      setCounter((c) => (c + 1) % 9999);
      setVuL(Math.round(-22 + Math.random() * 52));
      setVuR(Math.round(-20 + Math.random() * 50));
    }, 220);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div
      className="rounded-2xl p-5 md:p-6 border border-[#a8a396] font-mono space-y-5 text-[#1d1d1b]"
      style={{ background: "linear-gradient(180deg, #dcd9d0 0%, #cfcbc0 50%, #c2beb2 100%)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#9e998c] pb-2.5 text-xs">
        <span className="font-bold tracking-widest">NAKA-AI // DRAGON STEREO CASSETTE DECK</span>
        <span className="px-2 py-0.5 bg-[#22211f] text-[#f5c869] rounded-sm">CrO₂ TYPE II · 90m</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* 左侧磁带仓与机械里程表 */}
        <div className="xl:col-span-6 bg-[#232220] text-[#f3efe6] rounded-xl p-4 border-2 border-[#474540] flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-center text-xs text-amber-300">
            <span>SIDE A · VOICE SYNTH STREAM</span>
            <span className="bg-black px-2 py-0.5 rounded text-white font-bold">
              {String(counter).padStart(4, "0")}
            </span>
          </div>

          <div className="bg-[#33312e] rounded-lg p-4 flex items-center justify-around border border-white/10">
            <div
              className={`${
                playing ? "reel-spin" : ""
              } w-14 h-14 rounded-full border-4 border-[#e5e1d8] bg-[#181715] flex items-center justify-center`}
            >
              <span className="w-4 h-4 rounded-full border-2 border-dashed border-amber-400" />
            </div>
            <div className="h-6 px-3 bg-[#141312] border border-white/15 flex items-center text-xs text-amber-200/80">
              DOLBY NR
            </div>
            <div
              className={`${
                playing ? "reel-spin" : ""
              } w-14 h-14 rounded-full border-4 border-[#e5e1d8] bg-[#181715] flex items-center justify-center`}
            >
              <span className="w-4 h-4 rounded-full border-2 border-dashed border-amber-400" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className={`py-1.5 font-bold rounded-sm cursor-pointer ${
                playing ? "bg-amber-400 text-black" : "bg-[#e5e1d8] text-[#181715]"
              }`}
            >
              ▶ PLAY
            </button>
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className="py-1.5 bg-[#474540] text-white font-bold rounded-sm cursor-pointer"
            >
              ■ STOP
            </button>
            <button
              type="button"
              onClick={() => {
                setVuL(38);
                setVuR(38);
              }}
              className="py-1.5 bg-[#d94e1f] text-white font-bold rounded-sm cursor-pointer"
            >
              {isEn ? "🔊 PEAK" : "🔊 峰值测试"}
            </button>
          </div>
        </div>

        {/* 右侧 L/R 双声道钨丝暖光 VU 指针表 */}
        <div className="xl:col-span-6 grid grid-cols-2 gap-3">
          {[
            ["CH-L", vuL],
            ["CH-R", vuR],
          ].map(([ch, deg]) => (
            <div
              key={ch}
              className="vu-window rounded-xl p-3.5 border-2 border-[#524d42] flex flex-col justify-between relative overflow-hidden h-44"
            >
              <div className="flex justify-between text-[11px] font-bold">
                <span>-20 -5 0</span>
                <span className="text-[#b91c1c]">+3 +6</span>
              </div>
              <div className="text-center text-xs font-black tracking-widest opacity-75">
                VU · {ch}
              </div>
              <div className="relative h-12 flex justify-center items-end">
                <div
                  className="w-0.5 h-28 bg-[#b91c1c] origin-bottom transition-transform duration-150"
                  style={{ transform: `rotate(${deg}deg)` }}
                />
                <div className="w-4 h-2.5 rounded-t-full bg-[#232220] absolute bottom-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   11. 千禧透明紫掌机透视 PCB 电路完整掌机台
============================================================================ */
function AtomicPurpleRichShowcase({ isEn }: { isEn: boolean }) {
  const [alpha, setAlpha] = useState(42);
  const [slot, setSlot] = useState("CARTRIDGE_01: SYNTH_OS");
  const [lastBtn, setLastBtn] = useState("READY");

  return (
    <div className="relative bg-[#231636] text-purple-100 rounded-2xl p-5 md:p-6 overflow-hidden border-2 border-purple-400/50">
      {/* 底层 45° 布线镀金焊盘 SVG 电路母板 */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
        viewBox="0 0 600 260"
        preserveAspectRatio="none"
      >
        <g stroke="#c084fc" strokeWidth="2.2" fill="none">
          <path d="M20 40 H140 L175 75 H340 L370 45 H570" />
          <path d="M35 200 H190 L225 160 H420 L460 205 H580" />
          <path d="M120 10 V95 L155 130 V250" />
          <path d="M450 15 V110 L410 150 V250" />
        </g>
        <g fill="#fbbf24">
          <circle cx="140" cy="40" r="4.5" />
          <circle cx="340" cy="75" r="4.5" />
          <circle cx="190" cy="200" r="4.5" />
          <circle cx="420" cy="160" r="4.5" />
          <rect
            x="250"
            y="95"
            width="64"
            height="42"
            rx="3"
            fill="#191326"
            stroke="#fbbf24"
            strokeWidth="1.5"
          />
        </g>
      </svg>

      {/* 上层半透明注塑原子紫外壳 */}
      <div
        className="atomic-frost relative z-10 rounded-xl p-5 border border-purple-300/40 space-y-4 font-mono text-xs"
        style={{ backgroundColor: `rgba(126, 58, 242, ${alpha / 100})` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-bold tracking-wider">GAME-SHELL // ATOMIC PURPLE 1998</span>
          <label className="flex items-center gap-2">
            <span>{isEn ? "Shell Opacity:" : "外壳透光度:"}</span>
            <input
              type="range"
              min={15}
              max={80}
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="accent-amber-400 w-28"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-center">
          <div className="xl:col-span-7 bg-[#151121]/90 border-2 border-purple-300/30 rounded-lg p-4 space-y-2.5">
            <div className="flex justify-between text-emerald-300 font-bold">
              <span>▶ {slot}</span>
              <span>[{lastBtn}]</span>
            </div>
            <p className="text-purple-200/85 leading-relaxed">
              {isEn
                ? "Keep backdrop blur tight (2.5px) over 45°-routed gold-pad PCB traces so internal hardware shines through."
                : "保持 2.5px 低模糊度磨砂聚碳酸酯上盖，让底层的 45° 铜箔走线与沉金焊盘清晰透出。"}
            </p>
            <div className="flex gap-2 pt-1">
              {["SLOT A: SYNTH", "SLOT B: PIXEL", "SLOT C: DEBUG"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className="px-2 py-1 rounded bg-purple-950/80 border border-purple-400/40 hover:border-amber-400 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 flex items-center justify-around">
            <div className="grid grid-cols-3 gap-0.5 w-20 h-20">
              <div />
              <button
                type="button"
                onClick={() => setLastBtn("UP ▲")}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-t font-bold border border-white/15 cursor-pointer"
              >
                ▲
              </button>
              <div />
              <button
                type="button"
                onClick={() => setLastBtn("LEFT ◀")}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-l font-bold border border-white/15 cursor-pointer"
              >
                ◀
              </button>
              <div className="bg-zinc-800 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
              </div>
              <button
                type="button"
                onClick={() => setLastBtn("RIGHT ▶")}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-r font-bold border border-white/15 cursor-pointer"
              >
                ▶
              </button>
              <div />
              <button
                type="button"
                onClick={() => setLastBtn("DOWN ▼")}
                className="bg-zinc-800 hover:bg-zinc-700 rounded-b font-bold border border-white/15 cursor-pointer"
              >
                ▼
              </button>
              <div />
            </div>

            <div className="flex items-center gap-3 -rotate-12">
              <button
                type="button"
                onClick={() => setLastBtn("B · BACK")}
                className="w-11 h-11 rounded-full bg-rose-500 text-white font-black shadow-[0_4px_0_#9f1239] active:translate-y-1 cursor-pointer"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => setLastBtn("A · START")}
                className="w-11 h-11 rounded-full bg-emerald-400 text-zinc-950 font-black shadow-[0_4px_0_#065f46] active:translate-y-1 cursor-pointer"
              >
                A
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   12. 侦探软木塞红绳图钉与机密脱敏档案完整推理墙
============================================================================ */
function CorkboardRichShowcase({ isEn }: { isEn: boolean }) {
  const [links, setLinks] = useState<[number, number][]>([
    [0, 1],
    [1, 2],
  ]);
  const [pendingPin, setPendingPin] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const boardRef = useRef<HTMLDivElement>(null);
  const pinRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [paths, setPaths] = useState<{ d: string }[]>([]);

  const recomputeStrings = () => {
    const board = boardRef.current;
    if (!board) return;
    const br = board.getBoundingClientRect();
    if (br.width === 0) return;

    const coords = pinRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - br.left + r.width / 2, y: r.top - br.top + r.height / 2 };
    });

    const next = links.flatMap(([a, b]) => {
      const p1 = coords[a];
      const p2 = coords[b];
      if (!p1 || !p2) return [];
      const midX = (p1.x + p2.x) / 2;
      const midY = Math.max(p1.y, p2.y) + 28 + Math.abs(p2.x - p1.x) * 0.06;
      return [{ d: `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}` }];
    });
    setPaths(next);
  };

  useEffect(() => {
    const id = setTimeout(recomputeStrings, 40);
    window.addEventListener("resize", recomputeStrings);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", recomputeStrings);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  const handlePinClick = (idx: number) => {
    if (pendingPin === null) {
      setPendingPin(idx);
    } else {
      if (pendingPin !== idx) {
        setLinks((prev) => [...prev, [pendingPin, idx]]);
      }
      setPendingPin(null);
    }
  };

  const toggleRedact = (id: number) => setRevealed((r) => ({ ...r, [id]: !r[id] }));

  return (
    <div
      ref={boardRef}
      className="cork-surface rounded-2xl p-5 md:p-6 border-4 border-[#5c3d1e] relative space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 bg-black/60 text-amber-100 px-3.5 py-2 rounded text-xs font-mono relative z-30">
        <span>
          {isEn
            ? "📌 CASE #404 // Click any two red push-pins to string yarn; click black bars to declassify"
            : "📌 案件推理墙 // 点击任意两张卡片顶部的「红图钉」拉出悬链红绳；点击黑条解密档案"}
        </span>
        <button
          type="button"
          onClick={() => {
            setLinks([]);
            setPendingPin(null);
          }}
          className="px-2.5 py-1 bg-rose-600 text-white rounded font-bold cursor-pointer"
        >
          {isEn ? "Cut Yarn" : "剪断重置红绳"}
        </button>
      </div>

      {/* 悬链重力红绳 SVG 层 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        {paths.map((p, idx) => (
          <path
            key={idx}
            d={p.d}
            fill="none"
            stroke="#dc2626"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.35))" }}
          />
        ))}
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10 pt-2">
        {/* 牛皮纸档案卡 */}
        <div className="bg-[#efe4c8] text-[#1f1c18] p-4 shadow-lg -rotate-1 border border-[#cbbba0] font-mono text-xs space-y-2">
          <button
            ref={(el) => {
              pinRefs.current[0] = el;
            }}
            type="button"
            onClick={() => handlePinClick(0)}
            className={`mx-auto -mt-6 mb-1 w-5 h-5 rounded-full bg-rose-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold cursor-pointer ${
              pendingPin === 0 ? "ring-4 ring-amber-300" : ""
            }`}
          >
            •
          </button>
          <div className="text-rose-700 font-bold border-b border-[#1f1c18]/20 pb-1">
            DOSSIER // SUBJECT A
          </div>
          <p className="leading-relaxed">
            {isEn ? "Traffic traced to " : "异常流量源自节点 "}
            <span
              onClick={() => toggleRedact(1)}
              className={`redacted ${revealed[1] ? "revealed" : ""}`}
            >
              192.168.42.9
            </span>
            {isEn ? " signed by " : "，密钥由代号 "}
            <span
              onClick={() => toggleRedact(2)}
              className={`redacted ${revealed[2] ? "revealed" : ""}`}
            >
              NIGHT-OWL
            </span>
            .
          </p>
        </div>

        {/* 拍立得证据卡 */}
        <div className="bg-white text-[#18181b] p-3 pb-5 shadow-lg rotate-1 text-xs space-y-2">
          <button
            ref={(el) => {
              pinRefs.current[1] = el;
            }}
            type="button"
            onClick={() => handlePinClick(1)}
            className={`mx-auto -mt-5 mb-1 w-5 h-5 rounded-full bg-rose-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold cursor-pointer ${
              pendingPin === 1 ? "ring-4 ring-amber-300" : ""
            }`}
          >
            •
          </button>
          <div className="h-20 bg-zinc-900 text-emerald-400 font-mono flex flex-col items-center justify-center p-2 text-center">
            <span>[EVIDENCE SNAPSHOT]</span>
            <span className="text-zinc-400">03:14:09 UTC</span>
          </div>
          <div className="font-serif italic text-center pt-1 text-zinc-700">
            {isEn ? "“180ms gateway spike logged”" : "“网关日志出现 180ms 未知跳变”"}
          </div>
        </div>

        {/* 黄色推理便签 */}
        <div className="bg-[#fef08a] text-[#1c1917] p-4 shadow-lg -rotate-1 font-mono text-xs space-y-2">
          <button
            ref={(el) => {
              pinRefs.current[2] = el;
            }}
            type="button"
            onClick={() => handlePinClick(2)}
            className={`mx-auto -mt-6 mb-1 w-5 h-5 rounded-full bg-rose-600 border-2 border-white shadow-md flex items-center justify-center text-white font-bold cursor-pointer ${
              pendingPin === 2 ? "ring-4 ring-amber-300" : ""
            }`}
          >
            •
          </button>
          <div className="font-bold underline">HYPOTHESIS #03</div>
          <p className="leading-relaxed">
            {isEn ? "Root cause is " : "并非外部入侵，而是触发了 "}
            <span
              onClick={() => toggleRedact(3)}
              className={`redacted ${revealed[3] ? "revealed" : ""}`}
            >
              {isEn ? "STANDBY DEADLOCK" : "热备回滚死锁"}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   扩展标本区：同一风格下的完整组件矩阵、表单、列表与价格卡片（使详情页成为丰富完整的样板页）
============================================================================ */
interface SpecimenTheme {
  wrap: string;
  panel: string;
  inset: string;
  btnPri: string;
  btnSec: string;
  badgeA: string;
  badgeB: string;
  input: string;
  bar: string;
}

const SPECIMEN_THEMES: Record<string, SpecimenTheme> = {
  "tactile-synth": {
    wrap: "te-chassis rounded-2xl p-5 border border-[#c7c4ba] font-mono",
    panel: "te-recess rounded-xl p-4",
    inset: "te-lcd rounded-lg p-3 border border-[#7c8970]",
    btnPri: "te-key te-key-orange rounded-lg px-3.5 py-2 font-bold",
    btnSec: "te-key bg-[#f2f0ea] text-[#1e1f22] rounded-lg px-3.5 py-2 font-bold",
    badgeA: "bg-[#ff5500] text-white px-2 py-0.5 rounded font-bold",
    badgeB: "bg-[#26272b] text-white px-2 py-0.5 rounded font-bold",
    input: "te-recess rounded-lg px-3 py-2 text-[#1e1f22]",
    bar: "bg-[#ff5500]",
  },
  "cad-blueprint": {
    wrap: "bp-dark p-5 border bp-b font-mono",
    panel: "border bp-b p-4 bg-sky-950/35",
    inset: "border border-dashed bp-bs p-3",
    btnPri: "border bp-b bg-sky-400/25 px-3.5 py-1.5 font-bold",
    btnSec: "border bp-bs px-3.5 py-1.5",
    badgeA: "border border-emerald-400 text-emerald-300 px-2 py-0.5 font-bold",
    badgeB: "border bp-b px-2 py-0.5",
    input: "bg-transparent border bp-bs px-3 py-1.5",
    bar: "bg-sky-300",
  },
  "thermal-receipt": {
    wrap: "bg-[#faf7ef] text-[#191918] p-5 border border-[#bab4a6] font-mono shadow-md",
    panel: "border border-[#191918] p-4",
    inset: "border-y border-dashed border-[#8c8980] py-2.5",
    btnPri: "bg-[#191918] text-[#faf7ef] px-3.5 py-1.5 font-bold",
    btnSec: "border border-[#191918] px-3.5 py-1.5 font-bold",
    badgeA: "border-2 border-[#c82824] text-[#c82824] px-2 py-0.5 font-bold",
    badgeB: "bg-[#191918] text-[#faf7ef] px-2 py-0.5 font-bold",
    input: "bg-white border border-[#191918] px-3 py-1.5",
    bar: "bg-[#191918]",
  },
  "eink-gc16": {
    wrap: "bg-[#f1eee7] text-[#141413] border-2 border-[#141413] p-5 font-serif",
    panel: "border border-[#141413] p-4",
    inset: "border border-[#141413] p-3 dither-25 bg-[#f1eee7]",
    btnPri: "bg-[#141413] text-[#f1eee7] px-3.5 py-1.5 font-mono font-bold",
    btnSec: "border border-[#141413] bg-[#f1eee7] px-3.5 py-1.5 font-mono font-bold",
    badgeA: "bg-[#141413] text-[#f1eee7] px-2 py-0.5 font-mono font-bold",
    badgeB: "border border-[#141413] dither-50 bg-[#f1eee7] px-2 py-0.5 font-mono font-bold",
    input: "bg-[#f1eee7] border border-[#141413] px-3 py-1.5 font-mono",
    bar: "bg-[#141413]",
  },
  "magi-terminal": {
    wrap: "bg-[#080a09] text-[#ff9d00] border-2 border-[#ff9d00]/80 rounded-xl p-5 font-mono",
    panel: "magi-oct border border-[#ff9d00]/60 bg-[#ff9d00]/10 p-4",
    inset: "border border-[#22ff66]/45 bg-black p-3 text-[#22ff66]",
    btnPri: "bg-[#ff9d00] text-black px-3.5 py-1.5 font-bold uppercase",
    btnSec: "border border-[#ff9d00] px-3.5 py-1.5 font-bold uppercase",
    badgeA: "bg-[#22ff66] text-black px-2 py-0.5 font-bold",
    badgeB: "border border-[#ff2a2a] text-[#ff2a2a] px-2 py-0.5 font-bold",
    input: "bg-black border border-[#ff9d00]/60 px-3 py-1.5 text-[#22ff66]",
    bar: "bg-[#22ff66]",
  },
  "xuan-wusilan": {
    wrap: "bg-[#f7f4eb] text-[#22201d] border border-[#2b2824] p-5 font-serif",
    panel: "border border-[#22201d]/30 p-4 bg-[#f7f4eb]",
    inset: "border-l-2 border-[#b82925] pl-3 py-2 bg-[#f2eee3]",
    btnPri: "bg-[#b82925] text-[#f7f4eb] px-4 py-1.5 tracking-widest",
    btnSec: "border border-[#22201d] px-3.5 py-1.5 tracking-widest",
    badgeA: "border-[1.5px] border-[#b82925] text-[#b82925] px-2 py-0.5 font-bold",
    badgeB: "bg-[#b82925] text-[#f7f4eb] px-2 py-0.5 font-bold",
    input: "bg-transparent border-b border-[#22201d]/60 px-1 py-1.5",
    bar: "bg-[#b82925]",
  },
  "split-flap": {
    wrap: "bg-[#16171a] text-[#f5f5f0] rounded-2xl p-5 border border-zinc-700 font-mono",
    panel: "bg-[#202227] border border-zinc-700 rounded-xl p-4",
    inset: "flap-cell rounded p-3 text-[#ffd100]",
    btnPri: "bg-[#ffd100] text-[#141414] rounded px-3.5 py-1.5 font-bold",
    btnSec: "border border-zinc-500 rounded px-3.5 py-1.5 font-bold",
    badgeA: "bg-[#ffd100] text-[#141414] px-2 py-0.5 rounded font-bold",
    badgeB: "bg-[#4ade80] text-[#141414] px-2 py-0.5 rounded font-bold",
    input: "bg-[#111215] border border-zinc-600 rounded px-3 py-1.5 text-[#ffd100]",
    bar: "bg-[#ffd100]",
  },
  "risograph-print": {
    wrap: "riso-paper rounded-xl p-5 border-2 border-[#0078bf]",
    panel: "riso-mul border-2 border-[#0078bf] bg-white/75 rounded-lg p-4",
    inset: "riso-mul border border-[#ff48b0] bg-[#ff48b0]/15 rounded p-3",
    btnPri: "riso-mul bg-[#0078bf] text-white px-3.5 py-1.5 rounded-sm font-mono font-bold shadow-[3px_3px_0_#ff48b0]",
    btnSec: "border-2 border-[#0078bf] text-[#0078bf] px-3.5 py-1.5 rounded-sm font-mono font-bold",
    badgeA: "bg-[#ff48b0] text-white px-2 py-0.5 font-mono font-bold",
    badgeB: "bg-[#0078bf] text-white px-2 py-0.5 font-mono font-bold",
    input: "bg-white/90 border-2 border-[#0078bf] px-3 py-1.5 font-mono",
    bar: "bg-[#ff48b0]",
  },
  "swiss-apothecary": {
    wrap: "bg-[#f4f1ea] text-[#121211] border-2 border-[#121211] p-5 font-mono",
    panel: "border-t-4 border-b border-[#121211] py-4",
    inset: "border border-[#121211] bg-white p-3",
    btnPri: "bg-[#121211] text-[#f4f1ea] px-3.5 py-1.5 font-bold",
    btnSec: "border border-[#121211] px-3.5 py-1.5 font-bold",
    badgeA: "bg-[#121211] text-[#f4f1ea] px-2 py-0.5 font-bold",
    badgeB: "border border-[#121211] px-2 py-0.5 font-bold",
    input: "bg-white border border-[#121211] px-3 py-1.5",
    bar: "bg-[#b45309]",
  },
  "analog-tape-deck": {
    wrap: "rounded-2xl p-5 border border-[#a8a396] font-mono text-[#1d1d1b] bg-gradient-to-b from-[#dcd9d0] to-[#c2beb2]",
    panel: "bg-[#232220] text-[#f3efe6] rounded-xl p-4 border border-[#474540]",
    inset: "vu-window rounded-lg p-3 border border-[#524d42]",
    btnPri: "bg-[#d94e1f] text-white px-3.5 py-1.5 rounded-sm font-bold",
    btnSec: "bg-[#e5e1d8] text-[#181715] px-3.5 py-1.5 rounded-sm font-bold",
    badgeA: "bg-[#22211f] text-[#f5c869] px-2 py-0.5 rounded-sm font-bold",
    badgeB: "bg-[#d94e1f] text-white px-2 py-0.5 rounded-sm font-bold",
    input: "bg-[#181715] border border-[#57544d] text-amber-200 px-3 py-1.5 rounded-sm",
    bar: "bg-[#d94e1f]",
  },
  "atomic-purple": {
    wrap: "atomic-frost rounded-2xl p-5 border border-purple-400/50 text-purple-50 font-mono bg-[#5828a8]/80",
    panel: "bg-[#151121]/85 border border-purple-300/30 rounded-xl p-4",
    inset: "bg-[#0d0a16] border border-emerald-400/40 rounded-lg p-3 text-emerald-300",
    btnPri: "bg-emerald-400 text-zinc-950 rounded-full px-4 py-1.5 font-black shadow-[0_3px_0_#065f46]",
    btnSec: "bg-rose-500 text-white rounded-full px-4 py-1.5 font-black shadow-[0_3px_0_#9f1239]",
    badgeA: "bg-amber-400 text-zinc-950 px-2 py-0.5 rounded font-black",
    badgeB: "bg-purple-900 border border-purple-300/40 px-2 py-0.5 rounded font-bold",
    input: "bg-[#0d0a16] border border-purple-300/40 rounded-lg px-3 py-1.5 text-purple-100",
    bar: "bg-emerald-400",
  },
  "corkboard-dossier": {
    wrap: "cork-surface rounded-2xl p-5 border-4 border-[#5c3d1e] font-mono text-[#1f1c18]",
    panel: "bg-[#efe4c8] p-4 shadow-md border border-[#cbbba0]",
    inset: "bg-[#fef08a] p-3 shadow text-[#1c1917]",
    btnPri: "bg-rose-700 text-white px-3.5 py-1.5 font-bold shadow",
    btnSec: "bg-white border border-[#1f1c18] px-3.5 py-1.5 font-bold",
    badgeA: "bg-rose-700 text-white px-2 py-0.5 font-bold",
    badgeB: "bg-[#161615] text-[#fef08a] px-2 py-0.5 font-bold",
    input: "bg-white/90 border border-[#8c7a62] px-3 py-1.5",
    bar: "bg-rose-700",
  },
  "looseleaf-sketch": {
    wrap: "sketch-notebook rounded-2xl p-5 pl-12 border border-[#d8d3c5] font-serif",
    panel: "sketch-box bg-[#fdfcf7] p-4",
    inset: "bg-[#fef08a]/55 border-2 border-dashed border-[#24292f] p-3",
    btnPri: "sketch-btn bg-[#24292f] text-[#fdfcf7] px-3.5 py-1.5 font-mono font-bold",
    btnSec: "sketch-btn bg-[#fdfcf7] text-[#24292f] px-3.5 py-1.5 font-mono font-bold",
    badgeA: "bg-[#fef08a] border border-[#24292f] px-2 py-0.5 font-mono font-bold",
    badgeB: "border border-[#e15c5c] text-[#c93b3b] px-2 py-0.5 font-mono font-bold",
    input: "sketch-box bg-white px-3 py-1.5 font-mono",
    bar: "bg-[#24292f]",
  },
  "pixel-8bit": {
    wrap: "bg-[#020617] rounded-none p-5 border-4 border-[#f8fafc] font-mono text-[#f8fafc]",
    panel: "pixel-box bg-[#0f172a] p-4",
    inset: "border-2 border-[#38bdf8] bg-[#082f49] p-3 text-[#e0f2fe]",
    btnPri: "pixel-btn bg-[#22c55e] text-[#052e16] px-3.5 py-1.5 font-bold",
    btnSec: "pixel-btn bg-[#facc15] text-[#0f172a] px-3.5 py-1.5 font-bold",
    badgeA: "bg-[#ef4444] text-white px-2 py-0.5 font-bold",
    badgeB: "bg-[#facc15] text-[#0f172a] px-2 py-0.5 font-bold",
    input: "bg-[#020617] border-2 border-[#f8fafc] px-3 py-1.5 text-[#facc15]",
    bar: "bg-[#22c55e]",
  },
  "neobrutalism": {
    wrap: "bg-[#fffdf7] rounded-xl p-5 border-[3px] border-black shadow-[6px_6px_0_#000] text-black",
    panel: "brutal-card bg-white rounded-lg p-4",
    inset: "border-[2.5px] border-black bg-[#c4b5fd] rounded-md p-3 font-bold",
    btnPri: "brutal-btn bg-[#ffde59] rounded-md px-4 py-1.5 font-black uppercase",
    btnSec: "brutal-btn bg-[#a3e635] rounded-md px-4 py-1.5 font-black uppercase",
    badgeA: "bg-[#ff6b6b] border-2 border-black px-2 py-0.5 font-black",
    badgeB: "bg-[#ffde59] border-2 border-black px-2 py-0.5 font-black",
    input: "bg-white border-[2.5px] border-black rounded-md px-3 py-1.5 font-bold",
    bar: "bg-[#ff6b6b]",
  },
  "aurora-spotlight": {
    wrap: "aurora-canvas rounded-2xl p-5 border border-white/10",
    panel: "rounded-xl border border-white/10 bg-[#0b0b13] p-4",
    inset: "rounded-lg border border-sky-400/30 bg-sky-500/10 p-3 text-sky-200",
    btnPri: "rounded-full bg-white text-zinc-950 px-4 py-1.5 font-semibold hover:bg-zinc-200 transition",
    btnSec: "rounded-full border border-white/15 bg-white/5 text-white px-4 py-1.5 font-medium",
    badgeA: "rounded-full border border-purple-400/40 bg-purple-500/15 text-purple-200 px-2.5 py-0.5 font-mono",
    badgeB: "rounded-full border border-sky-400/40 bg-sky-500/15 text-sky-200 px-2.5 py-0.5 font-mono",
    input: "rounded-lg border border-white/15 bg-[#06060b] px-3 py-1.5 text-white",
    bar: "bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500",
  },
};

function StyleSpecimenExtension({ slug, isEn }: { slug: string; isEn: boolean }) {
  const t = SPECIMEN_THEMES[slug] ?? SPECIMEN_THEMES["tactile-synth"];
  const [checks, setChecks] = useState([true, true, false]);
  const [sliderVal, setSliderVal] = useState(76);

  return (
    <div className={`${t.wrap} space-y-5 text-xs`}>
      {/* 标本分栏 1：基础控件矩阵 + 交互表单 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className={`${t.panel} space-y-3.5`}>
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider">
              {isEn ? "01 // CONTROLS & BADGES" : "01 // 按钮、印记与输入控件标本"}
            </span>
            <div className="flex gap-1.5">
              <span className={t.badgeA}>{isEn ? "ACTIVE" : "启用"}</span>
              <span className={t.badgeB}>v2.4</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button type="button" className={`${t.btnPri} cursor-pointer`}>
              {isEn ? "Primary Action" : "主操作按钮"}
            </button>
            <button type="button" className={`${t.btnSec} cursor-pointer`}>
              {isEn ? "Secondary" : "次要操作"}
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <input
              type="text"
              defaultValue={isEn ? "workspace://tea-blend-config" : "输入工作区配置项参数…"}
              className={`w-full focus:outline-none ${t.input}`}
            />
            <div className="space-y-1">
              <div className="flex justify-between opacity-80">
                <span>{isEn ? "CAPACITY ALLOCATION" : "配额负载进度"}</span>
                <span>{sliderVal}%</span>
              </div>
              <div className="h-2.5 w-full border border-current/30 p-0.5">
                <div className={`h-full ${t.bar} transition-all`} style={{ width: `${sliderVal}%` }} />
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full cursor-pointer opacity-75"
              />
            </div>
          </div>
        </div>

        {/* 标本分栏 2：检查清单与通知横幅 */}
        <div className={`${t.panel} flex flex-col justify-between space-y-3`}>
          <div className="space-y-2">
            <div className="font-bold uppercase tracking-wider">
              {isEn ? "02 // PRE-FLIGHT CHECKLIST" : "02 // 规则校验清单与通知框"}
            </div>
            {(isEn
              ? [
                  "Enforce authentic surface grain & border rules",
                  "Strip generic SaaS purple-blue blur gradients",
                  "Enable hardware keyboard navigation focus rings",
                ]
              : [
                  "已启用真实物理表面肌理与边框层级约束",
                  "已拦截千篇一律的紫蓝渐变与毛玻璃背景",
                  "已对齐全局等宽数值与高对比可访问性标准",
                ]
            ).map((label, idx) => (
              <label
                key={idx}
                onClick={() =>
                  setChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)))
                }
                className="flex items-center gap-2.5 cursor-pointer select-none py-1 border-b border-current/15"
              >
                <span className="font-mono font-bold">
                  {checks[idx] ? "[✓]" : "[ ]"}
                </span>
                <span className={checks[idx] ? "" : "opacity-55 line-through"}>{label}</span>
              </label>
            ))}
          </div>

          <div className={t.inset}>
            <div className="font-bold">
              {isEn ? "SYSTEM NOTICE // READY TO STEEP" : "系统提示 // 配方已就绪"}
            </div>
            <div className="opacity-85 mt-0.5">
              {isEn
                ? "Drop DESIGN.md in your repo root to apply this entire visual system across every page."
                : "将右侧编译生成的 DESIGN.md 放入工程根目录，AI 即可在所有业务页面复刻上述全套质感。"}
            </div>
          </div>
        </div>
      </div>

      {/* 标本分栏 3：三栏规格/套餐卡片横排展示 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(isEn
          ? [
              ["STARTER BLEND", "$0 / mo", "12 curated DESIGN.md specs + live playground"],
              ["STUDIO EDITION", "$19 / mo", "Custom Steep Mixer tokens + shadcn soul primitives"],
              ["ENTERPRISE MESH", "CUSTOM", "Dedicated remote MCP server & team design lint"],
            ]
          : [
              ["原叶基础版", "¥0 / 开源", "完整 12 套 DESIGN.md 配方与在线交互图鉴"],
              ["工作室高定版", "PRO 方案", "支持参数化 Token 导出与灵魂组件一行命令直装"],
              ["团队私有版", "ENTERPRISE", "内置远程 MCP 接口，统一全团队多项目视觉规范"],
            ]
        ).map(([tier, price, desc], i) => (
          <div key={tier} className={`${t.panel} space-y-2 flex flex-col justify-between`}>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold opacity-80">{tier}</span>
                {i === 1 && <span className={t.badgeA}>{isEn ? "POPULAR" : "推荐"}</span>}
              </div>
              <div className="text-lg font-bold">{price}</div>
              <p className="opacity-80 leading-relaxed">{desc}</p>
            </div>
            <button type="button" className={`${i === 1 ? t.btnPri : t.btnSec} w-full cursor-pointer mt-2`}>
              {isEn ? "Select Tier →" : "选用此方案 →"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   13. 手绘活页纸笔草图风完整画板 (Looseleaf Sketch)
============================================================================ */
function LooseleafRichShowcase({ isEn }: { isEn: boolean }) {
  const [notes, setNotes] = useState(
    isEn
      ? ["Sketch wireframes on ruled paper", "Highlight key copy with yellow marker"]
      : ["在活页横格纸上手绘线框草图", "用黄色荧光笔涂抹核心关键词"]
  );
  const [draft, setDraft] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const clearPad = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className="sketch-notebook rounded-2xl p-6 pl-12 border border-[#d8d3c5] space-y-5 relative font-serif text-xs">
      {/* 左侧装订孔装饰 */}
      <div className="absolute left-3.5 inset-y-8 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-3.5 h-3.5 rounded-full bg-zinc-200/90 border border-zinc-400/60 shadow-inner"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div className="xl:col-span-7 sketch-box bg-[#fdfcf7] p-5 space-y-3 relative">
          <div className="absolute -top-3 left-6 -rotate-2 bg-[#fde68a]/90 border border-[#24292f]/40 px-3 py-0.5 font-mono text-[11px]">
            WASHI TAPE · NOTE #13
          </div>
          <h3 className="text-lg font-bold pt-1">
            {isEn ? "Looseleaf Paper & Fountain-Pen Ink" : "手绘活页纸与钢笔速写工作台"}
          </h3>
          <p className="leading-relaxed">
            {isEn ? "Asymmetric elliptical radii give boxes a " : "非对称椭圆圆角赋予线框真实的"}
            <span className="sketch-marker font-bold">
              {isEn ? "warm hand-sketched wobble" : "手绘钢笔微抖质感"}
            </span>
            {isEn ? " while preserving keyboard accessibility." : "，搭配荧光笔涂抹与胶带便签。"}
          </p>

          <ul className="space-y-1.5 pt-1 font-mono">
            {notes.map((n, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="font-bold">✎</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-2 font-mono">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={isEn ? "Jot a quick note..." : "随手添一行活页笔记…"}
              className="sketch-box flex-1 bg-white px-3 py-1.5 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (!draft.trim()) return;
                setNotes((prev) => [...prev, draft.trim()]);
                setDraft("");
              }}
              className="sketch-btn bg-[#24292f] text-[#fdfcf7] px-3.5 py-1.5 font-bold cursor-pointer"
            >
              {isEn ? "+ Jot" : "+ 记一笔"}
            </button>
          </div>
        </div>

        {/* 右侧真实可手绘涂鸦速写板 */}
        <div className="xl:col-span-5 sketch-box bg-white p-4 flex flex-col justify-between space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="font-bold">{isEn ? "INK DOODLE PAD (DRAW HERE)" : "钢笔速写区（按住鼠标涂鸦）"}</span>
            <button
              type="button"
              onClick={clearPad}
              className="underline text-[#e15c5c] font-bold cursor-pointer"
            >
              {isEn ? "Erase" : "擦除"}
            </button>
          </div>
          <canvas
            ref={canvasRef}
            width={280}
            height={130}
            onMouseDown={(e) => {
              drawingRef.current = true;
              const c = canvasRef.current;
              const ctx = c?.getContext("2d");
              if (!c || !ctx) return;
              const r = c.getBoundingClientRect();
              ctx.strokeStyle = "#24292f";
              ctx.lineWidth = 2.2;
              ctx.lineCap = "round";
              ctx.beginPath();
              ctx.moveTo(((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height);
            }}
            onMouseMove={(e) => {
              if (!drawingRef.current) return;
              const c = canvasRef.current;
              const ctx = c?.getContext("2d");
              if (!c || !ctx) return;
              const r = c.getBoundingClientRect();
              ctx.lineTo(((e.clientX - r.left) / r.width) * c.width, ((e.clientY - r.top) / r.height) * c.height);
              ctx.stroke();
            }}
            onMouseUp={() => {
              drawingRef.current = false;
            }}
            onMouseLeave={() => {
              drawingRef.current = false;
            }}
            className="w-full h-32 border border-dashed border-[#24292f]/40 cursor-crosshair bg-[#fdfcf7]"
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   14. 8-Bit 像素街机与 JRPG 战斗对话面板 (8bitcn)
============================================================================ */
function Pixel8BitRichShowcase({ isEn }: { isEn: boolean }) {
  const [hp, setHp] = useState(8);
  const [mp, setMp] = useState(6);
  const [gold, setGold] = useState(1280);
  const [log, setLog] = useState(
    isEn
      ? "▶ SLIME_BUG appeared! Choose an 8-bit command."
      : "▶ 野生「样式崩坏史莱姆」出现了！请选择指令。"
  );

  return (
    <div className="bg-[#020617] p-5 md:p-6 border-4 border-[#f8fafc] font-mono text-[#f8fafc] space-y-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-[#1e293b] pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#facc15] text-[#0f172a] px-2.5 py-0.5 font-bold">STAGE 1-4</span>
          <span className="font-bold">8BITCN // ARCADE QUEST</span>
        </div>
        <span className="text-[#facc15] font-bold">GOLD: {gold}G</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-5 pixel-box bg-[#0f172a] p-4 space-y-3">
          <div className="font-bold text-[#38bdf8]">PARTY STATUS // LV.42</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-[#ef4444]">HP</span>
              <div className="flex gap-1 bg-[#020617] p-1 border-2 border-[#f8fafc]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-3.5 block ${i < hp ? "bg-[#ef4444]" : "bg-slate-800"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-[#38bdf8]">MP</span>
              <div className="flex gap-1 bg-[#020617] p-1 border-2 border-[#f8fafc]">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-3.5 block ${i < mp ? "bg-[#38bdf8]" : "bg-slate-800"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-7 pixel-box bg-[#0f172a] p-4 flex flex-col justify-between space-y-4">
          <div className="leading-relaxed min-h-[3rem]">
            {log}
            <span className="pixel-blink ml-1.5 text-[#facc15]">▼</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setGold((g) => g + 150);
                setLog(
                  isEn
                    ? "▶ CRITICAL HIT! +150G earned!"
                    : "▶ 会心一击！击败了塑料渐变怪，获得 +150G！"
                );
              }}
              className="pixel-btn bg-[#ef4444] text-white py-2 font-bold cursor-pointer"
            >
              ⚔ ATTACK
            </button>
            <button
              type="button"
              onClick={() => {
                setMp((m) => Math.max(0, m - 2));
                setHp(10);
                setLog(
                  isEn
                    ? "▶ Cast PIXEL_HEAL! HP fully restored!"
                    : "▶ 咏唱「像素回复术」！HP 已回满！"
                );
              }}
              className="pixel-btn bg-[#22c55e] text-[#052e16] py-2 font-bold cursor-pointer"
            >
              ✦ HEAL
            </button>
            <button
              type="button"
              onClick={() => {
                setMp(10);
                setLog(isEn ? "▶ Drank ETHER POTION! MP 10/10." : "▶ 饮用以太药水！MP 已恢复至 10/10。");
              }}
              className="pixel-btn bg-[#facc15] text-[#0f172a] py-2 font-bold cursor-pointer"
            >
              ★ POTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   15. 新粗野主义高饱和硬阴影完整展台 (Neo-Brutalism)
============================================================================ */
function NeobrutalismRichShowcase({ isEn }: { isEn: boolean }) {
  const [cardBg, setCardBg] = useState("#ffde59");
  const [sales, setSales] = useState(4280);

  return (
    <div className="bg-[#fffdf7] rounded-xl p-5 md:p-6 border-[3px] border-black shadow-[6px_6px_0_#000] text-black space-y-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-[3px] border-black">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-[#ff6b6b] border-2 border-black font-black uppercase">
            NEOBRUTALISM
          </span>
          <span className="font-mono font-bold">ZERO BLUR · 3PX SOLID BLACK</span>
        </div>
        <div className="flex items-center gap-1.5">
          {["#ffde59", "#a3e635", "#c4b5fd", "#67e8f9"].map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => setCardBg(hex)}
              style={{ backgroundColor: hex }}
              className="w-6 h-6 rounded border-2 border-black shadow-[2px_2px_0_#000] cursor-pointer"
              title={`Pop color ${hex}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        <div
          style={{ backgroundColor: cardBg }}
          className="xl:col-span-7 brutal-card rounded-lg p-5 space-y-3 transition-colors"
        >
          <h3 className="text-xl font-black tracking-tight">
            {isEn
              ? "LOUD COLORS. CRISP 0PX SHADOWS."
              : "高饱和撞色块 + 干脆利落的零模糊硬投影"}
          </h3>
          <p className="font-medium leading-relaxed">
            {isEn
              ? "Click the buttons below to feel the signature 4px snap-to-zero press mechanic made famous by Gumroad and neobrutalism-components."
              : "点击下方按钮感受标志性的 4px 位移贴合手感（阴影在按下瞬间归零，松手弹起）。"}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() => setSales((s) => s + 49)}
              className="brutal-btn bg-white rounded-md px-4 py-2 font-black uppercase cursor-pointer"
            >
              {isEn ? "Buy Pack ($49) →" : "模拟成交一单 (+$49) →"}
            </button>
            <button
              type="button"
              onClick={() => setCardBg("#ffde59")}
              className="brutal-btn bg-[#ff6b6b] text-black rounded-md px-4 py-2 font-black uppercase cursor-pointer"
            >
              {isEn ? "Reset Vibe" : "重置明黄配色"}
            </button>
          </div>
        </div>

        <div className="xl:col-span-5 brutal-card bg-white rounded-lg p-5 flex flex-col justify-between space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-black uppercase">CREATOR REVENUE</span>
            <span className="px-2 py-0.5 bg-[#a3e635] border-2 border-black font-black">+24%</span>
          </div>
          <div className="text-3xl font-black font-mono">${sales.toLocaleString()}</div>
          <div className="h-4 border-2 border-black bg-[#fffdf7] p-0.5">
            <div className="h-full bg-[#ff6b6b] border-r-2 border-black w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   16. 流光溢彩暗黑聚光灯完整展台 (Magic UI / Aceternity UI)
============================================================================ */
function AuroraSpotlightRichShowcase({ isEn }: { isEn: boolean }) {
  const [spot, setSpot] = useState({ x: -200, y: -200 });

  return (
    <div className="aurora-canvas rounded-2xl p-6 border border-white/10 space-y-5 text-xs">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* 左侧：1.5px 旋转圆锥流光边框主推卡 */}
        <div className="xl:col-span-7 beam-wrapper">
          <div className="beam-inner p-6 h-full flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 font-mono text-[11px]">
                ✦ CONIC BORDER BEAM · 1.5PX
              </span>
              <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-sky-100 to-purple-300 bg-clip-text text-transparent">
                {isEn
                  ? "Disciplined Darkness, Razor-Sharp Light."
                  : "克制 92% 曜石暗底，把流光浓缩在 1.5px 边缘"}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {isEn
                  ? "Premium Magic UI / Aceternity layouts avoid flooding cards with loud purple fills — keeping surfaces crisp #0B0B13 while edge beams and cursor spotlights do the talking."
                  : "高级的流光动效绝不是涂满廉价紫蓝渐变背景，而是用实色深黑 #0B0B13 托底，仅让纤细旋转光束与光标聚光灯呼吸发光。"}
              </p>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                className="rounded-full bg-white text-zinc-950 px-4 py-2 font-semibold hover:bg-zinc-200 transition cursor-pointer"
              >
                {isEn ? "Deploy Edge Mesh →" : "立即部署流光节点 →"}
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：鼠标实时跟随径向聚光灯探测卡 */}
        <div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onMouseLeave={() => setSpot({ x: -200, y: -200 })}
          style={{
            background: `radial-gradient(240px circle at ${spot.x}px ${spot.y}px, rgba(56,189,248,0.22), rgba(168,85,247,0.08) 45%, transparent 75%), #0b0b13`,
          }}
          className="xl:col-span-5 rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-4 cursor-crosshair"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-purple-300 font-semibold">RADIAL SPOTLIGHT</span>
            <span className="font-mono text-zinc-500">HOVER ME</span>
          </div>
          <div className="space-y-1.5">
            <div className="text-base font-bold text-white">
              {isEn ? "Move Cursor Inside This Card" : "在此卡片内移动鼠标体验聚光灯"}
            </div>
            <p className="text-zinc-400 leading-relaxed">
              {isEn
                ? "Tracks cursor X/Y coordinates to project a soft 240px radial glow across dark Bento surfaces."
                : "实时追踪鼠标 X/Y 坐标投射 240px 柔和径向光晕，是 Bento Grid 特性矩阵的经典交互。"}
            </p>
          </div>
          <div className="font-mono text-zinc-500 border-t border-white/10 pt-2 flex justify-between">
            <span>SPOT_X: {Math.max(0, Math.round(spot.x))}px</span>
            <span>SPOT_Y: {Math.max(0, Math.round(spot.y))}px</span>
          </div>
        </div>
      </div>
    </div>
  );
}
