import * as React from "react";

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
          style={{ transform: `rotate(${angle}deg)` }}
          className="w-0.5 h-24 bg-[#b91c1c] origin-bottom transition-transform duration-150"
        />
        <div className="w-4 h-2.5 rounded-t-full bg-[#232220] absolute bottom-0" />
      </div>
    </div>
  );
}
