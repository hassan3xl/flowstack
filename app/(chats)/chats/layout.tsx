"use client";
import { Navbar } from "@/components/navbar/Navbar";
import { Sidebar } from "@/components/sidebar/SideBar";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navbar - fixed at top */}
      <Navbar />

      {/* Container for sidebar and main content */}
      <div className="flex pt-16">
        {/* Sidebar - starts below navbar */}
        <div className="fixed left-0 top-12 h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 md:ml-20 transition-all">
          <main className="px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
            <div className=" mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
