import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FieldContainer from "./FieldContainer";
import ImageUpload from "./ImageUpload";

type Props = {
  name: string;
  required?: boolean;
  label: string;
};

export default function ImageUploadField({ name, label, required }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required && `بارگذاری ${label} الزامی است.` }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FieldContainer
          label={label}
          required={required}
          error={error?.message}
        >
          <ImageUpload value={value} onChange={onChange} />
        </FieldContainer>
      )}
    />
  );
}
