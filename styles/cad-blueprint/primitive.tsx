"use client";
import * as React from "react";

export function BlueprintDimensionBox({
  title = "MODULE // SCHEMATIC",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="font-mono text-[#e0f2fe] space-y-1.5">
      <div className="flex items-center gap-2 text-xs opacity-75 select-none">
        <span>├</span>
        <div className="h-px flex-1 border-t border-dashed border-sky-400/60" />
        <span>W: {width}px</span>
        <div className="h-px flex-1 border-t border-dashed border-sky-400/60" />
        <span>┤</span>
      </div>
      <div ref={ref} className="relative border border-sky-400/60 bg-[#09223b] p-4">
        <span className="absolute -top-2 -left-1.5 text-xs font-bold">+</span>
        <span className="absolute -top-2 -right-1.5 text-xs font-bold">+</span>
        <span className="absolute -bottom-2 -left-1.5 text-xs font-bold">+</span>
        <span className="absolute -bottom-2 -right-1.5 text-xs font-bold">+</span>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 opacity-80">{title}</div>
        {children}
      </div>
    </div>
  );
}
