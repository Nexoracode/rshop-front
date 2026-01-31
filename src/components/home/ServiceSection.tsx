"use client";

import Image from "next/image";
import React from "react";

const services = [
  {
    icon: "/free-shipping.svg",
    title: "ارسال رایگان",
    subtitle: "برای سفارش‌های بالای ۱۰۰ هزار تومان",
  },
  {
    icon: "/gift.svg",
    title: "پیشنهاد شگفت‌انگیز روزانه",
    subtitle: "تا ۲۵٪ تخفیف ویژه",
  },
  {
    icon: "/support.svg",
    title: "پشتیبانی ۲۴ ساعته",
    subtitle: "با مشاور خرید تماس بگیرید",
  },
  {
    icon: "/guranti.svg",
    title: "قیمت‌های اقتصادی",
    subtitle: "خرید مستقیم از کارخانه",
  },
  {
    icon: "/credit.svg",
    title: "پرداخت امن",
    subtitle: "پرداخت‌های کاملاً محافظت‌شده",
  },
];

export default function ServiceSection() {
  return (
    <section>
      <div className="container-home flex flex-wrap justify-between gap-y-4">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex last:justify-center last:w-full md:last:w-[20%] w-[50%] md:w-[20%] md:min-w-[200px] items-center gap-1.5 md:gap-3 p-1 md:p-4 "
          >
            <Image
              width={28}
              height={28}
              src={service.icon}
              alt={service.title}
              className="w-7 md:w-10 h-7 md:h-10"
            />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {service.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
