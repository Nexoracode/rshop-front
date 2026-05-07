"use client";

import ProfileInfoField from "./ProfileInfoField";
import useCurrentUser from "@/hooks/useCurrentUser";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "@/queries/profile/profile";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import ProfileSectionBox from "../ProfileSectionBox";

export default function ProfileInfoPage() {
  const user = useCurrentUser();
  const { mutate } = useMutation(editProfile);
  const form = useForm({ values: user.user ?? {} });
  const handleSubmit = ({ email, first_name, last_name }: FieldValues) => {
    mutate(
      { email, first_name, last_name },
      {
        onSuccess: () =>
          toast.success("ویرایش اطلاعات کاربری با موفقیت انجام شد."),
      },
    );
  };

  return (
    <ProfileSectionBox title="اطلاعات حساب کاربری" className="!min-h-fit">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <ProfileInfoField
            label="نام و نام خانوادگی"
            fields={[
              { label: "نام", name: "first_name" },
              { label: "نام خانوادگی", name: "last_name" },
            ]}
            className="border-b-0"
          />
          <hr />
          <ProfileInfoField
            type="email"
            label="ایمیل"
            fields={[{ label: "آدرس ایمیل", name: "email" }]}
          />
        </form>
      </FormProvider>
    </ProfileSectionBox>
  );
}
