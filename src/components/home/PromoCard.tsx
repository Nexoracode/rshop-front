import Image from "next/image";
import Link from "next/link";

export default function PromoCard({
  img,
  tag,
  title,
  desc,
  href,
  background,
}: {
  img: string;
  tag?: string;
  title: string;
  desc?: string;
  href: string;
  background: string;
}) {
  return (
    <Link
      href={href}
      style={{ backgroundColor: background }}
      className="relative block aspect-[6/5] md:aspect-auto overflow-hidden rounded-2xl "
    >
      <div className="relative w-full h-full">
        <div className="absolute -bottom-8 md:top-[50%] rounded-full md:-translate-y-[50%]  overflow-hidden -left-8 md:-left-[4%] ">
          <Image
            src={img}
            alt={title}
            width={170}
            height={170}
            className="object-fill size-36  hover:scale-105 transition-transform"
          />
        </div>
        <div className="absolute w-full p-2 h-full flex flex-col top-0 right-0">
          {tag && (
            <div className="text-destructive text-xs font-bold">{tag}</div>
          )}
          <h3 className="mt-1 flex-1 font-semibold text-sm md:text-lg text-slate-900">
            {title}
          </h3>
          {desc && (
            <p className="text-primary text-xs md:text-sm mt-1">{desc}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
