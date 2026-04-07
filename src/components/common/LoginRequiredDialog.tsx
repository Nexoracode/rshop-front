"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BaseDialog from "./BaseDialog";
import { usePathname } from "next/navigation";

type MessageKeys = "title" | "description";
type Usage = "cart" | "review" | "wishlist" | "compare" | "support";
const usageMessages: Record<Usage, Record<MessageKeys, string>> = {
  cart: {
    title: "برای افزودن محصول به سبد خرید،",
    description:
      "لازم است وارد حساب کاربری خود شوید.\nبا ورود، می‌توانید سفارش‌ها را مدیریت کنید و تجربه خرید بهتری داشته باشید.",
  },

  review: {
    title: "برای ثبت نظر،",
    description:
      "برای ثبت نظر درباره این محصول، ابتدا وارد حساب کاربری خود شوید.\nبا ورود، می‌توانید تجربه‌تان را به اشتراک بگذارید و به دیگران در انتخاب بهتر کمک کنید.",
  },

  compare: {
    title: "برای مقایسه محصولات،",
    description:
      "برای افزودن این محصول به لیست مقایسه، نیاز است وارد حساب کاربری خود شوید.\nبا ورود، می‌توانید محصولات مختلف را بررسی و انتخاب آگاهانه‌تری داشته باشید.",
  },

  wishlist: {
    title: "برای افزودن به علاقه‌مندی‌ها،",
    description:
      "برای ذخیره این محصول در لیست علاقه‌مندی‌ها، ابتدا وارد حساب کاربری خود شوید.\nبا ورود، می‌توانید محصولات دلخواهتان را ذخیره و بعداً به‌راحتی به آن‌ها دسترسی داشته باشید.",
  },
  support: {
    title: "برای گفتگو با فروشنده",
    description:
      "جهت طرح سوال در مورد محصول و کسب اطلاعات بیشتر ، ابتدا وارد حساب کاربری خود شوید.",
  },
};

type Props = {
  open: boolean;
  usage?: Usage;
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
            <p className="text-center text-base font-medium leading-10">
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
