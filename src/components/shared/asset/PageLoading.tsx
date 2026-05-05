"use client";

import PageLoader from "@/components/common/PageLoader";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

export default function PageLoading({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  return isMobile === null ? <PageLoader /> : children;
}
