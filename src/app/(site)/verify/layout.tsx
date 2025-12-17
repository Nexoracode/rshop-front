import PageLoader from "@/components/common/PageLoader";
import React, { PropsWithChildren, Suspense } from "react";

export default function layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
