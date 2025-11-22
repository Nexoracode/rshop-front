"use client";
import React from "react";
import FieldContainer from "./FieldContainer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useController, useFormContext } from "react-hook-form";

type Props = {
  options?: { label: string; value: string }[];
  name: string;
  defaultValue: string;
  label: string;
};

export default function RadioGroupField({
  options,
  name,
  defaultValue,
  label,
}: Props) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue });
  return (
    <FieldContainer error={error?.message} label={label} required>
      <RadioGroup
        value={value}
        dir="rtl"
        onValueChange={onChange}
        className="flex flex-wrap gap-2 pt-5"
      >
        {options?.map((op) => (
          <div key={op.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={op.value}
              id={`option-${name}-${op.value}`}
            />
            <Label htmlFor={`option-${name}-${op.value}`}>{op.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </FieldContainer>
  );
}
