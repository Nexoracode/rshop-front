import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton({ count }: { count: number }) {
  return [...Array(count)].map((_, i) => (
    <div key={i} className="flex w-full gap-2">
      <Skeleton className="w-14 h-14" />
      <Skeleton className="flex-1 h-14" />
    </div>
  ));
}
