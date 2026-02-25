import React from "react";
import SocialLinks from "./SocialLinks";
import { Mail, Phone, PhoneCall, Send } from "lucide-react";
import { getQueryClient } from "@/lib/utils/query-client";
import { getFooterSettings } from "@/queries/home/home";

export default async function ContactSection() {
  const queryClient = getQueryClient();
  const { contact, social } = await queryClient.fetchQuery(getFooterSettings);

  const contactItems = [
    {
      label: "تلفن ثابت",
      key: "contact_phone_s",
      link: `tel`,
      Icon: Phone,
    },
    {
      label: "همراه",
      key: "contact_phone",
      link: `tel:`,
      Icon: PhoneCall,
    },
    {
      label: "ایمیل",
      key: "contact_email",
      link: `mailto:`,
      Icon: Mail,
    },
    {
      label: "پشتیبانی ایتا",
      key: "contact_eitaa",
      link: `https://eitaa.com/s/`,
      Icon: Send,
    },
  ];
  return (
    <div className="min-w-0 space-y-4">
      <p className="text-sm font-semibold">ارتباط با ما</p>
      <div className="space-y-5 text-sm">
        {contactItems.map(({ Icon, label, link, key }) => {
          const contactData = contact.find((i) => i.key === key);
          return (
            <a
              key={label}
              href={`${link}${contactData?.value}`}
              className="flex items-center gap-2  break-words"
            >
              <Icon className="h-4 w-4" />
              <span>
                {label}:{" "}
                <span dir="ltr" className="inline-block ">
                  {contactData?.value ?? "-"}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <SocialLinks data={social} />
    </div>
  );
}
