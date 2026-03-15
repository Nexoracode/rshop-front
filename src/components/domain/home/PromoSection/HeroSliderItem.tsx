import React from "react";
import SliderAspect from "./SliderAspect";
import Image from "@/components/common/Image";
import { HeroSlider, LayoutType } from "@/types/home";
import { cn } from "@/lib/utils/classnames";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  layoutType: LayoutType;
} & HeroSlider;
export default function HeroSliderItem({
  ...props
}: Props) {
  const  {image_url,
  title,
  description,
  button_link,
  button_text,
  layoutType,
  background_color} = props
  
  return (
    <Link href={button_link}>
      <div className="select-none min-w-full rounded-xl md:rounded-none overflow-hidden h-full relative" style={{backgroundColor: background_color ?? ""}}>
        <SliderAspect className="h-full">
          {image_url ? (
            <Image
              src={image_url}
              alt={title}
              fill
              sizes="(min-width:1024px) 66vw, 100vw"
              className="object-cover  object-center"
              priority
            />
          ) : (
            ""
          )}
          <div className="absolute left-0 top-0 w-full h-full z-20 bg-black/30" />
          <div
            className={cn(
              "absolute  top-0 bottom-0 z-30 h-full flex flex-col justify-center gap-4 p-2 ",
              layoutType === "side_by_side"
                ? "right-0 w-full md:p-5"
                : "container-home right-[50%] translate-x-[50%]",
            )}
          >
            <h2
              className={cn(
                "text-2xl sm:text-[42px] text-shadow-blue-400 font-extrabold drop-shadow text-white",
                //   s.is_dark ? "text-white" : "text-black"
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "py-1 text-white mb-4",
                  /*             s.is_dark
                            ? "text-white/60 bg-muted/30"
                            : "text-slate-800/90 bg-white/30" */
                )}
              >
                {description}
              </p>
            )}
            {button_text && (
              <Button
                href={button_link}
                variant={"fill"}
                rounded={"xl"}
                endIcon={<ChevronLeftIcon />}
                className="w-fit"
              >
                {button_text}
              </Button>
            )}
          </div>
        </SliderAspect>
      </div>
    </Link>
  );
}
