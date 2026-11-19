"use client";
import * as React from "react";

export interface AgentVote {
  name: string;
  role: string;
  approved: boolean;
}

export function MagiConsensusPanel({ votes }: { votes: AgentVote[] }) {
  const octClip = "polygon(9px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 0 calc(100% - 9px), 0 9px)";
  const hazardBg = "repeating-linear-gradient(-45deg, #ff9d00 0 8px, #080a09 8px 16px)";

  return (
    <div className="bg-[#080a09] text-[#ff9d00] border-2 border-[#ff9d00]/80 p-4 font-mono space-y-3">
      <div className="h-2.5 w-full" style={{ background: hazardBg }} />
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
        {votes.map((v) => (
          <div
            key={v.name}
            style={{ clipPath: octClip }}
            className={`border p-3 ${
              v.approved ? "border-[#22ff66] bg-[#22ff66]/15 text-[#22ff66]" : "border-[#ff2a2a] bg-[#ff2a2a]/20 text-[#ff2a2a]"
            }`}
          >
            <div className="text-[#ff9d00] opacity-75">{v.name}</div>
            <div className="text-sm font-bold">{v.approved ? "APPROVE" : "VETO"}</div>
            <div className="opacity-70">{v.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
