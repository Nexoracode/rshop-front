import { ProductSearchResult } from "@/types/product";
import ProductResultItem from "./ProductResultItem";
import { PopoverClose } from "@/components/ui/popover";

type Props = {
  products?: ProductSearchResult[]; // اختیاری با مقدار پیش‌فرض
};

export default function ProductResultList({ products = [] }: Props) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-4 gap-2 space-y-2">
      {products.slice(0, 5).map((product) => (
        <PopoverClose key={product.id} asChild>
          <ProductResultItem {...product} />
        </PopoverClose>
      ))}
    </div>
  );
}