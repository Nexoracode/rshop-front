import { cn } from "@/lib/utils/classnames";
import { SideBanners } from "@/types/home";
import Image from "next/image";
import Link from "next/link";

export default function PromoCard({
  badge_color,
  badge_text,
  image_url,
  background_color,
  link,
  subtitle,
  title,
}: SideBanners) {
  return (
    <Link
      href={link}
      style={{ backgroundColor: background_color || "#fafafa" }}
      className="relative block md:aspect-[4/3] border aspect-[6/4] overflow-hidden rounded-lg"
    >
      <div className="relative w-full h-full">
        <div
          className={cn(
            "absolute z-20   overflow-hidden left-0 ",
            title
              ? "w-[60%]  aspect-square top-[50%] -translate-y-[50%] -translate-x-[30%]"
              : "w-full h-full top-0",
          )}
        >
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-contain hover:scale-105 transition-transform"
          />
        </div>
        {title && (
          <div className="absolute w-full p-2 h-full justify-evenly flex flex-col top-0 right-0">
            {badge_text && (
              <div
                style={{ backgroundColor: badge_color || "#ededed" }}
                className="text-primary inline-block w-fit p-1 rounded-full text-xs font-bold"
              >
                {badge_text}
              </div>
            )}
            <h3 className="mt-1 max-w-1/2  font-bold text-sm md:text-2xl text-slate-900">
              {title}
            </h3>
            {subtitle && (
              <p className="text-primary max-w-2/3 md:max-w-1/2 text-xs md:text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
