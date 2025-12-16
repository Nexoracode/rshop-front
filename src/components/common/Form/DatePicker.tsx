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
import { toPersainDate } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import FieldContainer from "./FieldContainer";

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
            value={new Date(value ? Date.parse(value) : Date.now())}
            onChange={(date) => onChange(date.toDateString())}
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          fullWidth
          size={"md"}
          endIcon={<CalendarIcon />}
          data-empty={!value}
          className="justify-between input"
        >
          {value ? (
            toPersainDate(value.toDateString())
          ) : (
            <span>یک تاریخ را انتخاب کنید</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar required mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
}
