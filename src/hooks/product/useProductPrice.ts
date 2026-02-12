import { calcPrice } from "@/lib/utils/number";
import { Product } from "@/types/product";

type Props = {
  variants: Product["variants"];
  has_variants: Product["has_variants"];
  price: Product["price"];
  stock: Product["stock"];
  discount_amount: Product["discount_amount"];
  discount_percent: Product["discount_percent"];
};

export default function useProductPrice({
  variants,
  has_variants,
  price,
  stock,
  discount_amount,
  discount_percent,
}: Props) {
  const getPriceParams = (): {
    priceParams: [number, number, number];
    stock: number;
  } | null => {
    if (!has_variants && stock > 0)
      return {
        priceParams: [+price, +discount_amount, discount_percent],
        stock,
      };

    const varaintHasStock = variants.find((varaint) => varaint.stock > 0);

    if (varaintHasStock)
      return {
        priceParams: [
          varaintHasStock.price,
          varaintHasStock.discount_amount,
          varaintHasStock.discount_percent,
        ],
        stock: varaintHasStock.stock,
      };

    return null;
  };

  const inStock = getPriceParams();

  const {
    final = 0,
    percent = 0,
    compareAt = null,
  } = inStock ? calcPrice(...inStock.priceParams) : {};

  return {
    final,
    percent,
    compareAt,
    inStock: !!inStock,
  };
}
