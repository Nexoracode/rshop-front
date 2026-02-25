import { cn } from "@/lib/utils/classnames";

export default function SliderAspect({
  children,
  className,
}: {
  children: React.ReactNode;
  ratio?: number;
  className?: string;
}) {
  return <div className={cn("relative w-full", className)}>{children}</div>;
}
