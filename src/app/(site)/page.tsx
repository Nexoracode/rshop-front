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

/*    <div className="w-full flex justify-center items-center h-[50rem]">
        <LoaderDots className="text-primary" size={8} count={3} />
      </div> */
