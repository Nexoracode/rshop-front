"use client";

export default function useScrollToSection() {
  const handleScrollTo = (key: string) => {
    const el = document.getElementById(key);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  return { handleScrollTo };
}
