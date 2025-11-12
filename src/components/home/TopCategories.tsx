import { categories } from "@/__MOCK__/catalog";
import Image from "next/image";
import Link from "next/link";

export default function TopCategoriesSection() {
  return (
    <section className="container py-8">
      <div className="grid grid-cols-1  p-4 rounded-lg border px-4 shadow-sm hover:shadow-md transition sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 bg-white">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={cat.slug}
            className={`flex items-center p-5 md:border-l md:border-b justify-between overflow-hidden ${
              i + 1 > 4 && "md:border-b-0"
            } ${(i + 1) % 4 === 0 ? "md:border-l-0" : ""}`}
          >
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {cat.title}
              </h3>
              <span className="text-sm text-gray-500 hover:underline">
                مشاهده همه
              </span>
            </div>
            <div className="relative">
              <Image
                src={cat.media?.url || "/mock/image_1.jpg"}
                alt={cat.title}
                width={100}
                height={100}
                className="object-contain rounded-full"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
