import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Blog } from "@/types";
import BlogCard from "../common/BlogCard";
import SectionTitle from "../common/SectionTitle";

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
      <div className="container space-y-2 relative">
        <SectionTitle title="آخرین مطالب آموزشی" link="/blog" />
        <div className="w-full">
          <Carousel className="">
            {/*      <CarouselNext className="left-12 -top-8 right-[unset]" />
            <CarouselPrevious className="left-0 -top-8" /> */}
            <CarouselContent>
              {[...Array(10).keys()].map((key) => (
                <CarouselItem
                  key={key}
                  //      className="basis-[90%] min-[360px]:basis-[75%] min-[600px]:basis-[35%] lg:basis-[38%] xl:basis-[22%]"
                  className="basis-[90%] min-[340px]:basis-[20rem]"
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
