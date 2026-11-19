"use client";
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
        <div className="w-full h-full relative" style={{ transform: `rotate(${-135 + value * 2.7}deg)` }}>
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
      className={`px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider transition-all duration-75 active:translate-y-[3px] ${
        accent
          ? "bg-[#ff5500] text-white shadow-[0_4px_0_#b83b00] active:shadow-[0_1px_0_#b83b00]"
          : "bg-[#f2f0ea] text-[#1e1f22] shadow-[0_4px_0_#aba79c] active:shadow-[0_1px_0_#aba79c]"
      } ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
