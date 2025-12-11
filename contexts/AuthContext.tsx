"use client";
import { resetAuthCookies } from "@/lib/actions/auth.actions";
import { UserType } from "@/lib/types/user.types";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session_user="));
      if (cookies) {
        const value = cookies.split("=")[1];
        const parsed = JSON.parse(decodeURIComponent(value));
        setUser(parsed);
      }
    } catch (err) {
      console.error("Failed to parse session_user cookie", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = async () => {
    await resetAuthCookies();
    setUser(null);
    window.location.href = "/"; // redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
