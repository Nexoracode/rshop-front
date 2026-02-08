import * as React from "react";

import { cn } from "@/lib/utils/classnames";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-neutral-200 placeholder:text-muted focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-danger/20  aria-invalid:border-danger  flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
