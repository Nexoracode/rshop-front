import { Label } from "@/components/ui/label";

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
    <div className="relative w-full pb-5">
      {label ? (
        <Label className="mb-1 text-xs text-muted ps-1">
          {label}
          {required ? <span className="text-rose-500">{"*"}</span> : null}
        </Label>
      ) : null}

      {children}

      {error ? (
        <p className="text-xs text-rose-500 absolute right-2 bottom-0">
          {error}
        </p>
      ) : null}
    </div>
  );
}
