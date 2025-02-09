import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken, verifyAccessToken } from "./lib/sessions/session";

const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  let accessToken = req.cookies.has("accessToken") ? req.cookies.get("accessToken")?.value : null;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  let session = accessToken ? await verifyAccessToken(accessToken) : null;

  if (!session?.userId && refreshToken) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    session = await verifyAccessToken(accessToken);
  }

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  const response = NextResponse.next();
  if (session?.userId) {
    response.cookies.set("userId", session?.userId as string);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
