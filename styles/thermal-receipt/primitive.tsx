"use client";
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
