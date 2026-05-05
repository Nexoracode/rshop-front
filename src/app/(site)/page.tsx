import PageLoader from "@/components/common/PageLoader";
import HomePage from "@/components/domain/home/HomePage";
import { Suspense } from "react";

export const revalidate = 600;

export default function Home() {
  return (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  );
}
