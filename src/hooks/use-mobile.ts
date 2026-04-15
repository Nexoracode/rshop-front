"use client";

import { useEffect, useMemo, useState } from "react";

export function useIsMobile(breakpoint: number = 768): boolean {
  const query = useMemo(
    () => `(max-width: ${breakpoint - 0.02}px)`, // the -0.02 avoids edge off-by-one at exactly breakpoint
    [breakpoint],
  );

  // Initial state is computed only on client; false on server to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    setIsMobile(() => {
      if (typeof window === "undefined" || !("matchMedia" in window))
        return false;
      return window.matchMedia(query).matches;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;

    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // sync in case breakpoint changed
    setIsMobile(mql.matches);

    // Safari < 14 fallback: addListener/removeListener
    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // @ts-expect-error legacy API
      mql.addListener(onChange);
      // @ts-expect-error legacy API
      return () => mql.removeListener(onChange);
    }
  }, [query]);

  return isMobile;
}
