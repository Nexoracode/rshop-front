import IconBale from "@/components/Icons/IconBale";
import IconEitaa from "@/components/Icons/IconEitaa";
import IconRubika from "@/components/Icons/IconRubika";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PublicSettings } from "@/types/home";
import {
  InstagramIcon,
  MessageCircle,
  SendIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

export default function SocialLinks({ data }: { data: Array<PublicSettings> }) {
  const socialItems = [
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
    {
      key: "social_whatsapp",
      Icon: MessageCircle,
      label: "واتساپ",
    },
    {
      key: "social_eitaa_x",
      Icon: TwitterIcon,
      label: "ایکس",
    },
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
  ];

  return (
    <div className="space-y-5">
      <button className="text-sm flex items-center justify-between w-full font-semibold">
        ارتباط با ما
      </button>
      <div className="grid grid-cols-2 w-fit gap-4">
        {socialItems.map(({ Icon, ...s }) => {
          const socialItem = data.find((i) => i.key === s.key);
          return socialItem ? (
            <Tooltip key={socialItem.key}>
              <TooltipTrigger asChild>
                <a
                  href={socialItem.value}
                  aria-label={socialItem.description ?? ""}
                  className="inline-flex text-muted/50 items-center justify-center w-10 h-10  hover:text-primary transition "
                >
                  <Icon className="size-6" />
                </a>
              </TooltipTrigger>
              <TooltipContent>{s.label}</TooltipContent>
            </Tooltip>
          ) : null;
        })}
      </div>
    </div>
  );
}
