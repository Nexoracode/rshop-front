"use client";
import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addUserAddress, updateUserAddress } from "@/queries/address";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserAddress } from "@/types/user";
import BaseDialog from "../BaseDialog";
import AddressFormFields from "./AddressFormFields";

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

  return (
    <>
      <BaseDialog
        title={address ? "ویرایش آدرس" : "افزودن آدرس"}
        content={
          <FormProvider {...form}>
            <form>
              <AddressFormFields activeStep={activeStep} />
            </form>
          </FormProvider>
        }
        onClick={() =>
          activeStep === 0
            ? handleNextStep()
            : form.handleSubmit(handleSubmit)()
        }
        open={open}
        onOpenChange={onOpenChange}
        onCancell={() => (activeStep === 1 ? setActiveStep(0) : null)}
        cancellButton={activeStep === 1}
        actionLabel={activeStep === 0 ? "تایید و ادامه" : "ثبت آدرس"}
        loading={isPending || updatePending}
      />
    </>
  );
}
