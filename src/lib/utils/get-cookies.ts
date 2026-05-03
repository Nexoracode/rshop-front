"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string) {
  const allCookies = await cookies();

  return allCookies.get(name)?.value;
}
