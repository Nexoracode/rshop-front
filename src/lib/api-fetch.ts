/* eslint-disable @typescript-eslint/no-explicit-any */

import { BASE_API_URL } from "@/data/assets";
import { isServer } from "@tanstack/react-query";
import { toast } from "sonner";
import { toFormData } from "./utils";

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

export async function apiFetch(path: string, options?: ApiFetchOptions) {
  const {
    body,
    params,
    hasFile,
    showErrorToast: showErrorToastParam = true,
    ...restOptions
  } = options || {};

  const isServer = typeof window === "undefined";

  const queryString = params
    ? "?" +
      new URLSearchParams(
        params instanceof URLSearchParams
          ? params
          : Array.isArray(params)
          ? params
          : Object.fromEntries(
              Object.entries(params).map(([key, value]) => [
                key,
                value == null ? "" : String(value),
              ])
            )
      ).toString()
    : "";

  const pathWithBase = isServer
    ? `${BASE_API_URL}${path}${queryString}`
    : `/api${path}${queryString}`;

  const showErrorToast =
    showErrorToastParam && !path.endsWith("me") && !isServer;

  let res: Response;

  // 🌐 Network errors
  try {
    res = await fetch(pathWithBase, {
      headers: hasFile ? {} : { "Content-Type": "application/json" },
      credentials: "include",
      body: body
        ? hasFile
          ? toFormData(body)
          : JSON.stringify(body)
        : undefined,
      ...restOptions,
    });
  } catch (error) {
    if (showErrorToast) toast.error("خطا در برقراری ارتباط با سرور");

    throw {
      message: "خطا در برقراری ارتباط با سرور",
      statusCode: 500,
      originalError: error,
    };
  }

  // 📦 Parse response
  let data: any = {};
  try {
    data = await res.json();
  } catch {}

  // 🚨 HTTP errors (401, 403, 500, ...)
  if (!res.ok) {
    const message = data?.message ?? "خطا در برقراری ارتباط با سرور";

    if (showErrorToast) toast.error(message);

    throw {
      message,
      statusCode: res.status,
      data,
    };
  }

  // ✅ Success
  return extractResponseData(data, showErrorToast);
}

function extractResponseData(res: any, errorLog = true) {
  const isServer = typeof window === "undefined";

  if (errorLog && res?.error && res?.message && !isServer) {
    toast.error(res.message);
  }

  return res?.data ?? null;
}
