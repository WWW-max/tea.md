import * as React from "react";

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
        style={{ backgroundColor: `rgba(126, 58, 242, ${shellOpacity})`, backdropFilter: "blur(2.5px)" }}
        className="relative z-10 rounded-xl p-5 border border-purple-300/40 shadow-[inset_0_2px_3px_rgba(255,255,255,0.35)]"
      >
        {children}
      </div>
    </div>
  );
}
