import React from "react";

export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex text-sm w-full border-b py-3 justify-between">
      <span className="text-muted-light">{label}:</span>

      <span className="font-medium">{value}</span>
    </div>
  );
}
