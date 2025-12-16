import { Input } from "@/components/ui/input";
import { TimerIcon } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FieldContainer from "./FieldContainer";

type Props = {
  name: string;
  required?: boolean;
  label?: string;
};

export default function TimeField({ name, required, label }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      rules={{
        required: required ? `ورود مقدار ${label} الزامی است.` : undefined,
      }}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FieldContainer
          label={label}
          required={required}
          error={error?.message}
        >
          <TimeInput value={value ?? "12:00:00"} onChange={onChange} />
        </FieldContainer>
      )}
    />
  );
}

type TimeInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};
export function TimeInput({ value, onChange }: TimeInputProps) {
  return (
    <div className="w-full relative">
      <Input
        type="time"
        id="time-picker"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        step="1"
        dir="rtl"
        className="bg-background input justify-end text-right  appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />

      <TimerIcon className="absolute text-primary left-3 top-[50%] -translate-y-[50%]" />
    </div>
  );
}
