"use client";
import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { regions } from "@/data/regions";
import SelectField from "../Form/SelectField";
import TextField from "../Form/TextField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RadioGroupField from "../Form/RadioGroupField";
import { useMutation } from "@tanstack/react-query";
import { addUserAddress, updateUserAddress } from "@/queries/address";
import ButtonLoading from "../ButtonLoading";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserAddress } from "@/types/user";

type Props = {
  address: UserAddress | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddressForm({ address, open, onOpenChange }: Props) {
  const { user } = useCurrentUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const {
    mutate: addAddress,
    isPending,
    isSuccess,
  } = useMutation(addUserAddress);
  const {
    mutate: updateAddress,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useMutation(updateUserAddress);
  const form = useForm({
    values: address || {
      city: "",
      province: "",
      plaque: "",
      unit: "",
      address_line: "",
      postal_code: "",
      address_name: "",
      is_self: "true",
    },
    shouldUnregister: false,
  });

  const handleNextStep = () => {
    form
      .trigger(["province", "city", "address_line", "postal_code", "plaque"])
      .then((v) => {
        if (v) setActiveStep(1);
      });
  };

  const handleSubmit = (data: FieldValues) => {
    const {
      address_line,
      address_name,
      city,
      plaque,
      postal_code,
      province,
      recipient_name,
      recipient_phone,
      unit,
      is_primary,
      is_self,
    } = data;
    if (address) {
      updateAddress({
        id: address.id,
        address_line,
        address_name,
        city,
        plaque,
        postal_code,
        province,
        recipient_name,
        recipient_phone,
        unit,
        is_primary,
        is_self,
      });
    } else {
      addAddress({
        address_line,
        address_name,
        city,
        plaque,
        postal_code,
        province,
        recipient_name: is_self
          ? `${user?.first_name} ${user?.last_name}`
          : recipient_name,
        recipient_phone: is_self ? user?.phone : recipient_phone,
        unit,
        is_primary,
        is_self,
      });
    }
  };

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      onOpenChange(false);
      form.reset();
    }
  }, [isSuccess, updateSuccess, onOpenChange, form]);

  const province = form.watch("province");
  const is_self = form.watch("is_self");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-xl">
        <FormProvider {...form}>
          <DialogHeader>
            <DialogTitle>افزودن آدرس</DialogTitle>
          </DialogHeader>
          <div className="">
            <form className="space-y-10">
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
                    <TextField required name="plaque" label="پلاک" />
                    <TextField name="unit" label="واحد" />
                    <div className="col-span-2">
                      <TextField
                        required
                        name="postal_code"
                        type="number"
                        maxLength={10}
                        label="کد پستی"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-2">
                      <TextField
                        required
                        name="address_name"
                        label="نام آدرس"
                      />
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
                        <TextField
                          required
                          name="recipient_phone"
                          label="شماره همرا"
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </FormProvider>
        <DialogFooter>
          <div className="flex w-full gap-3">
            {activeStep === 0 ? (
              <Button
                onClick={handleNextStep}
                type="button"
                size={"lg"}
                className="flex-1"
              >
                تایید و ادامه
              </Button>
            ) : (
              <>
                <Button
                  size={"lg"}
                  type="button"
                  className="flex-1"
                  variant="outline"
                  onClick={() => setActiveStep(0)}
                >
                  مرحله قبل
                </Button>
                <ButtonLoading
                  loading={isPending || updatePending}
                  type="button"
                  onClick={form.handleSubmit(handleSubmit)}
                  className="flex-1"
                  size={"lg"}
                >
                  ثبت آدرس
                </ButtonLoading>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
