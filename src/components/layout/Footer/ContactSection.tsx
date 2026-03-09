import React from "react";
import { getQueryClient } from "@/lib/utils/query-client";
import { getFooterSettings } from "@/queries/home/home";

export default async function ContactSection() {
  const queryClient = getQueryClient();
  const { contact } = await queryClient.fetchQuery(getFooterSettings);

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
        const contactData = contact.find((i) => i.key === key);
        
        return (
          <a
            key={label}
            href={`${link}${contactData?.value}`}
            className="flex items-center gap-2 break-words"
          >
              <span className="w-30">{label}</span>
              <p className="w-full text-left text-slate-600">
                {contactData?.value ?? "-"}
              </p>
          </a>
        );
      })}
    </div>
  );
}
