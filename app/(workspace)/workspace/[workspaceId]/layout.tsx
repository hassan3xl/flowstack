"use client";

import { WorkspaceNavbar } from "@/components/navbar/WorkspaceNavbar";
import { WorkspaceSidebar } from "@/components/sidebar/WorkspaceSidebar";
import { TransitionLoader } from "@/components/TransitionLoader";
import { WorkspaceContextProvider } from "@/contexts/WorkspaceContext";
import { useGetWorkspace } from "@/lib/hooks/workspace.hook";
import React, { use, useEffect, useState } from "react";

interface ServerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}

export default function WorkspaceLayout({
  children,
  params,
}: ServerLayoutProps) {
  const resolvedParams = use(params);
  const { workspaceId } = resolvedParams;
  const [showTransition, setShowTransition] = useState(false);
  const { data: workspace, isLoading: loading } = useGetWorkspace(workspaceId);

  console.log("workspaceId", workspaceId);

  useEffect(() => {
    const shouldTransition = sessionStorage.getItem("showTransition");
    if (shouldTransition === "true") {
      setShowTransition(true);
      sessionStorage.removeItem("showTransition");
    }
  }, []);

  const handleTransitionComplete = () => {
    setShowTransition(false);
  };

  return (
    <WorkspaceContextProvider workspaceId={workspaceId}>
      <TransitionLoader
        isActive={showTransition}
        onComplete={handleTransitionComplete}
      />
      <div className="bg-background text-foreground min-h-screen">
        <WorkspaceNavbar workspace={workspace} />

        <div className="flex pt-12">
          <div className="left-0 top-12 h-[calc(100vh-4rem)]">
            <WorkspaceSidebar workspace={workspace} />
          </div>

          {/* Main content area */}
          <div className="flex-1 sm:ml-2 md:ml-24 transition-all">
            <main className="px-4 py-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
              <div className="max-w-7xl py-2 mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </WorkspaceContextProvider>
  );
}
