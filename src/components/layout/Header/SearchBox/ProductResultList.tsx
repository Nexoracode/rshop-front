import { ProductSearchResult } from "@/types/product";
import ProductResultItem from "./ProductResultItem";
import { PopoverClose } from "@/components/ui/popover";

type Props = {
  products?: ProductSearchResult[];
  view?: "mobile" | "desktop"; // اختیاری با مقدار پیش‌فرض
};

export default function ProductResultList({
  products = [],
  view = "mobile",
}: Props) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-4 gap-2 space-y-2">
      {products.map((product) =>
        view === "mobile" ? (
          <ProductResultItem key={product.id} {...product} />
        ) : (
          <PopoverClose asChild key={product.id}>
            <ProductResultItem {...product} />
          </PopoverClose>
        ),
      )}
    </div>
  );
}
