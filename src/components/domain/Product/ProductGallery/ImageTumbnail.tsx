import { cn } from "@/lib/utils/classnames";

import { Media } from "@/types";
import { Youtube } from "lucide-react";
import Image from "next/image";

export default function ImageTumbnail({
  onClick,
  url,
  type,
  id,
  media_pined,
}: { onClick: () => void; media_pined: Media | null } & Media) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        "relative border rounded-lg h-18 w-18 md:h-22 md:w-22 flex-1 max-w-18 md:max-w-22 cursor-pointer overflow-hidden bg-white transition",
      )}
    >
      {type === "image" ? (
        <Image src={url} alt={`thumbnail ${id}`} fill className="rounded-xl" />
      ) : (
        <div
          style={{ backgroundImage: `url(${media_pined?.url})` }}
          className="flex w-full h-full relative bg-contain items-center justify-center"
        >
          <div className="absolute w-full h-full left-0 top-0 inset-0 bg-white/5 backdrop-blur-xs"></div>

          <Youtube fontSize={32} className="relative z-10 text-primary" />
        </div>
      )}
    </div>
  );
}
