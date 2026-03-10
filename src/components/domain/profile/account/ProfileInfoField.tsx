"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import TextField from "@/components/common/Form/TextField";

type Props = {
  fields: Array<{
    label: string;
    name: string;
    required?: string;
  }>;
  label: string;
  type?: "email" | "text";
  className?: string;
};

export default function ProfileInfoField({
  fields,
  label,
  type = "text",
  className
}: Props) {
  const [editing, setEditing] = useState(false);

  const { getValues, formState } = useFormContext();

  const hasValue = fields.find((field) => getValues(field.name));

  useEffect(() => {
    if (formState.isSubmitSuccessful) setEditing(false);
  }, [formState.isSubmitSuccessful]);

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between last:border-b-0 border-b last:pb-0 py-3 gap-3 ${className}`}
    >
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        {editing ? (
          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <TextField
                type={type}
                key={field.name}
                className="mt-1 flex-1 shrink-0"
                name={field.name}
                placeholder={`وارد کردن ${field.label}...`}
                autoFocus
              />
            ))}
          </div>
        ) : (
          <p className="mt-1 font-medium text-sm">
            {
              fields
                .map((field) => getValues(field.name) || "ثبت نشده")
                .join(
                  " ",
                ) /*  <span className="text-gray-400">ثبت نشده</span> */
            }
          </p>
        )}
      </div>

      {editing ? (
        <div className="flex gap-2">
          <Button size="sm" type="submit" isLoading={formState.isSubmitting}>
            ذخیره
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setEditing(false)}
          >
            انصراف
          </Button>
        </div>
      ) : (
        <Button
          variant={hasValue ? "outline" : "text"}
          size="sm"
          type="button"
          onClick={() => setEditing(true)}
          startIcon={hasValue ? <Pencil /> : <Plus />}
        ></Button>
      )}
    </div>
  );
}
