"use client";
import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addUserAddress, updateUserAddress } from "@/queries/profile/address";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserAddress } from "@/types/user";
import AddressFormFields from "./AddressFormFields";
import BaseDialog from "@/components/common/BaseDialog";

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
    values: address
      ? { ...address, is_self: String(address.is_self) }
      : {
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
    const isSelfBoolean = is_self === "true";
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
        is_self: is_self === "true",
      });
    } else {
      addAddress({
        address_line,
        address_name,
        city,
        plaque,
        postal_code,
        province,
        recipient_name: isSelfBoolean
          ? `${user?.first_name} ${user?.last_name}`
          : recipient_name,
        recipient_phone: isSelfBoolean ? user?.phone : recipient_phone,
        unit,
        is_primary,
        is_self: is_self === "true",
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
