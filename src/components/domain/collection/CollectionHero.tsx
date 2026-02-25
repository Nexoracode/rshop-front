import Image from "next/image";
import CollectionCountdown from "./CollectionCountdown";
import CollectionExpired from "./CollectionExpired";
import { Collection } from "@/types/product";

export default async function CollectionHero({ data }: { data: Collection }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border">
      <Image
        src={data.image}
        alt={data.title}
        width={1200}
        height={200}
        className="h-[200px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <p className="text-sm opacity-90">{data.description}</p>

        <div className="mt-4">
          <CollectionCountdown endDate={data.end_date} />
        </div>

        <CollectionExpired end_date={data.end_date} />
      </div>
    </div>
  );
}
