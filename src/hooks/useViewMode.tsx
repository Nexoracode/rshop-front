"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useIsMobile } from "./use-mobile";

export type ViewMode = "grid" | "list";

export function useViewMode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const modeFromUrl = (searchParams.get("view") as ViewMode) || "grid";

  const viewMode: ViewMode =
    modeFromUrl === "list" && !isMobile ? "grid" : modeFromUrl;

  const setViewMode = (mode: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("view", mode);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    viewMode,
    setViewMode,
    isMobile,
  };
}
