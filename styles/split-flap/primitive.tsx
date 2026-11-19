"use client";
import * as React from "react";

export function SplitFlapRow({ text }: { text: string }) {
  const bg = "linear-gradient(180deg, #26282d 0%, #202226 49%, #0d0e10 50%, #1c1e22 51%, #17181c 100%)";
  return (
    <div className="inline-flex flex-wrap gap-1.5 bg-[#16171a] p-3 rounded-lg font-mono">
      {[...text.toUpperCase()].map((ch, idx) => (
        <span
          key={`${idx}-${ch}`}
          style={{ background: bg }}
          className="w-7 h-10 rounded flex items-center justify-center text-base font-bold text-[#ffd100] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_4px_rgba(0,0,0,0.6)]"
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </div>
  );
}
