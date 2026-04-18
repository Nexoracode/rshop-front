import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  "/profile",
  "/checkout",
  "/cart",
  "/wishlist",
  "/compare",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // اگر مسیر حفاظت‌شده نباشد، اجازه بده
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  // کوکی توکن
  /*   const token =
    request.cookies.get("refresh_token")?.value ||
    request.headers.get("access_token")?.split(" ")[1]; */
  const refresh = request.cookies.get("refresh_token");

  // اگر توکن نبود → redirect به login
  if (!refresh) {
    const loginUrl = new URL("/users/login", request.url);
   // loginUrl.searchParams.set("", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// لازم است matcher همه‌ی path ها را پوشش دهد
export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/compare/:path*",
  ],
};
