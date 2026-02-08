import HomePage from "@/components/home/HomePage";
import { getQueryClient } from "@/lib/utils/query-client";
import { getHomeSections } from "@/queries/home/home";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const queryClient = getQueryClient();

queryClient.prefetchQuery(getHomeSections);

export default function Home() {
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomePage />
      </HydrationBoundary>

      {/* سکشن قهرمان / بنرها */}
    </>
  );
}
