"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  user:any,
  accessToken: string,
  refreshToken: string
) {
  const userData = {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    avatar: user.avatar,
  };

  // Store profile (not httpOnly so the client can read it)
  (await cookies()).set("session_user", JSON.stringify(userData), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  // Store tokens securely
  (await cookies()).set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });

  (await cookies()).set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getUserId() {
  const userId = (await cookies()).get("session_user_id")?.value;
  console.log("userid", userId);

  return userId ? userId : null;
}

export async function getAcessToken() {
  let accessToken = (await cookies()).get("session_access_token")?.value;
  return accessToken;
}

export async function resetAuthCookies() {
  (await cookies()).set("session_user_id", "", { maxAge: 0, path: "/" });
  (await cookies()).set("session_access_token", "", { maxAge: 0, path: "/" });
  (await cookies()).set("session_refresh_token", "", { maxAge: 0, path: "/" });
}
