"use client";

import { useGetWorkspace } from "@/lib/hooks/workspace.hook";
import React, { createContext, useContext } from "react";

// 1. Update the interface to include userRole
interface CommunityContextValue {
  communityId: string;
  userRole: string | undefined;
  isMember: boolean;
  isAdminOrOwner: boolean;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

interface CommunityContextProviderProps {
  communityId: string;
  children: React.ReactNode;
}

export const CommunityContextProvider = ({
  communityId,
  children,
}: CommunityContextProviderProps) => {
  const { data: workspace, isLoading: loading } = useGetWorkspace(communityId);

  // This variable was already here, now we just use it
  const userRole = workspace?.user_role;
  const isAdminOrOwner =
    workspace?.user_role === "admin" || workspace?.user_role === "owner";
  const isMember = workspace?.user_role === "member";

  return (
    // 2. Pass userRole into the Provider value
    <CommunityContext.Provider
      value={{ communityId, userRole, isMember, isAdminOrOwner }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside CommunityContextProvider"
    );
  }

  return context;
};
