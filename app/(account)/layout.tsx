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
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="shrink-0 z-20">
        <Navbar
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
      </nav>

      {/* Body (Sidebar + Main content) */}
      <div className="flex mt-14 grow relative">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main
          className={`flex-grow overflow-auto transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <div className="p-2 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
