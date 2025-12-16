"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BaseDialog from "./BaseDialog";
import { usePathname } from "next/navigation";

type MessageKeys = "title" | "description";
type Usage = "cart" | "review";
const usageMessages: Record<Usage, Record<MessageKeys, string>> = {
  cart: {
    title: "برای افزودن محصول به سبد خرید،",
    description:
      "با ورود، می‌توانید سفارش‌ها را مدیریت کنید \nو تجربه خرید بهتری داشته باشید.",
  },
  review: {
    title: "برای ثبت نظر",
    description:
      "برای ثبت نظر درباره این محصول، نیاز است وارد حساب کاربری خود شوید.   \n با ورود، می‌توانید تجربه‌تان را به اشتراک بگذارید و به دیگران کمک کنید بهتر انتخاب کنند.",
  },
};

type Props = {
  open: boolean;
  usage?: "cart" | "review";
  onOpenChange: (open: boolean) => void;
  loginHref?: string;
};

export function LoginRequiredDialog({
  open,
  onOpenChange,
  usage = "cart",
  loginHref = "/users/login",
}: Props) {
  const pathName = usePathname();
  return (
    <BaseDialog
      className="w-full max-w-sm"
      open={open}
      onOpenChange={onOpenChange}
      title="برای ادامه باید وارد شوید"
      footer={
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            fullWidth
            onClick={() => onOpenChange(false)}
          >
            بستن
          </Button>

          <Button
            href={{
              pathname: loginHref,
              query: { backUrl: pathName },
            }}
            className="w-full"
          >
            ورود به حساب
          </Button>
        </div>
      }
      content={
        <div className="relative flex flex-col items-center w-full">
          <Image
            src="/password-manager.png" // مسیر عکس دلخواهت
            alt="Login required illustration"
            className="object-cover"
            width={140}
            height={140}
          />

          <div className="mt-4 space-y-2">
            <p className="text-center text-base font-semibold leading-10">
              {usageMessages[usage].title}
              <br />
              لطفاً ابتدا وارد حساب کاربری خود شوید.
            </p>
            <p className="text-center text-sm leading-8 text-muted">
              {usageMessages[usage].description}
            </p>
          </div>
        </div>
      }
    />
  );
}
