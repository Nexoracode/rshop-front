"use client";
import HeroSlider from "./HeroSlider";
import PromoCard from "./PromoCard";

const promos = [
  {
    tag: "پرفروش‌ترین",
    title: "مصحف همراه (طلاکوب)",
    desc: "لورمز صنعت چاپ ه از طراحان گرافیک است.",
    img: "/mock/image_10.jpg",
    href: "#",
    background: "#baddf1",
  },
  {
    tag: "جدید",
    title: "مصحف همراه (طلاکوب)",
    desc: "از ۵۹۹$ یا ۴۹.۹۱$/ماه",
    img: "/mock/image_45.jpg",
    href: "#",
    background: "#eee2d4",
  },
  {
    tag: "۱۵٪ تخفیف",
    title: "مصحف همراه (طلاکوب)",
    desc: "جدیدترین بندها و رنگ‌ها",
    img: "/mock/image_32.jpg",
    href: "#",
    background: "#c9e5e0",
  },
  {
    tag: "حکاکی رایگان",
    title: "تسبیح تایگر (چشم ببر)",
    desc: "لورمز صنعت چاپ ه از طراحان گرافیک است.",
    img: "/mock/image_16.jpg",
    href: "#",
    background: "#ebdbdc",
  },
];

export default function BannerSection() {
  return (
    <section className="py-14 bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* اسلایدشو بزرگ - دو ستون */}
        <div className="">
          <HeroSlider
            slides={[
              {
                img: "/mock/image_25.jpg",
                overline: "سوپرشارژ برای حرفه‌ای‌ها",
                title: "تسبیح تایگر (چشم ببر)",
                text: "لورمز صنعت چاپ ه از طراحان گرافیک است.",
                cta: { label: "خرید", href: "#" },
              },
              {
                img: "/mock/image_29.jpg",
                overline: "تسبیح تایگر (چشم ببر)",
                title: "تخفیف ویژه تابستانه",
                text: "لورمز صنعت چاپ ه از طراحان گرافیک است.",
                cta: { label: "خرید", href: "#" },
              },
            ]}
            autoplayMs={6000}
          />
        </div>

        {/* چهار بنر کوچک - یک ستون در موبایل، دو*دو در دسکتاپ */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {promos.map((p) => (
            <PromoCard key={p.tag} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
