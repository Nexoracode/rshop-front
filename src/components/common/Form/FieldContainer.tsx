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
    <div className={cn("relative w-full")}>
      {label ? (
        <Label className="mb-1 text-xs text-muted ps-1">
          {label}
          {required ? <span className="text-rose-500">{"*"}</span> : null}
        </Label>
      ) : null}

      {children}

      {error ? (
        <p className="text-xs mt-1.5 text-danger">{error}</p>
      ) : null}
    </div>
  );
}
