"use client";
import { useIsFetching } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect, useState } from "react";
import PageLoader from "../common/PageLoader";

export default function QueryClientWrapper({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);
  const [initialDone, setInitialDone] = useState(false);

  const isFetching = useIsFetching();

  useEffect(() => {
    setMounted(true);
  }, []);

  // فقط بعد از اینکه mounted شد، شروع کن وضعیت isFetching رو چک کن
  useEffect(() => {
    if (mounted && isFetching === 0) {
      setInitialDone(true);
    }
  }, [mounted, isFetching]);

  return !initialDone ? <PageLoader /> : children;
}
