"use client";

import Image from "next/image";
import React from "react";

const services = [
  {
    icon: "https://demo-digitic2.myshopify.com/cdn/shop/files/ser-01.svg?v=1721646955",
    title: "ارسال رایگان",
    subtitle: "برای سفارش‌های بالای ۱۰۰ هزار تومان",
  },
  {
    icon: "https://demo-digitic2.myshopify.com/cdn/shop/files/ser-02.svg?v=1721646954",
    title: "پیشنهاد شگفت‌انگیز روزانه",
    subtitle: "تا ۲۵٪ تخفیف ویژه",
  },
  {
    icon: "https://demo-digitic2.myshopify.com/cdn/shop/files/ser-03.svg?v=1721646955",
    title: "پشتیبانی ۲۴ ساعته",
    subtitle: "با مشاور خرید تماس بگیرید",
  },
  {
    icon: "https://demo-digitic2.myshopify.com/cdn/shop/files/ser-04.svg?v=1721646955",
    title: "قیمت‌های اقتصادی",
    subtitle: "خرید مستقیم از کارخانه",
  },
  {
    icon: "https://demo-digitic2.myshopify.com/cdn/shop/files/ser-05.svg?v=1721646954",
    title: "پرداخت امن",
    subtitle: "پرداخت‌های کاملاً محافظت‌شده",
  },
];

export default function ServiceSection() {
  return (
    <section dir="rtl" className="mt-8 w-full">
      <div className="container mx-auto flex flex-wrap justify-between gap-y-4">
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
