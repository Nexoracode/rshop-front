"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FieldContainer from "./FieldContainer";
import { MaskedCardInput } from "./MaskedCardInput";

type Props = {
  name: string;
  label?: string;
  required?: boolean;
};

export default function MaskedCardField({ name, label, required }: Props) {
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
          required={required}
          error={error?.message}
        >
          <MaskedCardInput onChange={onChange} value={value} />
        </FieldContainer>
      )}
    />
  );
}
