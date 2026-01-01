"use client";
import { useMounted } from "@/hooks/useMounted";
import { PropsWithChildren } from "react";

export default function ClientOnly({ children }: PropsWithChildren) {
  const mounted = useMounted();

  if (!mounted) return null;

  return children;
}
