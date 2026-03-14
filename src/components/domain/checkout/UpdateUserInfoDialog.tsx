import BaseDialog from "@/components/common/BaseDialog";
import TextField from "@/components/common/Form/TextField";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { editProfile } from "@/queries/profile/profile";
import { useMutation } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateUserInfoDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useCurrentUser();
  const form = useForm(user ? { values: user } : {});
  const { mutateAsync, isPending } = useMutation(editProfile);

  const handleSubmit = (values: FieldValues) => {
    mutateAsync(
      {
        first_name: values.first_name,
        last_name: values.last_name,
      },
      {
        onSuccess: () => {
          toast.success("ثبت اطلاعات کاربری با موفقیت انجام شد.");

          setOpen(false);
        },
      },
    );
  };
  return (
    <div>
      <BaseDialog
        title="تکمیل اطلاعات کاربری"
        hiddenFooter
        open={open}
        onOpenChange={setOpen}
        content={
          <div>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-4">
                  <TextField name="first_name" label="نام" />
                  <TextField name="last_name" label="نام خانوادگی" />
                  <Button isLoading={isPending} fullWidth>
                    ثبت
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        }
        trigger={
          <Button
            variant={"fill"}
            size={"sm"}
            color="info"
            className="text-white"
            startIcon={<EditIcon className="size-4" />}
          >
            تکمیل اطلاعات
          </Button>
        }
      />
    </div>
  );
}
