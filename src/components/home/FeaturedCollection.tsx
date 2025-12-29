import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";
import Image from "../common/Image";
import { Button } from "../ui/button";
import CountdownTimer from "../Product/CountdownTimer";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export default function FeaturedCollection({
  products,
  display_style,
  show_view_all_button,
  view_all_link,
}: HomeSection) {
  return (
    <section className="py-6">
      <div className="container space-y-1 relative">
        {/* <SectionTitle
          title={title}
          link={show_view_all_button ? view_all_link : undefined}
        /> */}
        <div className="bg-danger flex gap-5 rounded-xl p-5">
          <div className="w-[12rem]">
            <Promotion
              show_view_all_button={show_view_all_button}
              view_all_link={view_all_link}
            />
          </div>
          {display_style === "carousel" ? (
            <Carousel>
              <CarouselNext />
              <CarouselPrevious />
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="basis-[12rem] sm:basis-[14rem]"
                  >
                    <HomeProductCard {...product} />
                  </CarouselItem>
                ))}

                {show_view_all_button && (
                  <CarouselItem className="basis-[12rem] sm:basis-[14rem]">
                    <DisplayAll href={view_all_link} />
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 ">
              {products.map((product) => (
                <HomeProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Promotion({
  view_all_link,
  show_view_all_button,
}: {
  view_all_link: string;
  show_view_all_button: boolean;
}) {
  return (
    <div className="flex flex-col justify-evenly h-full items-center">
      <Image src={"/Amazings.svg"} width={90} height={200} alt="" />

      <div></div>
      <CountdownTimer
        showIcon={false}
        color="white"
        targetDate={new Date(Date.now() + 3600000)}
      />

      <Image src={"/Amazing.svg"} width={90} height={200} alt="" />
      {show_view_all_button && (
        <Button
          endIcon={<ChevronLeft className="size-5" />}
          variant={"text-nohover"}
          size={"sm"}
          className="text-white"
          href={view_all_link}
        >
          مشاهده همه
        </Button>
      )}
    </div>
  );
}

function DisplayAll({ href }: { href: string }) {
  return (
    <div className="flex bg-card rounded-lg justify-center h-full items-center flex-col">
      <Button className="text-primary-400" variant={"text-nohover"} href={href}>
        <span className="flex flex-col gap-5 items-center">
          <span className="border border-primary-400 rounded-full w-11 h-11 flex items-center justify-center">
            <ArrowLeft />
          </span>

          <span className="text-foreground">نمایش همه</span>
        </span>
      </Button>
    </div>
  );
}
