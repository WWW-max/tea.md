import * as React from "react";

export function SketchNotebookCard({
  tapeLabel,
  children,
}: {
  tapeLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
        boxShadow: "2px 3px 0 rgba(36, 41, 47, 0.88)",
      }}
      className="relative bg-[#fdfcf7] text-[#24292f] border-2 border-[#24292f] p-5"
    >
      {tapeLabel && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 bg-[#fde68a]/85 border border-[#24292f]/40 px-3 py-0.5 text-xs font-mono">
          {tapeLabel}
        </div>
      )}
      {children}
    </div>
  );
}

export function HighlighterMark({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-[#fef08a] text-[#24292f] px-1 rounded-[2px] -rotate-1 inline-block">
      {children}
    </mark>
  );
}
