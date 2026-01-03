"use client";

import { useGetCommunity } from "@/lib/hooks/community.hooks";
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
  const { data: community, isLoading: loading } = useGetCommunity(communityId);
  console.log("commuity", community);

  // This variable was already here, now we just use it
  const userRole = community?.user_role;
  const isAdminOrOwner =
    community?.user_role === "admin" || community?.user_role === "owner";
  const isMember = community?.user_role === "member";

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
