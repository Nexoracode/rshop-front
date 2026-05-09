"use client";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import SelectField from "@/components/common/Form/SelectField";
import TextField from "@/components/common/Form/TextField";
import RadioGroupField from "@/components/common/Form/RadioGroupField";
import { useQuery } from "@tanstack/react-query";
import { getCities, getProvinces } from "@/queries/profile/address";

type Props = {
  activeStep: number;
};

export default function AddressFormFields({ activeStep }: Props) {
  const { data, isPending } = useQuery(getProvinces);
  const form = useFormContext();
  const province = form.watch("province");
  const city = form.watch("city");
  const { data: cities, isFetching: citiesFething } = useQuery(
    getCities(Number(province)),
  );
  const is_self = form.watch("is_self");

  useEffect(() => {
    if (city) {
      const cityId = cities?.find((c) => c.title === city)?.city_id;
      form.setValue("cityId", cityId);
    }
  }, [city]);
  return (
    <div className="grid grid-cols-2 gap-4">
      {activeStep === 0 ? (
        <>
          <SelectField
            label="استان"
            name="province"
            required
            loading={isPending}
            options={
              data?.map((i) => ({
                label: i.title,
                value: i.id,
              })) ?? []
            }
          />
          <SelectField
            label="شهر"
            name="city"
            required
            loading={citiesFething}
            placeholder={province ? "انتخاب کنید..." : " استان را انتخاب کنید"}
            options={
              cities?.map((city) => ({
                label: city.title,
                value: city.title,
              })) ?? []
            }
          />
          <div className="col-span-2">
            <TextField required name="address_line" label="آدرس" />
          </div>
          <TextField required name="plaque" maxLength={5} label="پلاک" />
          <TextField required name="unit" type="number" label="واحد" />
          <div className="col-span-2">
            <TextField
              required
              name="postal_code"
              type="number"
              rules={{
                minLength: { value: 10, message: "کد پستی باید 10 رقم باشد" },
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
