import { Skeleton } from "@/components/ui/skeleton";

export default function ProductReviewItemSkeleton() {
  return (
    <div className="space-y-3 w-full max-w-4xl border p-4 rounded-lg shadow-xs">
      {/* header */}
      <div className="flex justify-between">
        <div className="flex items-center">
          {/* avatar */}
          <Skeleton className="size-10 rounded-full" />

          <div className="ps-2 space-y-1">
            {/* name */}
            <Skeleton className="h-4 w-28" />
            {/* date */}
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* rating */}
        <Skeleton className="h-4 w-20" />
      </div>

      {/* comment */}
      <div className="space-y-2 p-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[90%]" />
        <Skeleton className="h-3 w-[70%]" />
      </div>
    </div>
  );
}
