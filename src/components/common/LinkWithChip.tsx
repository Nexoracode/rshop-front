import { cn } from "@/lib/utils/classnames";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

type Props = {
  Icon: ReactNode;
  label: string;
  href: string;
  className?: string;
  count: number | null;
} & ComponentProps<typeof Link>;
export default function LinkWithChip({
  href,
  Icon,
  className,
  count,
  ...props
}: Props) {
  return (
    <Link
      className={cn(
        "relative w-6 h-6 flex items-center justify-center text-foreground",
        className,
      )}
      href={href}
      {...props}
    >
      {Icon}
      {count ? (
        <span className="absolute bg-primary-400 w-4 h-4 text-xs font-medium rounded -right-1.5 -bottom-1.5 text-white content-center">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
