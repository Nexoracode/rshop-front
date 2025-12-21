"use client";

export default function useScrollToSection() {
  const handleScrollTo = (key: string) => {
    const el = document.getElementById(key);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 90, // اگر هدر داری این مقدار مناسب است
      behavior: "smooth",
    });
  };
  return { handleScrollTo };
}
