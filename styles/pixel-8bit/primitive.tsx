import * as React from "react";

export function PixelDialogBox({
  speaker,
  children,
}: {
  speaker?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        boxShadow: "inset -4px -4px 0 #475569, inset 4px 4px 0 #cbd5e1, 0 4px 0 #020617",
      }}
      className="bg-[#0f172a] text-[#f8fafc] border-4 border-[#f8fafc] p-4 font-mono text-xs space-y-2 relative"
    >
      {speaker && (
        <div className="inline-block bg-[#facc15] text-[#0f172a] px-2 py-0.5 font-bold uppercase">
          {speaker}
        </div>
      )}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

export function PixelStatBar({
  label,
  value,
  color = "#ef4444",
}: {
  label: string;
  value: number; // 0..10
  color?: string;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="w-8 font-bold">{label}</span>
      <div className="flex gap-1 bg-[#020617] p-1 border-2 border-[#f8fafc]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{ backgroundColor: i < value ? color : "#1e293b" }}
            className="w-2.5 h-3.5 block"
          />
        ))}
      </div>
    </div>
  );
}
