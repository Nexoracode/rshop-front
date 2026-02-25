import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/classnames";

export default function FieldContainer({
  error,
  children,
  label,
  required,
}: {
  error: string | undefined;
  children: React.ReactNode;
  label?: string;
  required?: boolean;
}) {
  return (
    <div className={cn("relative w-full pb-5")}>
      {label ? (
        <Label className="mb-1 text-xs text-muted ps-1">
          {label}
          {required ? <span className="text-rose-500">{"*"}</span> : null}
        </Label>
      ) : null}

      {children}

      {error ? (
        <p className="text-xs text-danger absolute right-2 bottom-0">{error}</p>
      ) : null}
    </div>
  );
}
