"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, useFormContext } from "react-hook-form";
import FieldContainer from "./FieldContainer";
import { toPersianDate } from "@/lib/utils/date-time";

type DatePickerProps = {
  name: string;
  required: boolean;
  label?: string;
};
export default function DateField({ name, required, label }: DatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `ورود مقدار ${label} الزامی است.` : undefined,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FieldContainer
          label={label}
          error={error?.message}
          required={required}
        >
          <DatePicker
            value={value ? new Date(Date.parse(value)) : undefined}
            onChange={(date) => onChange(date.toISOString().slice(0, 10))}
          />
        </FieldContainer>
      )}
    />
  );
}

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date) => {
    onChange?.(date);
    setOpen(false);
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            fullWidth
            size={"md"}
            endIcon={<CalendarIcon />}
            type="button"
            className="justify-between input"
          >
            {value ? (
              toPersianDate(value.toDateString())
            ) : (
              <span>یک تاریخ را انتخاب کنید</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            required
            mode="single"
            selected={value}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
