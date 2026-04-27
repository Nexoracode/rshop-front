"use client";
import React from "react";
import { regions } from "@/data/regions";
import { useFormContext } from "react-hook-form";
import SelectField from "@/components/common/Form/SelectField";
import TextField from "@/components/common/Form/TextField";
import RadioGroupField from "@/components/common/Form/RadioGroupField";

type Props = {
  activeStep: number;
};

export default function AddressFormFields({ activeStep }: Props) {
  const form = useFormContext();
  const province = form.watch("province");
  const is_self = form.watch("is_self");
  return (
    <div className="grid grid-cols-2 gap-4">
      {activeStep === 0 ? (
        <>
          <SelectField
            label="استان"
            name="province"
            required
            options={regions.map((i) => ({
              label: i.province,
              value: i.province,
            }))}
          />
          <SelectField
            label="شهر"
            name="city"
            required
            options={
              regions
                .find((i) => i.province === province)
                ?.cities.map((i) => ({
                  label: i,
                  value: i,
                })) ?? []
            }
          />
          <div className="col-span-2">
            <TextField required name="address_line" label="آدرس" />
          </div>
          <TextField required name="plaque" type="number" label="پلاک" />
          <TextField name="unit" type="number" label="واحد" />
          <div className="col-span-2">
            <TextField
              required
              name="postal_code"
              type="number"
              rules={{
                minLength: {value: 10, message: "کد پستی باید 10 رقم باشد"},
              }}
              maxLength={10}
              label="کد پستی"
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-2">
            <TextField required name="address_name" label="نام آدرس" />
          </div>
          <div className="col-span-2">
            <RadioGroupField
              name="is_self"
              defaultValue="true"
              options={[
                { label: "تحویل به خودم", value: "true" },
                { label: "تحویل به شخص دیگر", value: "false" },
              ]}
              label="سفارش‌های این آدرس را چه کسی تحویل می‌گیرد؟"
            />
          </div>
          {is_self && is_self === "false" && (
            <>
              <TextField
                required
                name="recipient_name"
                label="نام و نام خانوادگی"
              />
              <TextField required name="recipient_phone" label="شماره همراه" />
            </>
          )}
        </>
      )}
    </div>
  );
}
