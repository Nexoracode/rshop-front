export default function maxQuantitySelector({
  orderLimit,
  productStock,
  variantStock,
}: {
  productStock: number;
  variantStock: number | null | undefined;
  orderLimit: number;
}) {
  // تعیین موجودی نهایی (اولویت با variantStock هست)
  const stock = variantStock ?? productStock;

  // اگر موجودی صفر بود، صفر برگردون
  if (stock === 0) {
    return 0;
  }

  // اگر orderLimit معتبر بود و از موجودی بیشتر نبود، orderLimit رو برگردون
  if (orderLimit && orderLimit > 0 && orderLimit <= stock) {
    return orderLimit;
  }

  // در غیر این صورت، موجودی رو برگردون
  return stock;
}