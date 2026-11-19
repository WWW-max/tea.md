import * as React from "react";

export function MeniscusMeter({ percent, maxMl = 500 }: { percent: number; maxMl?: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="inline-flex flex-col items-center font-mono text-xs text-[#121211]">
      <div className="relative w-20 h-36 border-2 border-[#121211] rounded-b-xl bg-white overflow-hidden flex items-end">
        <div
          style={{ height: `${clamped}%` }}
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
