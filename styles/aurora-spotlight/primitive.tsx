"use client";
import * as React from "react";

export function SpotlightCard({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = React.useState({ x: -200, y: -200 });

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos({ x: -200, y: -200 })}
      style={{
        background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, rgba(56,189,248,0.16), transparent 70%), #0b0b13`,
      }}
      className="rounded-xl border border-white/10 p-5 text-[#f4f4f8] transition-colors"
    >
      {children}
    </div>
  );
}

export function BorderBeamCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[14px] p-[1.5px] bg-white/10">
      <div
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0 72%, #38bdf8 82%, #a855f7 92%, #f472b6 100%)",
        }}
        className="absolute -inset-[120%] animate-[spin_4.5s_linear_infinite]"
      />
      <div className="relative rounded-[12.5px] bg-[#0b0b13] p-5 text-[#f4f4f8]">{children}</div>
    </div>
  );
}
