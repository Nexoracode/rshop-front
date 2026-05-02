"use client";

import * as React from "react";
import {
  useController,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

import FieldContainer from "./FieldContainer";
import Select from "react-select";
import { cn } from "@/lib/utils/classnames";

interface Option {
  label: string;
  value: string | number;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

export default function SelectField<T extends FieldValues>({
  name,
  label,
  placeholder = "انتخاب کنید...",
  options,
  required,
  disabled,
  className,
  loading,
}: Props<T>) {
  const { control } = useFormContext<T>();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? `انتخاب فیلد ${label} الزامی است.` : undefined,
    },
  });

  return (
    <FieldContainer label={label} error={error?.message} required={required}>
      <Select<Option>
        options={loading ? [] : options}
        value={options.find((o) => o.value === value) || null}
        onChange={(opt) => onChange(opt ? opt.value : "")}
        isDisabled={disabled}
        placeholder={loading ? " در حال دریافت..." : placeholder}
        className={cn(
          "input border border-muted-light w-full !p-0 ",
          className,
          error && "border-rose-500 focus-visible:ring-rose-500",
        )}
        classNames={{
          input: () => "w-full p-0",
          indicatorSeparator: () => "hidden",
          dropdownIndicator: () => "text-lg",
          menu: () => "rounded-lg shadow-lg",
          control: () =>
            `w-full !border-0 !border-transparent !shadow-none !outline-0 !bg-transparent !rounded-lg`,
        }}
      />
    </FieldContainer>
  );
}
