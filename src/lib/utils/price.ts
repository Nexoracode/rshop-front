export const toNum = (v: string | number | null | undefined): number => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  const cleaned = String(v).replace(/[^\d.-]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
};

export function calcPrice(
  price: string | number,
  discountAmount: string | number,
  discountPercent: number,
) {
  const base = toNum(price);
  const discount = toNum(discountAmount);

  const amount =
    discount > 0 ? discount : Math.round((base * discountPercent) / 100);

  const percent =
    discountPercent > 0
      ? discountPercent
      : base > 0
        ? Math.round((amount / base) * 100)
        : 0;

  const final = base - amount;
  const compareAt = amount > 0 ? base : null;

  return { final, compareAt, percent };
}
