"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TabKey = "description" | "specifications" | "reviews" | "help";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "توضیحات" },
  { key: "specifications", label: "ویژگی‌ها" },
  { key: "reviews", label: "دیدگاه‌ها" },
  { key: "help", label: "پرسش و پاسخ" },
];

export default function ProductTabs() {
  const [active, setActive] = useState<TabKey>("description");
  const barRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (key: TabKey) => {
    const el = document.getElementById(key);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 90, // اگر هدر داری این مقدار مناسب است
      behavior: "smooth",
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

  return (
    <div className="sticky top-[64px] z-40 bg-background border-b rtl">
      <div ref={barRef} className="relative flex">
        {tabs.map((tab) => (
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
