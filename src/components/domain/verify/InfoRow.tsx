import React from "react";

export default function InfoRow({
  label,
  value,
  className,
}: {
  label: string;
  className?: string;
  value: string | number;
}) {
  return (
    <div
      className={`flex text-sm w-full border-b border-slate-200 py-3 justify-between ${className}`}
    >
      <span className="text-slate-500">{label}:</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
