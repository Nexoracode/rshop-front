import { ProductSearchResult } from "@/types/product";

import React from "react";
import ProductSkeleton from "./ProductSkeleton";
import EmptyState from "@/components/common/EmptyState";
import ProductResultItem from "./ProductResultItem";

type Props = { isPending: boolean; products: Array<ProductSearchResult> };

const ProductResultList = React.forwardRef<HTMLUListElement, Props>(
  function ResultList({ isPending, products }, ref) {
    return (
      <ul
        ref={ref}
        className="md:max-h-96 scrollbar-custom gap-y-3 md:gap-y-5 flex flex-wrap  overflow-auto py-2"
      >
        {isPending ? (
          <ProductSkeleton count={4} />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          products.map((product) => (
            <ProductResultItem {...product} key={product.id} />
          ))
        )}
      </ul>
    );
  }
);
export default ProductResultList;
