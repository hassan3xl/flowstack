import { Navbar } from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/SideBar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <div className="flex pt-12">
        <div className="left-0 top-12 h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1  sm:ml-2 md:ml-24 transition-all">
          <main className="px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-7xl py-4 mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
