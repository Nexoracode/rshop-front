"use client";

import ProfileInfoField from "./ProfileInfoField";
import { Card } from "@/components/ui/card";
import useCurrentUser from "@/hooks/useCurrentUser";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "@/queries/profile/profile";
import { toast } from "sonner";

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
    <Card>
      <h1 className="text-lg font-semibold">اطلاعات حساب کاربری</h1>

      <Card className="p-4 divide-y">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ProfileInfoField
              label="نام و نام خانوادگی"
              fields={[
                { label: "نام", name: "first_name" },
                { label: "نام خانوادگی", name: "last_name" },
              ]}
            />

            <ProfileInfoField
              type="email"
              label="ایمیل"
              fields={[{ label: "آدرس ایمیل", name: "email" }]}
            />
          </form>
        </FormProvider>
      </Card>
    </Card>
  );
}
