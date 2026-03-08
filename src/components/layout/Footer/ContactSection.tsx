import React from "react";
import SocialLinks from "./SocialLinks";
import { getQueryClient } from "@/lib/utils/query-client";
import { getFooterSettings } from "@/queries/home/home";

export default async function ContactSection() {
  const queryClient = getQueryClient();
  const { contact, social } = await queryClient.fetchQuery(getFooterSettings);

  const contactItems = [
    {
      label: "پشتیبان ایتا",
      key: "contact_phone_s",
      link: `tel`,
    },
    {
      label: "تلفن پشتیانی",
      key: "contact_phone_s",
      link: `tel`,
    },
    {
      label: "ایمیل پشتیبانی",
      key: "contact_email",
      link: `mailto:`,
    },
  ];
  return (
    <div className="flex flex-col gap-4 text-sm">
      {contactItems.map(({ label, link, key }) => {
        const contactData = contact.find((i) => i.key === key);
        return (
          <a
            key={label}
            href={`${link}${contactData?.value}`}
            className="flex items-center gap-2  break-words"
          >
            <span>
              {label}
              <span dir="ltr" className="inline-block ">
                {contactData?.value ?? "-"}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
