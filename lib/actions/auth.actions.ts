"use server";

import { cookies } from "next/headers";

interface User {
  id: string;
  name: string;
  email: string;
}

export async function handleLogin(user: User, accessToken: string) {
  // Save user data (non-httpOnly so client can access it)
  (await cookies()).set("session_user", JSON.stringify(user), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  // Save access token securely (httpOnly)
  (await cookies()).set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });
}

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get("session_access_token")?.value || null;
}

export async function getSessionUser(): Promise<User | null> {
  const user = (await cookies()).get("session_user")?.value;
  return user ? JSON.parse(user) : null;
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("session_user", "", { maxAge: 0, path: "/" });
  cookieStore.set("session_access_token", "", { maxAge: 0, path: "/" });
}
