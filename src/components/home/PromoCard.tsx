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
      className="relative block aspect-[6/5] md:aspect-auto overflow-hidden rounded-2xl "
    >
      <div className="relative w-full h-full">
        <div className="absolute bg-muted/50 -bottom-8 md:top-[50%] rounded-full md:-translate-y-[50%]  overflow-hidden -left-8 md:-left-[4%] ">
          <Image
            src={image_url}
            alt={title}
            width={170}
            height={170}
            className="object-fill size-36  hover:scale-105 transition-transform"
          />
        </div>
        <div className="absolute w-full p-2 h-full flex flex-col top-0 right-0">
          {badge_text && (
            <div
              style={{ backgroundColor: badge_color || "#ededed" }}
              className="text-primary inline-block w-fit p-1 rounded-full text-xs font-bold"
            >
              {badge_text}
            </div>
          )}
          <h3 className="mt-1 flex-1 font-semibold text-sm md:text-lg text-slate-900">
            {title}
          </h3>
          {subtitle && (
            <p className="text-primary text-xs md:text-sm mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
