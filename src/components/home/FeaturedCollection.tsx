import React from "react";
import { HomeSection } from "@/types/home";
import HomeProductCard from "./HomeProductCard";
import Image from "../common/Image";
import { Button } from "../ui/button";
import CountdownTimer from "../Product/CountdownTimer";
import { ChevronLeft } from "lucide-react";
import ProductCarousel from "../common/ProductCarousel";

export default function FeaturedCollection({
  products,
  display_style,
  show_view_all_button,
  view_all_link,
}: HomeSection) {
  return (
    <section>
      <div className="container-home relative">
        <div className="bg-danger flex-col md:flex-row w-full overflow-hidden flex gap-5 rounded-xl p-2 md:p-5">
          <div className="md:w-[10rem]">
            <Promotion
              show_view_all_button={show_view_all_button}
              view_all_link={view_all_link}
            />
          </div>
          {display_style === "carousel" ? (
            <ProductCarousel renderItem={HomeProductCard} items={products} />
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
    <div className="flex  md:flex-col justify-between h-full items-center">
      <div className="flex md:flex-col-reverse items-center flex-1 justify-evenly  w-full">
        <Image
          src={"/Amazing.svg"}
          width={90}
          height={200}
          alt=""
          className="w-8 h-8 md:w-20 md:h-20 object-cover md:object-fill"
        />

        <Image
          className="block md:hidden"
          src={"/Amazing-M.svg"}
          width={90}
          height={200}
          alt=""
        />

        <CountdownTimer
          showIcon={false}
          color="white"
          targetDate={new Date(Date.now() + 3600000)}
        />
        <Image
          src={"/Amazings.svg"}
          className="hidden md:block"
          width={90}
          height={200}
          alt=""
        />
      </div>

      {show_view_all_button && (
        <Button
          endIcon={<ChevronLeft className="size-5" />}
          variant={"text-nohover"}
          size={"sm"}
          className="text-white"
          href={view_all_link}
        >
          <span className="hidden md:inline-block ml-0.5">مشاهده</span> همه
        </Button>
      )}
    </div>
  );
}
