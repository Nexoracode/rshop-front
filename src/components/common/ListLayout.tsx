// components/ui/list-layout.tsx
"use client";

import { cn } from "@/lib/utils/classnames";
import EmptyState from "./EmptyState";

export function ListLayout<T>({
  items,
  loading,
  skeleton,
  renderItem,
  className,
  emptyDescription,
  emptyTitle,
  src,
}: {
  items: T[];
  loading?: boolean;
  skeleton: React.ReactNode;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyDescription?: string;
  emptyTitle?: string;
  src?: string;
}) {
  if (loading) {
    return <div className={cn(className)}>{skeleton}</div>;
  }

  if (!items || items.length === 0) {
    return (
      <div className={cn("mx-auto", className)}>
        {
          <EmptyState
            src={src}
            description={emptyDescription}
            title={emptyTitle}
          />
        }
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}
