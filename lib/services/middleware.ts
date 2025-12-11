import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("session_access_token");

  // If no token -> redirect
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|robots.txt|images|public|auth|api/auth).*)",
  ],
};
