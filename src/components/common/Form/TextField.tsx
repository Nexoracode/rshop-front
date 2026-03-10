import { Input } from "@/components/ui/input";
import React, { ComponentProps } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import PhoneInput from "./PhoneInput";
import OtpInput from "./OtpInput";
import FieldContainer from "./FieldContainer";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/utils/classnames";

const validateRules = {
  phone: {
    regex: /^09\d{9}$/,
    message: "شماره موبایل وارد شده صحیح نمی باشد.",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "آدرس ایمیل وارد شده صحیح نمی باشد.",
  },
} as const;
type Props = {
  label?: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  type?:
    | "text"
    | "email"
    | "password"
    | "otp"
    | "phone"
    | "number"
    | "textarea";
  rows?: number;
} & ComponentProps<typeof Input>;

export default function TextField({
  name = "field",
  required,
  rules,
  label,
  type = "text",
  rows = 8,
  ...props
}: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        validate:
          type && type in validateRules
            ? (value: string) => {
                const rule = validateRules[type as keyof typeof validateRules];
                return rule.regex.test(value) || rule.message;
              }
            : undefined,
        required: required
          ? `ورود مقدار ${label ?? "این فیلد"} الزامی است`
          : undefined,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        if (type === "phone")
          return (
            <FieldContainer
              required={required}
              label={label}
              error={error?.message}
            >
              <PhoneInput
                error={error?.message}
                onChange={(v) => onChange(v)}
              />
            </FieldContainer>
          );
        if (type === "otp")
          return (
            <FieldContainer
              required={required}
              label={label}
              error={error?.message}
            >
              <OtpInput onChange={(otp) => onChange(otp)} />
            </FieldContainer>
          );
        if (type === "number")
          return (
            <FieldContainer
              required={required}
              label={label}
              error={error?.message}
            >
              <Input
                dir="ltr"
                inputMode={"numeric"}
                pattern={"[0-9]*"}
                placeholder=""
                value={value}
                onChange={(e) =>
                  !/^[0-9]*$/.test(e.target.value)
                    ? toast.error(`برای فیلد ${label} فقط ورود عدد مجاز است.`)
                    : onChange(e.target.value)
                }
                className={cn(
                  "text-right tracking-widest input",
                  error && "border-rose-500 focus-visible:ring-rose-500",
                )}
                {...props}
              />
            </FieldContainer>
          );
        if (type === "textarea")
          return (
            <FieldContainer
              required={required}
              label={label}
              error={error?.message}
            >
              <Textarea
                dir="rtl"
                placeholder=""
                value={value || ""}
                rows={rows}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                  "text-right text-wrap max-w-full resize-none input !h-[unset]",
                  error && "border-rose-500 focus-visible:ring-rose-500",
                  props.className,
                )}
              />
            </FieldContainer>
          );
        return (
          <FieldContainer
            required={required}
            label={label}
            error={error?.message}
          >
            <Input
              inputMode={"text"}
              placeholder=""
              value={value || ""}
              aria-invalid={!!error}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                "text-right  tracking-widest input ",
                error &&
                  "ring-danger border-rose-500  focus-visible:ring-rose-500",
              )}
              {...props}
            />
          </FieldContainer>
        );
      }}
    />
  );
}
