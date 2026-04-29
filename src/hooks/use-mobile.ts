"use client";

import { useEffect, useMemo, useState } from "react";

export function useIsMobile(breakpoint: number = 768): boolean | null {
  const query = useMemo(
    () => `(max-width: ${breakpoint - 0.02}px)`,
    [breakpoint],
  );

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;

    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
