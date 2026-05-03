"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils/classnames";
import { getPromoBanners } from "@/queries/home/home";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import ProductsTabsWrapper from "./ProductsTabsWrapper";

type TabKey = "description" | "specifications" | "reviews" | "helper";

const tabs: { key: TabKey; label: string }[] = [
  { key: "description", label: "توضیحات" },
  { key: "specifications", label: "ویژگی‌ها" },
  { key: "reviews", label: "دیدگاه‌ها" },
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

    setActive(key);
  };

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

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% المان باید دیده شود تا رویداد فعال شود
    };
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const observerCallback = (entries: any[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          setActive(sectionId);
        }
      });
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    tabs.forEach((section) => {
      const sectionElement = document.getElementById(section.key);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });
    return () => {
      tabs.forEach((section) => {
        const sectionElement = document.getElementById(section.key);
        if (sectionElement) {
          observer.unobserve(sectionElement);
        }
      });
      observer.disconnect();
    };
  }, []);

  const activeTabs: Record<TabKey, boolean> = {
    description: true,
    reviews: true,
    specifications: true,
    helper: false,
    ...activeTabsProp,
  };

  return (
    <ProductsTabsWrapper>
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
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}

        {/* 🔥 خط انیمیشنی زیر تب */}
        <div className="tabs-indicator" />
      </div>
    </ProductsTabsWrapper>
  );
}
