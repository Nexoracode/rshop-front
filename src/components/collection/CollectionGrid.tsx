import CollectionProductCart from "./CollectionProductCard";
import { getQueryClient } from "@/lib/get-query-client";
import { getCollectionProducts } from "@/queries/products";

export default async function CollectionGrid({ slug }: { slug: string }) {
  const queryClient = getQueryClient();

  const products = await queryClient.fetchQuery(getCollectionProducts(slug));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {products.products.map((p) => (
          <CollectionProductCart key={p.id} {...p} />
        ))}
      </div>
      {/*       <ExpiredCTA endDate="" />
       */}{" "}
    </>
  );
}
