import { cn } from "@/lib/utils/classnames";

import React from "react";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-slate-100 animate-pulse rounded-lg", className)}
      {...props}
    />
  );
}

function Skeletons({
  count = 1,
  ...props
}: { count?: number } & React.ComponentProps<"div">) {
  const skeletons = Array.from({ length: count });
  return (
    <React.Fragment>
      {skeletons.map((_, i) => (
        <Skeleton key={i} {...props} />
      ))}
    </React.Fragment>
  );
}

export { Skeleton, Skeletons };
