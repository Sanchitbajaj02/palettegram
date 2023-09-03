import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoutes =
    pathname === "/login" || pathname === "/register" || pathname === "/verify";
  const isPrivateRoutes =
    pathname === "/feed" || pathname === "/post" || pathname === "/post/:path*";

  // const token = request.cookies.get("token")?.value || "";
  let isTokenAvailable: string = request.cookies.get("userId")?.value || "";
  // console.log("middleware:", request);

  if (isPublicRoutes && isTokenAvailable) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivateRoutes && !isTokenAvailable) {
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
    "/verify",
    "/feed",
    "/post",
    "/post/:path*",
    "/user/:path*",
  ],
};
