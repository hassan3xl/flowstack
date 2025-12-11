import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set("session_user", "", {
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("session_access_token", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
