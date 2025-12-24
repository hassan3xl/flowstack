"use client";

import { useGetWorkspace } from "@/lib/hooks/workspace.hook";
import React, { createContext, useContext } from "react";

// 1. Update the interface to include userRole
interface WorkspaceContextValue {
  workspaceId: string;
  userRole: "admin" | "owner" | "member" | "guest";
  isMember: boolean;
  isAdminOrOwner: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

interface WorkspaceContextProviderProps {
  workspaceId: string;
  children: React.ReactNode;
}

export const WorkspaceContextProvider = ({
  workspaceId,
  children,
}: WorkspaceContextProviderProps) => {
  const { data: workspace, isLoading: loading } = useGetWorkspace(workspaceId);

  // This variable was already here, now we just use it
  const userRole = workspace?.user_role;
  const isAdminOrOwner =
    workspace?.user_role === "admin" || workspace?.user_role === "owner";
  const isMember = workspace?.user_role === "member";

  return (
    // 2. Pass userRole into the Provider value
    <WorkspaceContext.Provider
      value={{ workspaceId, userRole, isMember, isAdminOrOwner }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside WorkspaceContextProvider"
    );
  }

  return context;
};
