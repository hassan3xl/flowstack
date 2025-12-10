import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("accessToken");

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|images|public|signin|signup).*)",
  ],
};
