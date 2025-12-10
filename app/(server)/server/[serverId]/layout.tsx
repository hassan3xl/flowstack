"use client";

import { Navbar } from "@/components/navbar/Navbar";
import { ServerNavbar } from "@/components/navbar/ServerNavbar";
import { ServerSidebar } from "@/components/sidebar/ServerSidebar";
import { TransitionLoader } from "@/components/TransitionLoader";
import { ServerContextProvider } from "@/contexts/ServerContext";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

interface ServerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}

export default function ServerLayout({ children, params }: ServerLayoutProps) {
  const resolvedParams = use(params);
  const { serverId } = resolvedParams;
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    // Check if we should show transition
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
    <ServerContextProvider serverId={serverId}>
      <TransitionLoader
        isActive={showTransition}
        onComplete={handleTransitionComplete}
      />
      <div className="bg-background text-foreground min-h-screen">
        <ServerNavbar />

        <div className="flex pt-16">
          <div className="fixed left-0 top-12 h-[calc(100vh-4rem)]">
            <ServerSidebar />
          </div>

          {/* Main content area */}
          <div className="flex-1 sm:ml-2 md:ml-24 transition-all">
            <main className="px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
              <div className="max-w-7xl py-2 mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </ServerContextProvider>
  );
}
