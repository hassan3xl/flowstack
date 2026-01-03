"use server";

import { cookies } from "next/headers";

interface User {
  id: string;
  name: string;
  email: string;
}

// 1. Update arguments to accept refreshToken
export async function handleLogin(
  user: User,
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();

  // Save user data (visible to client)
  cookieStore.set("session_user", JSON.stringify(user), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  // Save access token (httpOnly)
  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days (Matches your refresh token lifetime)
    path: "/",
    sameSite: "lax",
  });

  // 2. Save refresh token (httpOnly) - THIS WAS MISSING
  cookieStore.set("session_refresh_token", refreshToken, {
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

export async function getRefreshToken(): Promise<string | null> {
  return (await cookies()).get("session_refresh_token")?.value || null;
}

export async function getSessionUser(): Promise<User | null> {
  const user = (await cookies()).get("session_user")?.value;
  return user ? JSON.parse(user) : null;
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("session_user", "", { maxAge: 0, path: "/" });
  cookieStore.set("session_access_token", "", { maxAge: 0, path: "/" });
  cookieStore.set("session_refresh_token", "", { maxAge: 0, path: "/" }); // Clear this too!
}

export async function refreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshTokenValue = cookieStore.get("session_refresh_token")?.value;

  if (!refreshTokenValue) {
    // No token to refresh with, clear everything
    await resetAuthCookies();
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshTokenValue }),
      }
    );

    if (!response.ok) {
      await resetAuthCookies();
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.access;

    // 1. Save to cookies (for future requests)
    cookieStore.set("session_access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    // 2. IMPORTANT: Return the string immediately for the current request
    return newAccessToken;
  } catch (error) {
    await resetAuthCookies();
    return null;
  }
}
