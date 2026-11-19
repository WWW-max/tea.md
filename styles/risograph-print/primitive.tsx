import * as React from "react";

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
            backgroundColor: `${inkA}22`,
            transform: `translate(${offsetPx}px, ${offsetPx}px)`,
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
