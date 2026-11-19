export interface SoulPrimitiveSpec {
  componentName: string;
  fileName: string;
  summary: string;
  code: string;
}

export const SOUL_PRIMITIVES: Record<string, SoulPrimitiveSpec> = {
  "tactile-synth": {
    componentName: "RotaryKnob & TactileKey",
    fileName: "tactile-synth-primitives.tsx",
    summary: "支持鼠标上下拖拽阻尼调参的工业刻度旋钮 + 3px 物理键程按压键帽",
    code: `"use client";
import * as React from "react";

export function RotaryKnob({
  value,
  onChange,
  label = "PARAM",
}: {
  value: number; // 0..100
  onChange: (next: number) => void;
  label?: string;
}) {
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startVal = value;
    const onMove = (ev: MouseEvent) => {
      const next = Math.min(100, Math.max(0, Math.round(startVal + (startY - ev.clientY) * 0.6)));
      onChange(next);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="inline-flex flex-col items-center gap-1.5 select-none font-mono">
      <div
        onMouseDown={startDrag}
        className="w-16 h-16 rounded-full bg-[#26272b] shadow-[0_5px_10px_rgba(0,0,0,0.32),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center cursor-ns-resize"
      >
        <div className="w-full h-full relative" style={{ transform: \`rotate(\${-135 + value * 2.7}deg)\` }}>
          <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-4 rounded-full bg-[#ff5500]" />
        </div>
      </div>
      <span className="text-xs font-bold tracking-wider text-[#3f3e3a]">{label} · {value}</span>
    </div>
  );
}

export function TactileKey({
  children,
  accent = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { accent?: boolean }) {
  return (
    <button
      {...props}
      className={\`px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider transition-all duration-75 active:translate-y-[3px] \${
        accent
          ? "bg-[#ff5500] text-white shadow-[0_4px_0_#b83b00] active:shadow-[0_1px_0_#b83b00]"
          : "bg-[#f2f0ea] text-[#1e1f22] shadow-[0_4px_0_#aba79c] active:shadow-[0_1px_0_#aba79c]"
      } \${props.className ?? ""}\`}
    >
      {children}
    </button>
  );
}
`,
  },

  "cad-blueprint": {
    componentName: "BlueprintDimensionBox",
    fileName: "cad-blueprint-primitives.tsx",
    summary: "基于 ResizeObserver 实时测量自身像素宽度的 CAD 标尺线框与四角十字准星容器",
    code: `"use client";
import * as React from "react";

export function BlueprintDimensionBox({
  title = "MODULE // SCHEMATIC",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="font-mono text-[#e0f2fe] space-y-1.5">
      <div className="flex items-center gap-2 text-xs opacity-75 select-none">
        <span>├</span>
        <div className="h-px flex-1 border-t border-dashed border-sky-400/60" />
        <span>W: {width}px</span>
        <div className="h-px flex-1 border-t border-dashed border-sky-400/60" />
        <span>┤</span>
      </div>
      <div ref={ref} className="relative border border-sky-400/60 bg-[#09223b] p-4">
        <span className="absolute -top-2 -left-1.5 text-xs font-bold">+</span>
        <span className="absolute -top-2 -right-1.5 text-xs font-bold">+</span>
        <span className="absolute -bottom-2 -left-1.5 text-xs font-bold">+</span>
        <span className="absolute -bottom-2 -right-1.5 text-xs font-bold">+</span>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">{title}</div>
        {children}
      </div>
    </div>
  );
}
`,
  },

  "thermal-receipt": {
    componentName: "ThermalReceiptSlip",
    fileName: "thermal-receipt-primitives.tsx",
    summary: "自带上下锯齿撕纸齿口、虚线撕裂副券与朱红盖章动画的热敏纸票据容器",
    code: `"use client";
import * as React from "react";

export function ThermalReceiptSlip({
  title = "RECEIPT STATEMENT",
  stampedText,
  children,
}: {
  title?: string;
  stampedText?: string;
  children: React.ReactNode;
}) {
  const sawTop: React.CSSProperties = {
    height: 10,
    background: "linear-gradient(-45deg, #faf7ef 5px, transparent 0), linear-gradient(45deg, #faf7ef 5px, transparent 0)",
    backgroundSize: "10px 10px",
  };
  const sawBottom: React.CSSProperties = {
    height: 10,
    background: "linear-gradient(-135deg, #faf7ef 5px, transparent 0), linear-gradient(135deg, #faf7ef 5px, transparent 0)",
    backgroundSize: "10px 10px",
  };

  return (
    <div className="max-w-sm font-mono text-xs drop-shadow-md">
      <div style={sawTop} />
      <div className="bg-[#faf7ef] text-[#191918] px-6 py-4 space-y-3 relative">
        <div className="text-center font-bold text-sm tracking-widest">{title}</div>
        <div className="text-center text-[#57554f]">================================</div>
        {children}
        {stampedText && (
          <div className="absolute right-4 top-6 -rotate-12 border-2 border-[#c82824] text-[#c82824] px-2.5 py-0.5 font-bold text-sm uppercase">
            {stampedText}
          </div>
        )}
      </div>
      <div style={sawBottom} />
    </div>
  );
}
`,
  },

  "eink-gc16": {
    componentName: "EInkRefreshStage",
    fileName: "eink-gc16-primitives.tsx",
    summary: "切换视图时自动触发真实墨水屏 GC16 反色黑闪清残影波形的纸感容器",
    code: `"use client";
import * as React from "react";

export function EInkRefreshStage({
  refreshTrigger,
  children,
}: {
  refreshTrigger: string | number;
  children: React.ReactNode;
}) {
  const [flashing, setFlashing] = React.useState(false);

  React.useEffect(() => {
    setFlashing(true);
    const id = setTimeout(() => setFlashing(false), 340);
    return () => clearTimeout(id);
  }, [refreshTrigger]);

  return (
    <div
      style={
        flashing
          ? { filter: "invert(1) contrast(1.4)", transition: "none" }
          : { filter: "invert(0)", transition: "none" }
      }
      className="bg-[#f1eee7] text-[#141413] border-2 border-[#141413] p-5 font-serif"
    >
      {children}
    </div>
  );
}
`,
  },

  "magi-terminal": {
    componentName: "MagiConsensusPanel",
    fileName: "magi-terminal-primitives.tsx",
    summary: "EVA MAGI 风格八角切角多智能体投票面板与 45° 黑橙斜纹工业警示栏",
    code: `"use client";
import * as React from "react";

export interface AgentVote {
  name: string;
  role: string;
  approved: boolean;
}

export function MagiConsensusPanel({ votes }: { votes: AgentVote[] }) {
  const octClip = "polygon(9px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 0 calc(100% - 9px), 0 9px)";
  const hazardBg = "repeating-linear-gradient(-45deg, #ff9d00 0 8px, #080a09 8px 16px)";

  return (
    <div className="bg-[#080a09] text-[#ff9d00] border-2 border-[#ff9d00]/80 p-4 font-mono space-y-3">
      <div className="h-2.5 w-full" style={{ background: hazardBg }} />
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
        {votes.map((v) => (
          <div
            key={v.name}
            style={{ clipPath: octClip }}
            className={\`border p-3 \${
              v.approved ? "border-[#22ff66] bg-[#22ff66]/15 text-[#22ff66]" : "border-[#ff2a2a] bg-[#ff2a2a]/20 text-[#ff2a2a]"
            }\`}
          >
            <div className="text-[#ff9d00] opacity-75">{v.name}</div>
            <div className="text-sm font-bold">{v.approved ? "APPROVE" : "VETO"}</div>
            <div className="opacity-70">{v.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
  },

  "xuan-wusilan": {
    componentName: "WusilanFrame & CinnabarSeal",
    fileName: "xuan-wusilan-primitives.tsx",
    summary: "宋刻本外粗内细乌丝栏版心容器与阳文/阴文朱砂石章徽章组件",
    code: `import * as React from "react";

export function WusilanFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f7f4eb] text-[#22201d] border-[1.5px] border-[#2b2824] p-[3px] font-serif">
      <div className="border-[0.75px] border-[#2b2824]/55 p-6">{children}</div>
    </div>
  );
}

export function CinnabarSeal({
  children,
  variant = "yang",
}: {
  children: React.ReactNode;
  variant?: "yang" | "yin";
}) {
  return (
    <span
      className={\`inline-flex items-center px-2 py-0.5 font-serif text-xs font-bold tracking-widest rounded-[1px] border-[1.5px] border-[#b82925] \${
        variant === "yin" ? "bg-[#b82925] text-[#f7f4eb]" : "text-[#b82925] bg-[#b82925]/5"
      }\`}
    >
      {children}
    </span>
  );
}
`,
  },

  "split-flap": {
    componentName: "SplitFlapRow",
    fileName: "split-flap-primitives.tsx",
    summary: "单字符独立分叶转轴的机场 Solari 机械翻页时刻表组件",
    code: `"use client";
import * as React from "react";

export function SplitFlapRow({ text }: { text: string }) {
  const bg = "linear-gradient(180deg, #26282d 0%, #202226 49%, #0d0e10 50%, #1c1e22 51%, #17181c 100%)";
  return (
    <div className="inline-flex flex-wrap gap-1.5 bg-[#16171a] p-3 rounded-lg font-mono">
      {[...text.toUpperCase()].map((ch, idx) => (
        <span
          key={\`\${idx}-\${ch}\`}
          style={{ background: bg }}
          className="w-7 h-10 rounded flex items-center justify-center text-base font-bold text-[#ffd100] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_4px_rgba(0,0,0,0.6)]"
        >
          {ch === " " ? "\\u00A0" : ch}
        </span>
      ))}
    </div>
  );
}
`,
  },

  "risograph-print": {
    componentName: "RisoMisprintCard",
    fileName: "risograph-print-primitives.tsx",
    summary: "内置 isolation 隔离与 mix-blend-mode: multiply 大豆油墨双版套色错位卡片",
    code: `import * as React from "react";

export function RisoMisprintCard({
  offsetPx = 4,
  inkA = "#ff48b0",
  inkB = "#0078bf",
  children,
}: {
  offsetPx?: number;
  inkA?: string;
  inkB?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ isolation: "isolate" }} className="bg-[#f8f4ea] text-[#1a2433] p-5 rounded-xl">
      <div className="relative p-1">
        <div
          style={{
            borderColor: inkA,
            backgroundColor: \`\${inkA}22\`,
            transform: \`translate(\${offsetPx}px, \${offsetPx}px)\`,
            mixBlendMode: "multiply",
          }}
          className="absolute inset-0 border-2 rounded-lg pointer-events-none transition-transform hover:translate-x-0 hover:translate-y-0"
        />
        <div
          style={{ borderColor: inkB, mixBlendMode: "multiply" }}
          className="relative border-2 bg-white/75 rounded-lg p-5"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
`,
  },

  "swiss-apothecary": {
    componentName: "MeniscusMeter",
    fileName: "swiss-apothecary-primitives.tsx",
    summary: "带硼硅酸盐毫升刻度线与真实试剂弯月面液位边缘的垂直计量管",
    code: `import * as React from "react";

export function MeniscusMeter({ percent, maxMl = 500 }: { percent: number; maxMl?: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="inline-flex flex-col items-center font-mono text-xs text-[#121211]">
      <div className="relative w-20 h-36 border-2 border-[#121211] rounded-b-xl bg-white overflow-hidden flex items-end">
        <div
          style={{ height: \`\${clamped}%\` }}
          className="w-full bg-[#b45309]/80 border-t-2 border-[#78350f] transition-all duration-500"
        />
        <div className="absolute inset-y-2 right-0 w-8 flex flex-col justify-between pr-1 text-right pointer-events-none">
          {[1, 0.75, 0.5, 0.25].map((r) => (
            <span key={r} className="border-t border-[#121211] text-[11px]">
              {Math.round(maxMl * r)}
            </span>
          ))}
        </div>
      </div>
      <span className="mt-1.5 font-bold">{Math.round((clamped / 100) * maxMl)} mL</span>
    </div>
  );
}
`,
  },

  "analog-tape-deck": {
    componentName: "AnalogVuMeter",
    fileName: "analog-tape-deck-primitives.tsx",
    summary: "钨丝暖琥珀径向背光 + 底部圆轴红针实时摆动的复古 Hi-Fi 电平表",
    code: `import * as React from "react";

export function AnalogVuMeter({ level }: { level: number /* 0..100 */ }) {
  const angle = -40 + (Math.min(100, Math.max(0, level)) / 100) * 80;
  const bg = "radial-gradient(circle at 50% 85%, #ffe6a3 0%, #f3c46b 62%, #cfa04e 100%)";

  return (
    <div
      style={{ background: bg }}
      className="w-56 h-32 rounded-xl border-2 border-[#524d42] shadow-[inset_0_3px_8px_rgba(0,0,0,0.42)] p-3 flex flex-col justify-between font-mono text-xs text-[#2b1d08] relative overflow-hidden"
    >
      <div className="flex justify-between font-bold">
        <span>-20 &nbsp; -10 &nbsp; 0</span>
        <span className="text-[#b91c1c]">+3 &nbsp; +6dB</span>
      </div>
      <div className="text-center font-black tracking-widest opacity-70">VU</div>
      <div className="relative h-10 flex justify-center items-end">
        <div
          style={{ transform: \`rotate(\${angle}deg)\` }}
          className="w-0.5 h-24 bg-[#b91c1c] origin-bottom transition-transform duration-150"
        />
        <div className="w-4 h-2.5 rounded-t-full bg-[#232220] absolute bottom-0" />
      </div>
    </div>
  );
}
`,
  },

  "atomic-purple": {
    componentName: "AtomicPcbShell",
    fileName: "atomic-purple-primitives.tsx",
    summary: "低模糊度半透明原子紫注塑外壳叠加 45° 布线镀金焊盘 SVG 电路板底座",
    code: `import * as React from "react";

export function AtomicPcbShell({
  shellOpacity = 0.42,
  children,
}: {
  shellOpacity?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#231636] text-purple-100 rounded-2xl p-5 overflow-hidden border border-purple-400/50">
      <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" viewBox="0 0 400 180" preserveAspectRatio="none">
        <path d="M10 35 H120 L150 65 H290 L320 35 H390 M25 145 H160 L190 115 H360" stroke="#c084fc" strokeWidth="2.5" fill="none" />
        <circle cx="120" cy="35" r="4.5" fill="#fbbf24" />
        <circle cx="290" cy="65" r="4.5" fill="#fbbf24" />
        <circle cx="160" cy="145" r="4.5" fill="#fbbf24" />
      </svg>
      <div
        style={{ backgroundColor: \`rgba(126, 58, 242, \${shellOpacity})\`, backdropFilter: "blur(2.5px)" }}
        className="relative z-10 rounded-xl p-5 border border-purple-300/40 shadow-[inset_0_2px_3px_rgba(255,255,255,0.35)]"
      >
        {children}
      </div>
    </div>
  );
}
`,
  },

  "corkboard-dossier": {
    componentName: "RedactedSpoiler & CorkDossierCard",
    fileName: "corkboard-dossier-primitives.tsx",
    summary: "悬停或点击揭开荧光黄底明文的机密涂黑组件与立体红图钉牛皮纸档案卡",
    code: `"use client";
import * as React from "react";

export function RedactedSpoiler({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      onClick={() => setOpen((o) => !o)}
      className={\`px-1 rounded-[2px] cursor-pointer transition-colors \${
        open ? "bg-[#fef08a] text-[#161615]" : "bg-[#161615] text-transparent hover:bg-[#fef08a] hover:text-[#161615]"
      }\`}
    >
      {children}
    </span>
  );
}

export function CorkDossierCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#efe4c8] text-[#1f1c18] p-4 shadow-md -rotate-1 border border-[#cbbba0] font-mono text-xs space-y-2">
      <div className="w-4 h-4 rounded-full bg-rose-600 border-2 border-white mx-auto -mt-6 shadow" />
      <div className="text-rose-700 font-bold border-b border-[#1f1c18]/20 pb-1">{title}</div>
      {children}
    </div>
  );
}
`,
  },
};
