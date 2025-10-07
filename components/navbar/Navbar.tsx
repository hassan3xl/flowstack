"use client";

import Link from "next/link";
import UserNav from "./UserNav";
import Image from "next/image";

interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onMenuToggle, isSidebarOpen }: NavbarProps) {
  return (
    <nav className="border-b border-secondary ml-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-slate-600 rounded-md md:hidden"
            aria-label="Toggle menu"
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

          {/* Desktop toggle button */}
          <button
            onClick={onMenuToggle}
            className="hidden p-2 hover:bg-slate-600 rounded-md md:block"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <span className="text-xl font-bold">
            <Link href="/" className="rounded-md p-2">
              <Image
                src="/logo.png"
                width={150}
                height={5}
                alt="FlowStack Logo"
                className=""
              ></Image>
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </nav>
  );
}
