/* eslint-disable @typescript-eslint/no-explicit-any */

import { BASE_API_URL } from "@/data/assets";
import { isServer } from "@tanstack/react-query";
import { toast } from "sonner";

export async function apiFetch(
  path: string,
  options?: Omit<RequestInit, "body"> & {
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
  }
) {
  const {
    body,
    params,
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
  //  const pathWithBase = `${BASE_API_URL}${path}${queryString}`;
  const showErrorToast =
    showErrorToastParam && !path.endsWith("me") && !isServer;

  let res: Response;
  try {
    res = await fetch(pathWithBase, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,

      ...restOptions,
    });
  } catch (error) {
    if (showErrorToast) toast.error("خطا در برقراری ارتباط با سرور");
    console.log(error);
    throw {
      message: "خطا در برقراری ارتباط با سرور",
      error,
      statusCode: 500,
    };
  }

  let data: any;

  try {
    data = await res.json().catch(() => ({}));
  } catch {
    data = {};
  }

  if (!res.ok) {
    if (showErrorToast)
      toast.error(data.message ?? "خطا در برقراری ارتباط با سرور");
    throw { ...data };
  }

  return response(data, showErrorToast);
}

export function response(res: any, errorLog: boolean = true) {
  if (errorLog && res.error && res.message && !isServer)
    toast.error(res.message);

  return res.data ?? null;
}
