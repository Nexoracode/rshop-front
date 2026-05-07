import { ProductSearchResult } from "@/types/product";
import ProductResultItem from "./ProductResultItem";

type Props = {
  products?: ProductSearchResult[];
};

export default function ProductResultList({ products = [] }: Props) {
  if (products.length === 0) return null;
  return (
    <div className="grid grid-cols-4 gap-2 space-y-2">
      {products.map((product) => (
        <ProductResultItem key={product.id} {...product} />
      ))}
    </div>
  );
}
