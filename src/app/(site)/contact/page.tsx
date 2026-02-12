"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ImageUploadField from "@/components/common/Form/ImageUploadField";

export default function ContactPage() {
  const form = useForm();
  async function onSubmit(values: FieldValues) {
    // اینجا می‌توانید درخواست به سرور یا سرویس ایمیل (Resend, EmailJS, Webhook و ...) بفرستید

    // شبیه‌سازی ارسال موفق
    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast.success("پیام شما با موفقیت ارسال شد!", {
      description: "به‌زودی با شما تماس خواهیم گرفت.",
    });

    form.reset();
  }

  return (
    <div className="container max-w-5xl py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            تماس با ما
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            سوالی دارید؟ پیشنهادی؟ خوشحال می‌شویم نظرات شما را بشنویم.
          </p>
        </div>

        <Card className="border-border/60 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">ارسال پیام</CardTitle>
            <CardDescription>
              فیلدهای ستاره‌دار (*) اجباری هستند.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* نام */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      نام و نام خانوادگی *
                    </label>
                    <Input
                      placeholder="علی رضایی"
                      {...form.register("name", { required: true })}
                    />
                  </div>
                  {/* ایمیل */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ایمیل *
                    </label>
                    <Input
                      placeholder=""
                      type="email"
                      {...form.register("email", { required: true })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      شماره تماس *
                    </label>
                    <Input
                      placeholder="0912-XXX-XXXX"
                      {...form.register("mobile", { required: true })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      شماره سفارش *
                    </label>
                    <Input
                      placeholder="123456"
                      {...form.register("order_id", { required: true })}
                    />
                  </div>
                </div>
                {/* موضوع */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    موضوع پیام *
                  </label>
                  <Input
                    placeholder="پیشنهاد همکاری / سوال فنی / ..."
                    {...form.register("subject", { required: true })}
                  />
                </div>

                {/* پیام */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    پیام شما *
                  </label>
                  <textarea
                    placeholder="جزئیات پیام خود را اینجا بنویسید..."
                    className="w-full min-h-[140px] resize-y border rounded-md p-2"
                    {...form.register("message", { required: true })}
                  />
                </div>

                <div>
                  <ImageUploadField label="بارگزاری تصویر" name="image" />
                </div>
                <div className="w-full flex justify-end">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      "در حال ارسال..."
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>ارسال پیام</span>
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>

          <CardFooter className="flex flex-col items-center justify-center border-t bg-muted/40 py-6 text-center text-sm text-muted-foreground">
            <p>یا مستقیماً با ما تماس بگیرید:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-x-8 gap-y-2">
              <span>ایمیل: support@yourdomain.com</span>
              <span>تلفن: ۰۹۱۲-XXX-XXXX</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
