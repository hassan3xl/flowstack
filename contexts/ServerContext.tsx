"use client";

import React, { createContext, useContext } from "react";

interface ServerContextValue {
  serverId: string;
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
  return (
    <ServerContext.Provider value={{ serverId }}>
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
