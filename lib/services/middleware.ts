export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder)
     * - auth (auth pages)
     * - api (API routes - LET THESE PASS so the backend can return 401 JSON)
     */
    "/((?!_next|static|favicon.ico|robots.txt|images|public|auth|api).*)",
  ],
};
