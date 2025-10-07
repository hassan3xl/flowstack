"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route change for mobile
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };
    handleRouteChange();
  }, [pathname, setIsOpen]);

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/projects", label: "Projects", icon: "📁" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-primary border-r border-border transition-all duration-300 ease-in-out",
          isOpen
            ? "w-64 translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent rounded-md transition-colors"
            >
              {isOpen ? "←" : "→"}
            </button>
            {isOpen && (
              <h2 className="text-lg font-semibold">
                <Image
                  src="/favicon.png"
                  height={25}
                  width={25}
                  alt="Menu"
                ></Image>
              </h2>
            )}
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                    !isOpen && "justify-center"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
