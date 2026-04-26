"use client";

import { useEffect, useMemo, useState } from "react";

export function useIsMobile(breakpoint: number = 768): boolean {
  const query = useMemo(
    () => `(max-width: ${breakpoint - 0.02}px)`,
    [breakpoint],
  );

  // ✅ همیشه false در ابتدا (چه سرور چه کلاینت)
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;

    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // تنظیم مقدار اولیه صحیح بعد از mount
    setIsMobile(mql.matches);

    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // fallback برای مرورگرهای قدیمی
      (mql as any).addListener(onChange);
      return () => (mql as any).removeListener(onChange);
    }
  }, [query]);

  return isMobile;
}