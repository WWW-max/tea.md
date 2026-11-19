import * as React from "react";

export function WusilanFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#f7f4eb] text-[#22201d] border-[1.5px] border-[#2b2824] p-[3px] font-serif">
      <div className="border-[0.75px] border-[#2b2824]/55 p-6">{children}</div>
    </div>
  );
}

export function CinnabarSeal({
  children,
  variant = "yang",
}: {
  children: React.ReactNode;
  variant?: "yang" | "yin";
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-serif text-xs font-bold tracking-widest rounded-[1px] border-[1.5px] border-[#b82925] ${
        variant === "yin" ? "bg-[#b82925] text-[#f7f4eb]" : "text-[#b82925] bg-[#b82925]/5"
      }`}
    >
      {children}
    </span>
  );
}
