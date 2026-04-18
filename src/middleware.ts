import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = [
  "/profile",
  "/checkout",
  "/cart",
  "/wishlist",
  "/compare",
];
const AUTH_ROUTES = ["/users/login"]; // مسیرهایی که فقط کاربران لاگین نکرده باید به آن‌ها دسترسی داشته باشند

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const refresh = request.cookies.get("refresh_token");

  // 1. بررسی مسیرهای محافظت‌شده
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtected) {
    // اگر مسیر محافظت‌شده است و توکن وجود ندارد، به صفحه لاگین هدایت کن
    if (!refresh) {
      const loginUrl = new URL("/users/login", request.url);
      // ذخیره مسیر اصلی کاربر برای هدایت پس از لاگین موفق
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    // اگر مسیر محافظت‌شده است و توکن وجود دارد، اجازه عبور بده
    return NextResponse.next();
  }

  // 2. بررسی مسیرهای احراز هویت (مثل /users/login)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if (isAuthRoute) {
    // اگر کاربر لاگین است (توکن دارد) و سعی دارد به صفحه لاگین برود، او را به صفحه اصلی هدایت کن
    if (refresh) {
      const dashboardUrl = new URL("/", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    // اگر کاربر لاگین نیست و به صفحه لاگین می‌رود، اجازه عبور بده
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // مسیرهای محافظت‌شده
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/compare/:path*",
    "/users/login",
  ],
};
