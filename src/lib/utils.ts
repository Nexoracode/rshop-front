import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const faDigits = "۰۱۲۳۴۵۶۷۸۹";
function toFaDigits(input: string) {
  return input.replace(/\d/g, (d) => faDigits[+d]).replace(/\./g, "٫");
}
function trimZeros(s: string) {
  return s.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}
function toFixedFloor(v: number, decimals: number) {
  if (decimals <= 0) return Math.floor(v).toString();
  const p = Math.pow(10, decimals);
  // جلوگیری از خطای شناوری
  return (Math.floor((v + Number.EPSILON) * p) / p).toString();
}

/**
 * نمایش فشرده قیمت با گرد کردن رو به پایین (floor)
 * 830_000 -> "۸۳۰ هزار تومان"
 * 1_450_000 -> "۱٫۴ میلیون تومان"
 */
export function formatPriceCompactFa(
  amount: number,
  opts?: {
    currency?: string; // پیش‌فرض: "تومان"
    usePersianDigits?: boolean; // پیش‌فرض: true
    thousandDecimals?: number; // پیش‌فرض: 0
    millionDecimals?: number; // پیش‌فرض: 1
    billionDecimals?: number; // پیش‌فرض: 1
    trimTrailingZeros?: boolean; // پیش‌فرض: true
  }
) {
  const {
    currency = "تومان",
    usePersianDigits = true,
    thousandDecimals = 0,
    millionDecimals = 1,
    billionDecimals = 1,
    trimTrailingZeros: shouldTrim = true,
  } = opts || {};

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
    unit = "م ";
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

export function formatToman(n: number, showSign = true) {
  return `${Math.floor(n).toLocaleString("fa-IR")}${showSign ? " تومان" : ""}`;
}

export const toNum = (v: string | number | null | undefined): number => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  // حذف هرچیز غیر عددی
  const n = Number(String(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function calcPrice(
  price: string | number,
  discountAmount: string | number,
  discountPercent: number
) {
  const base = toNum(price);
  const discount = toNum(discountAmount);
  const amount =
    discount > 0 ? discount : Math.round((base * discountPercent) / 100);
  const percent =
    discountPercent > 0 ? discountPercent : Math.round((amount / base) * 100);

  const final = base - amount;
  const compareAt = amount > 0 ? base : null;

  return { final, compareAt, percent };
}

export function getTimeString(date: string): string {
  return Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  }).format(new Date(Date.parse(date)));
}

export function toPersainDate(date: string): string {
  return Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.parse(date)));
}
export function toPersainDateTime(date: string): string {
  return Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function toFormData(
  data: Record<
    string,
    string | number | null | boolean | object | Array<unknown>
  >,
  formData: FormData = new FormData(),
  parentKey?: string
): FormData {
  if (data === null || data === undefined) return formData;

  Object.entries(data).forEach(([key, value]) => {
    const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value === null || value === undefined) return;

    // File یا Blob
    if (value instanceof File || value instanceof Blob) {
      formData.append(fieldKey, value);
      return;
    }

    // Date
    if (value instanceof Date) {
      formData.append(fieldKey, value.toISOString());
      return;
    }

    // Array (نسخه صحیح)
    if (Array.isArray(value)) {
      value.forEach((item) => {
        // اگر آیتم فایل یا مقدار ساده است
        if (
          item instanceof File ||
          item instanceof Blob ||
          typeof item !== "object"
        ) {
          formData.append(`${fieldKey}`, item);
        } else {
          // آبجکت داخل آرایه
          toFormData(item, formData, `${fieldKey}[]`);
        }
      });
      return;
    }

    // Object
    if (typeof value === "object") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toFormData(value as Record<string, any>, formData, fieldKey);
      return;
    }

    // primitive
    formData.append(fieldKey, String(value));
  });

  return formData;
}
