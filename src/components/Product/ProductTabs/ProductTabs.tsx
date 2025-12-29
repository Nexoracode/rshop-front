"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TabKey = "description" | "specifications" | "reviews" | "helper";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "توضیحات" },
  { key: "specifications", label: "ویژگی‌ها" },
  { key: "reviews", label: "دیدگاه‌ها" },
  { key: "helper", label: "راهنمای سایز" },
];

export default function ProductTabs({
  activeTabs: activeTabsProp,
}: {
  activeTabs: Partial<Record<TabKey, boolean>>;
}) {
  const [active, setActive] = useState<TabKey>("description");
  const barRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (key: TabKey) => {
    const el = document.getElementById(key);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    const handleSpy = () => {
      for (const tab of tabs) {
        const section = document.getElementById(tab.key);
        if (!section) continue;
        const rect = section.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(tab.key);
        }
      }
    };
    window.addEventListener("scroll", handleSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleSpy);
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const activeBtn = bar.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!activeBtn) return;

    const barRect = bar.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    // فاصله دکمه از ابتدای inline (صرف‌نظر از RTL/LTR)
    const x = barRect.right - btnRect.right;
    const w = btnRect.width;

    bar.style.setProperty("--x", `${x}px`);
    bar.style.setProperty("--w", `${w}px`);
  }, [active]);

  const activeTabs: Record<TabKey, boolean> = {
    description: true,
    reviews: true,
    specifications: true,
    helper: false,
    ...activeTabsProp,
  };

  return (
    <div className="sticky top-[64px] z-30 bg-background border-b rtl">
      <div ref={barRef} className="relative flex">
        {tabs
          .filter((tab) => activeTabs[tab.key])
          .map((tab) => (
            <button
              key={tab.key}
              data-tab={tab.key}
              onClick={() => handleScrollTo(tab.key)}
              className={cn(
                "py-3 px-4 text-sm transition-colors",
                active === tab.key
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}

        {/* 🔥 خط انیمیشنی زیر تب */}
        <div className="tabs-indicator" />
      </div>
    </div>
  );
}
