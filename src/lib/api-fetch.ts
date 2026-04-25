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

  // -----------------------------
  // 1) Query String
  // -----------------------------
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

  // -----------------------------
  // 2) Create full URL (SSR / CSR)
  // -----------------------------
  const pathWithBase = isServer
    ? `${BASE_API_URL}${path}${queryString}`
    : `/api${path}${queryString}`;

  // -----------------------------
  // 3) toast filter
  // -----------------------------
  const showErrorToast =
    showErrorToastParam && !isServer && !/\/me$/.test(path);

  let res: Response;

  // -----------------------------
  // 4) Request + network catch
  // -----------------------------
  try {
    let finalBody = undefined;

    if (body) {
      if (hasFile) {
        if (typeof body !== "object")
          throw new Error("body must be an object when hasFile = true");

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

    res = await fetch(pathWithBase, {
      credentials: "include",
      headers: hasFile ? {} : { "Content-Type": "application/json" },
      body: finalBody,
      ...restOptions,
    });
    
  } catch (_error) {
    return false;
  }

  // -----------------------------
  // 5) Safe JSON / text parsing
  // -----------------------------
  let data: any = null;

  const raw = await res.text().catch(() => "");
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw; // non-JSON response
    }
  }

  // -----------------------------
  // 6) HTTP error handling
  // -----------------------------
  if (!res.ok) {    
    const message =
      (data && typeof data === "object" && data.message) ||
      "خطا در برقراری ارتباط با سرور";

    if (showErrorToast) toast.error(message);
    return false;
  }

  // -----------------------------
  // 7) Success
  // -----------------------------
  return extractResponseData(data, showErrorToast);
}

function extractResponseData(res: any, errorLog = true) {
  const isServer = typeof window === "undefined";

  if (errorLog && res?.error && res?.message && !isServer) {
    toast.error(res.message);
  }

  return res?.data ?? null;
}
