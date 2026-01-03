"use client";

import { CommunityNavbar } from "@/components/navbar/CommunityNavbar";
import { CommunitySidebar } from "@/components/sidebar/CommunitySidebar";
import { TransitionLoader } from "@/components/TransitionLoader";
import { CommunityContextProvider } from "@/contexts/CommunityContext";
import React, { use, useEffect, useState } from "react";

interface CommunityLayoutProps {
  children: React.ReactNode;
  params: Promise<{ communityId: string }>;
}

export default function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps) {
  const resolvedParams = use(params);
  const { communityId } = resolvedParams;
  const [showTransition, setShowTransition] = useState(false);

  console.log("communityId", communityId);

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
    <CommunityContextProvider communityId={communityId}>
      <TransitionLoader
        isActive={showTransition}
        onComplete={handleTransitionComplete}
      />
      <div className="bg-background text-foreground min-h-screen">
        <CommunityNavbar />

        <div className="flex pt-12">
          <CommunitySidebar />

          <div className="flex-1 lg:ml-[250px]">
            <main className="px-4 py-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </CommunityContextProvider>
  );
}
