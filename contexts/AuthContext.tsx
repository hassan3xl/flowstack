"use client";

import React, { createContext, useContext } from "react";
import { AuthUserType, ProfilePType } from "@/lib/types/user.types";
import { useGetProfile } from "@/lib/hooks/account.hook";

interface AuthContextType {
  user: AuthUserType | null;
  loading: boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading: loading, refetch } = useGetProfile();
  console.log("user", user);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        loading,
        refreshUser: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
