import { getQueryClient } from "@/lib/utils/query-client";
import CollectionProductCart from "./CollectionProductCard";
import { getCollectionProducts } from "@/queries/products/collection";

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
