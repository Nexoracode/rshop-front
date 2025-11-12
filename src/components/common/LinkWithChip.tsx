import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function LinkWithChip({
  href,
  Icon,
  className,
  count,
}: {
  Icon: ReactNode;
  label: string;
  href: string;
  className?: string;
  count: number | null;
}) {
  return (
    <Link
      className={cn(
        "relative w-6 h-6 flex items-center justify-center text-foreground",
        className
      )}
      href={href}
    >
      {Icon}
      {count ? (
        <span className="absolute bg-primary-400 w-3.5 h-3.5 text-xs font-medium rounded -right-1 -bottom-1 text-white content-center">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
