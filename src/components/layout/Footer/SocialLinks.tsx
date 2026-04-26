import IconBale from "@/components/Icons/IconBale";
import IconEitaa from "@/components/Icons/IconEitaa";
import IconRubika from "@/components/Icons/IconRubika";
import { PublicSettings } from "@/types/home";
import { InstagramIcon, MessageCircle, SendIcon } from "lucide-react";
import React from "react";

export default function SocialLinks({ data }: { data: Array<PublicSettings> }) {
  const socialItems = [
    /*     {
      key: "social_eitaa_x",
      Icon: TwitterIcon,
      label: "ایکس",
    }, */
    {
      key: "social_eitaa",
      Icon: IconEitaa,
      label: "ایتا",
    },
    {
      key: "social_bale",
      Icon: IconBale,
      label: "بله",
    },
    {
      key: "social_rubika",
      Icon: IconRubika,
      label: "روبیکا",
    },
    {
      key: "social_whatsapp",
      Icon: MessageCircle,
      label: "واتساپ",
    },
    {
      key: "social_instagram",
      Icon: InstagramIcon,
      label: "اینستاگرام",
    },
    {
      key: "social_telegram",
      Icon: SendIcon,
      label: "تلگرام",
    },
  ];

  return (
    <div className="flex justify-end w-full">
      <div className="grid grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 xl:gap-2.5 justify-items-end" dir="ltr">
        {socialItems.map(({ Icon, ...s }) => {
          const socialItem = data.find((i) => i.key === s.key);
          return socialItem ? (
            <div key={socialItem.key} className="w-[40px] h-[40px] flex items-center justify-center rounded-md border">
              <a
                href={!socialItem.value.includes("https://") ? `https://${socialItem.value}` : socialItem.value}
                target="_blank"
                className="text-muted/50 hover:text-primary transition-all"
              >
                <Icon className="w-6" />
              </a>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
