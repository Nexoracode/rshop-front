const faDigits = "۰۱۲۳۴۵۶۷۸۹";

function toFaDigits(input: string): string {
  return input.replace(/\d/g, (d) => faDigits[+d]).replace(/\./g, "٫");
}

function trimZeros(s: string): string {
  return s.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

function toFixedFloor(v: number, decimals: number): string {
  if (decimals <= 0) return Math.floor(v).toString();
  const p = Math.pow(10, decimals);
  return (Math.floor((v + Number.EPSILON) * p) / p).toString();
}

export function formatPriceCompactFa(
  amount: number,
  opts: {
    currency?: string;
    usePersianDigits?: boolean;
    thousandDecimals?: number;
    millionDecimals?: number;
    billionDecimals?: number;
    trimTrailingZeros?: boolean;
  } = {},
) {
  const {
    currency = "تومان",
    usePersianDigits = true,
    thousandDecimals = 0,
    millionDecimals = 1,
    billionDecimals = 1,
    trimTrailingZeros: shouldTrim = true,
  } = opts;

  if (!Number.isFinite(amount)) return "";

  const sign = amount < 0 ? "-" : "";
  const n = Math.abs(amount);

  let numStr = "";
  let unit = "";

  if (n < 1_000) {
    numStr = Math.floor(n).toString();
  } else if (n < 1_000_000) {
    const v = n / 1_000;
    numStr = toFixedFloor(v, thousandDecimals);
    unit = " هزار";
  } else if (n < 1_000_000_000) {
    const v = n / 1_000_000;
    numStr = toFixedFloor(v, millionDecimals);
    unit = " میلیون";
  } else {
    const v = n / 1_000_000_000;
    numStr = toFixedFloor(v, billionDecimals);
    unit = " میلیارد";
  }

  if (shouldTrim) numStr = trimZeros(numStr);

  let out = `${sign}${numStr}${unit} ${currency}`.trim();
  if (usePersianDigits) out = toFaDigits(out);

  return out;
}

export function formatToman(n: number, showSign = true): string {
  return `${Math.floor(n).toLocaleString("fa-IR")}${showSign ? " تومان" : ""}`;
}
