import { Navbar } from "@/components/navbar/Navbar";
import { ServerNavbar } from "@/components/navbar/ServerNavbar";
import { ServerSidebar } from "@/components/sidebar/ServerSidebar";
import { ServerContextProvider } from "@/contexts/ServerContext";
import React, { use } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}

export default function MainLayout({ children, params }: MainLayoutProps) {
  const resolvedParams = use(params);
  const { serverId } = resolvedParams;

  return (
    <ServerContextProvider serverId={serverId}>
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
