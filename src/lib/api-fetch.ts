/* eslint-disable @typescript-eslint/no-explicit-any */

import { BASE_API_URL } from "@/data/assets";
import { toast } from "sonner";

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  hasFile?: boolean;
  body?: Record<
    string,
    string | number | null | boolean | object | Array<unknown>
  >;
  params?:
    | string
    | string[][]
    | Record<string, unknown>
    | URLSearchParams
    | null;
  showErrorToast?: boolean;
};

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  const {
    body,
    params,
    hasFile,
    showErrorToast: showErrorToastParam = true,
    ...restOptions
  } = options;

  const isServer = typeof window === "undefined";

  // ساخت query string (همان کد قبلی)
  let queryString = "";
  if (params) {
    const searchParams =
      params instanceof URLSearchParams
        ? params
        : new URLSearchParams(
            Array.isArray(params)
              ? params
              : Object.entries(params).reduce(
                  (acc, [k, v]) => ({ ...acc, [k]: v ?? "" }),
                  {},
                ),
          );
    const qs = searchParams.toString();
    if (qs) queryString = "?" + qs;
  }

  // ساخت URL
  const pathWithBase = isServer
    ? `${BASE_API_URL}${path}${queryString}`
    : `/api${path}${queryString}`;

  const showErrorToast =
    showErrorToastParam && !isServer && !/\/me$/.test(path);

  // آماده‌سازی body
  let finalBody: any = undefined;
  if (body) {
    if (hasFile) {
      const formData = new FormData();
      Object.entries(body).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((item) => formData.append(k, item));
        } else {
          formData.append(k, v as any);
        }
      });
      finalBody = formData;
    } else {
      finalBody = JSON.stringify(body);
    }
  }

  const maxAttempts = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(pathWithBase, {
        credentials: "include",
        headers: hasFile ? {} : { "Content-Type": "application/json" },
        body: finalBody,
        ...restOptions,
      });

      clearTimeout(timeoutId);

      const raw = await res.text().catch(() => "");
      let data: any = null;

      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          data = raw;
        }
      }

      if (!res.ok) {
        const message =
          (data && typeof data === "object" && data.message) ||
          "خطا در برقراری ارتباط با سرور";

        if (showErrorToast) toast.error(message);
        return false;
      }

      return extractResponseData(data, showErrorToast);
    } catch (error) {
      lastError = error as any;

      // لاگ خطا در سمت سرور
      if (isServer) {
        console.error(
          `[SSR API Error] ${path} (attempt ${attempt + 1}/${maxAttempts}):`,
          {
            message: (error as any).message,
            code: (error as any).code,
            url: pathWithBase,
          },
        );
      } else {
        console.log(`[Client API Error] ${path}:`, (error as any).message);
      }

      // تشخیص خطاهای قابل تلاش مجدد
      const isRetryable =
        (error as any).code === "UND_ERR_CONNECT_TIMEOUT" ||
        (error as any).code === "ECONNRESET" ||
        (error as any).code === "ETIMEDOUT" ||
        (error as any).name === "AbortError" ||
        (error as any).message?.includes("fetch failed") ||
        (error as any).message?.includes("timeout");

      if (isRetryable && attempt < maxAttempts - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }

      // آخرین تلاش ناموفق - نمایش خطا به کاربر
      if (showErrorToast) {
        toast.error("مشکل در اتصال به سرور، لطفاً دوباره تلاش کنید");
      }

      return false;
    }
  }

  return false;
}

function extractResponseData(res: any, errorLog = true) {
  const isServer = typeof window === "undefined";

  if (errorLog && res?.error && res?.message && !isServer) {
    toast.error(res.message);
  }

  if (res.data !== false) {
    return res?.data ?? null;
  }
}
