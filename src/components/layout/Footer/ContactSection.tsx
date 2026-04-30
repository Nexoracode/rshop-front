"use client";

import React from "react";
import { getFooterSettings } from "@/queries/home/home";
import { useQuery } from "@tanstack/react-query";
import { toFaDigits } from "@/lib/utils/price";

export default function ContactSection() {
  const { data } = useQuery(getFooterSettings);

  if (!data) {
    return <div>در حال لود فوتر</div>;
  }

  const contactItems = [
    {
      label: "تلفن پشتیانی",
      key: "contact_phone",
      link: `tel:`,
    },
    {
      label: "ایمیل",
      key: "contact_email",
      link: `mailto:`,
    },
  ];
  return (
    <div className="flex flex-col gap-6 text-sm">
      {contactItems.map(({ label, link, key }) => {
        const contactData = data?.contact.find((i) => i.key === key);

        return (
          <a
            key={label}
            href={`${link}${contactData?.value}`}
            className="flex items-center gap-2 break-words"
          >
            <span className="w-30 md:hidden xl:flex">{label}</span>
            <p className="w-full text-left text-slate-600">
              {toFaDigits(contactData?.value ?? "") ?? "-"}
            </p>
          </a>
        );
      })}
    </div>
  );
}
