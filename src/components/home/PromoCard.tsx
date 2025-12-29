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
      className="relative block aspect-[3/2]  overflow-hidden rounded-2xl"
    >
      <div className="relative w-full h-full">
        <div className="absolute z-20 w-[200px]  aspect-square top-[50%] -translate-y-[50%]  overflow-hidden left-0 -translate-x-[30%]">
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-contain  hover:scale-120 transition-transform"
          />
        </div>
        <div className="absolute w-full p-2 h-full justify-center gap-[10%] flex flex-col top-0 right-0">
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
            <p className="text-primary max-w-1/2 text-xs md:text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
