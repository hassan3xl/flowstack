"use client";

import Link from "next/link";
import Image from "next/image";
import { BellIcon, Menu, MenuIcon } from "lucide-react";
import { AccountDropdown } from "./AccountDropdown";
import { useSidebar } from "@/contexts/SidebarContext";

export function Navbar() {
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 border-b right-0 z-50">
      {/* Container to handle padding and max width */}
      <div className="w-full">
        <div className="flex items-center justify-between h-12 bg-background px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Mobile menu button (on the left) */}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-muted rounded-md md:hidden text-white"
              aria-label="Toggle mobile menu"
            >
              <MenuIcon />
            </button>
            <Link href="/" className="rounded-md ml-22 p-2">
              <Image
                src="/logo.png"
                width={150}
                height={5}
                alt="FlowStack Logo"
                className="w-32 sm:w-[150px] h-auto"
              />
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <Link href="/notifications">
              <BellIcon size={16} />
            </Link>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
