"use client";

import React from "react";

const services = [
  {
    icon: "/footer/delivery.svg",
    title: "ارسال سریع",
  },
  {
    icon: "/footer/mark.svg",
    title: "پیشنهاد شگفت‌انگیز روزانه",
  },
  {
    icon: "/footer/supports.svg",
    title: "پشتیبانی ۲۴ ساعته",
  },
  {
    icon: "/footer/box-7.svg",
    title: "قیمت‌های اقتصادی",
  },
  {
    icon: "/footer/money.svg",
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
          {/* w-7 md:w-10 h-7 md:h-10 */}
          <img
            className="inline-block mr-2"
            src={service.icon}
            width="56"
            height="56"
            alt="Logo Svg"
            style={{ objectFit: "cover" }}
          />
          <h3 className="text-[13px] text-slate-800">{service.title}</h3>
        </div>
      ))}
    </section>
  );
}
