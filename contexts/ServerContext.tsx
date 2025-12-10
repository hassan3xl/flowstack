"use client";

import { useGetServer } from "@/lib/hooks/server.hooks";
import React, { createContext, useContext } from "react";

// 1. Update the interface to include userRole
interface ServerContextValue {
  serverId: string;
  userRole: string | undefined;
  isMember: boolean;
  isAdminOrOwner: boolean;
}

const ServerContext = createContext<ServerContextValue | null>(null);

interface ServerContextProviderProps {
  serverId: string;
  children: React.ReactNode;
}

export const ServerContextProvider = ({
  serverId,
  children,
}: ServerContextProviderProps) => {
  const { data: server, isLoading: loading } = useGetServer(serverId);

  // This variable was already here, now we just use it
  const userRole = server?.user_role;
  const isAdminOrOwner =
    server?.user_role === "admin" || server?.user_role === "owner";
  const isMember = server?.user_role === "member";

  return (
    // 2. Pass userRole into the Provider value
    <ServerContext.Provider
      value={{ serverId, userRole, isMember, isAdminOrOwner }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  const context = useContext(ServerContext);

  if (!context) {
    throw new Error("useServer must be used inside ServerContextProvider");
  }

  return context;
};
