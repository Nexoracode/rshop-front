export default function maxQuantitySelector({
  orderLimit,
  productStock,
  variantStock,
}: {
  productStock: number;
  variantStock: number | null;
  orderLimit: number;
}) {
  const stock = variantStock ?? productStock;

  if (stock === 0) {
    return 0;
  }
  if (orderLimit && orderLimit <= stock) {
    return orderLimit;
  }
  return stock;
}
