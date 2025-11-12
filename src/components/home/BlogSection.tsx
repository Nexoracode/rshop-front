import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Blog } from "@/types";
import BlogCard from "../common/BlogCard";

const blogItem: Blog = {
  date: "2025-05-05 12:00",
  id: 22,
  image: "/mock/image_19.jpg",
  slug: "/blog/eeeeee",
  tiny_desc: `اپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
          برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
          ابزارهای کاربردی می باشد.`,
  title: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
};

export default function BlogSection() {
  return (
    <section className="py-6">
      <div className="container relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          آخرین مطالب آموزشی
        </h2>
        <div className="w-full">
          <Carousel className="">
            <CarouselNext className="-top-8 right-[0] md:left-[60px] md:right-[unset] w-[100px] hover:bg-[unset]" />
            <CarouselPrevious className="-top-8 w-6 right-[100px] md:right-[unset] md:left-0  hover:bg-[unset]" />
            <CarouselContent>
              {[...Array(10).keys()].map((key) => (
                <CarouselItem
                  key={key}
                  className="basis-1 min-[360px]:basis-1/2 md:basis-1/3 lg:basis-[23%]"
                >
                  <BlogCard {...blogItem} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* کارت محصول نمونه */}
      </div>
    </section>
  );
}
