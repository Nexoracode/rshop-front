import { getQueryClient } from "@/lib/utils/query-client";
import CollectionProductCart from "./CollectionProductCard";
import { getCollectionProducts } from "@/queries/products/collection";

export default async function CollectionGrid({ slug }: { slug: string }) {
  const queryClient = getQueryClient();

  const products = await queryClient.fetchQuery(getCollectionProducts(slug));

  return (
    <>
      <div className="grid gap-2 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {products.products.map((p) => (
          <CollectionProductCart key={p.id} {...p} />
        ))}
      </div>
      {/*       <ExpiredCTA endDate="" />
       */}{" "}
    </>
  );
}
