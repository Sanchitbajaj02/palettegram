import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoutes =
    pathname === "/login" || pathname === "/register" || pathname === "/verify/:path*";
  const isPrivateRoutes =
    pathname === "/feed" || pathname === "/post" || pathname === "/post/:path*" || pathname === "/user/:path*";

  let isTokenAvailable: string = request.cookies.get("accountId")?.value || "";
  let isUserVerified: string = request.cookies.get("isVerified")?.value || "";
  console.log(isTokenAvailable)
  console.log(isUserVerified)

  if (isPublicRoutes && isTokenAvailable) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivateRoutes && isUserVerified === 'false') {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/verify/:path*",
    "/feed",
    "/post",
    "/post/:path*",
    "/user/:path*",
  ],
};
