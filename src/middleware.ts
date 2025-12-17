import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  "/profile",
  "/checkout",
  "/cart",
  "/wishlist",
  "/compare",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // اگر مسیر حفاظت‌شده نباشد، اجازه بده
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) return NextResponse.next();

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const accessToken = cookieStore.get("access_token")?.value;

  // const refreshToken = request.cookies.get("refresh_token")?.value;
  // const accessToken = request.cookies.get("access_token")?.value;

  const token = refreshToken || accessToken;
  if (!token) {
    const loginUrl = new URL("/users/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
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
