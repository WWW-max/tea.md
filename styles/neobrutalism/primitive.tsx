import * as React from "react";

export function BrutalCard({
  bg = "#ffffff",
  children,
}: {
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ backgroundColor: bg, boxShadow: "5px 5px 0px #000000" }}
      className="border-[3px] border-black rounded-lg p-5 text-black"
    >
      {children}
    </div>
  );
}

export function BrutalButton({
  bg = "#ffde59",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { bg?: string }) {
  return (
    <button
      {...props}
      style={{ backgroundColor: bg }}
      className="px-4 py-2 rounded-md border-[2.5px] border-black text-black font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
    >
      {children}
    </button>
  );
}
