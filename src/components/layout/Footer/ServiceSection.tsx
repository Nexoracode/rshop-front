"use client";

import Image from "next/image";
import React from "react";

const services = [
  {
    icon: "/free-shipping.svg",
    title: "ارسال رایگان",
  },
  {
    icon: "/gift.svg",
    title: "پیشنهاد شگفت‌انگیز روزانه",
  },
  {
    icon: "/support.svg",
    title: "پشتیبانی ۲۴ ساعته",
  },
  {
    icon: "/guranti.svg",
    title: "قیمت‌های اقتصادی",
  },
  {
    icon: "/credit.svg",
    title: "پرداخت امن",
  },
];

export default function ServiceSection() {
  return (
    <section className="hidden lg container-home lg:flex flex-wrap justify-between gap-y-4 mt-8 mb-12">
      {services.map((service, idx) => (
        <div
          key={idx}
          className="w-40 relative flex flex-col items-center gap-3"
        >
          <div className="bg-primary-50 w-14 h-14 rounded-full absolute right-9 -top-3 -z-10"></div>
          <Image
            width={28}
            height={28}
            src={service.icon}
            alt={service.title}
            className="w-7 md:w-10 h-7 md:h-10"
          />
          <h3 className="text-[13px] text-primary-600">
            {service.title}
          </h3>
        </div>
      ))}
    </section>
  );
}
