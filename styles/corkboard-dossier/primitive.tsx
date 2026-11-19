"use client";
import * as React from "react";

export function RedactedSpoiler({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      onClick={() => setOpen((o) => !o)}
      className={`px-1 rounded-[2px] cursor-pointer transition-colors ${
        open ? "bg-[#fef08a] text-[#161615]" : "bg-[#161615] text-transparent hover:bg-[#fef08a] hover:text-[#161615]"
      }`}
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
