"use client";

import Link from "next/link";
import UserNav from "./UserNav";
import Image from "next/image";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onMenuToggle, isSidebarOpen }: NavbarProps) {
  return (
    // PRIMARY CHANGE: fixed, full-width, top, and high z-index
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-secondary bg-primary/90 backdrop-blur-sm">
      {/* Container to handle padding and max width */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button (on the left) */}
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-secondary/50 rounded-md md:hidden text-white"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop sidebar toggle button (visible on md screens and up) */}
          <button
            onClick={onMenuToggle}
            className="hidden p-2 hover:bg-secondary/50 rounded-md md:block text-white"
            aria-label="Toggle sidebar"
          >
            <Menu />
          </button>

          {/* Logo/App Name */}
          <Link href="/" className="rounded-md p-2">
            <Image
              src="/logo.png"
              width={150}
              height={5}
              alt="FlowStack Logo"
              // Adjusted class for better fitting on small screens if logo is too wide
              className="w-32 sm:w-[150px] h-auto"
            />
          </Link>
        </div>

        <div className="flex items-center">
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
