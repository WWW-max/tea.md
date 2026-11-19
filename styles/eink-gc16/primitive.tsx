"use client";
import * as React from "react";

export function EInkRefreshStage({
  refreshTrigger,
  children,
}: {
  refreshTrigger: string | number;
  children: React.ReactNode;
}) {
  const [flashing, setFlashing] = React.useState(false);

  React.useEffect(() => {
    setFlashing(true);
    const id = setTimeout(() => setFlashing(false), 340);
    return () => clearTimeout(id);
  }, [refreshTrigger]);

  return (
    <div
      style={
        flashing
          ? { filter: "invert(1) contrast(1.4)", transition: "none" }
          : { filter: "invert(0)", transition: "none" }
      }
      className="bg-[#f1eee7] text-[#141413] border-2 border-[#141413] p-5 font-serif"
    >
      {children}
    </div>
  );
}
