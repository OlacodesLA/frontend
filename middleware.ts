import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const isSessionActive = request.cookies.has(ACCESS_TOKEN);

  const url = new URL(request.url);

  const loginRoutes = [
    "/",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/verify-otp",
  ];

  const isLoginRoute = loginRoutes.includes(url.pathname);

  if (!isSessionActive && !isLoginRoute) {
    const returnUrl = request.nextUrl.pathname;
    const urlString = `/auth/sign-in?${
      returnUrl ? `returnUrl=${encodeURIComponent(returnUrl)}` : ""
    }`;
    return NextResponse.redirect(new URL(urlString, request.url));
  }

  if (isSessionActive && isLoginRoute) {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!isSessionActive && url.pathname.startsWith("/app")) {
    const returnUrl = request.nextUrl.pathname;
    const urlString = `/auth/sign-in?${
      returnUrl ? `returnUrl=${encodeURIComponent(returnUrl)}` : ""
    }`;
    return NextResponse.redirect(new URL(urlString, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/app",
    "/app/:path*",
    // "/onboarding/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
  ],
};
