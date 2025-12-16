import { Skeleton } from "@/components/ui/skeleton";

export default function ProductReviewsSummarySkeleton() {
  return (
    <div className="space-y-5">
      {/* average rate */}
      <Skeleton className="h-8 w-24 mx-auto" />

      {/* stars + count */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>

      {/* description */}
      <Skeleton className="h-4 w-48" />

      {/* submit button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
