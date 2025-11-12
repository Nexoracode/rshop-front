"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { PropsWithChildren } from "react";

type Props = {
  visible?: "mobile" | "desktop";
};

export default function Responsive({
  children,
  visible = "desktop",
}: PropsWithChildren<Props>) {
  const isMobile = useIsMobile();
  return (visible === "desktop" && !isMobile) ||
    (visible === "mobile" && isMobile)
    ? children
    : null;
}
