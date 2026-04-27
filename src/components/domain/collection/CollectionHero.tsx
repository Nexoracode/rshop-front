import Image from "next/image";
import CollectionCountdown from "./CollectionCountdown";
import CollectionExpired from "./CollectionExpired";
import { Collection } from "@/types/product";

export default async function CollectionHero({ data }: { data: Collection }) {
  const { description, end_date, image, title } = data;

  return (
    <div className="flex items-center flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative h-[200px] lg:h-[300px] xl:h-[400px]">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={400}
            className="h-full min-w-full object-cover"
            priority
          />
          {description ? (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          ) : (
            ""
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 text-white lg:p-8">
          {description ? (
            <>
              <h1 className="text-2xl font-bold lg:text-3xl xl:text-4xl">
                {title}
              </h1>
              <p className="text-sm text-white/80 lg:text-base">
                {description}
              </p>
            </>
          ) : (
            ""
          )}

          <div className="flex items-center justify-end">
            <div className="hidden md:flex lg:bg-black/50 lg:border-2 border-dashed border-white lg:p-4 rounded-lg min-h-[60px]">
              <CollectionCountdown endDate={end_date} />
              <CollectionExpired end_date={end_date} />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden border-2 border-dashed px-2 w-full flex items-center justify-center rounded-lg min-h-[60px]">
        <CollectionCountdown endDate={end_date} />
        <CollectionExpired end_date={end_date} />
      </div>
    </div>
  );
}
