"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronLeft,
  Files,
  Home,
  Laptop,
  MessageCircleCodeIcon,
  Settings2,
  Text,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useSidebar } from "@/contexts/SidebarContext";
import { useServer } from "@/contexts/ServerContext";
import { ThemeSwitcher } from "@/providers/theme-switcher";

export function ServerSidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();

  const { serverId, userRole, isAdminOrOwner } = useServer();

  // Helper boolean to check permissions

  const menuItems = [
    {
      name: "Home",
      label: "Home",
      href: `/server/${serverId}`,
      icon: <Home />,
    },
    {
      name: "feeds",
      label: "Feeds",
      href: `/server/${serverId}/feeds`,
      icon: <MessageCircleCodeIcon />,
    },
    {
      name: "chats",
      label: "Chats",
      href: `/server/${serverId}/chats`,
      icon: <MessageCircleCodeIcon />,
    },
    {
      name: "projects",
      label: "Projects",
      href: `/server/${serverId}/projects`,
      icon: <Laptop />,
    },
    {
      name: "boards",
      label: "Boards",
      href: `/server/${serverId}/boards`,
      icon: <Text />,
    },
    {
      name: "docs",
      label: "Documents",
      href: `/server/${serverId}/docs`,
      icon: <Files />,
    },
    {
      name: "Team",
      label: "Team",
      href: `/server/${serverId}/team`,
      icon: <Users />,
    },
    {
      name: "Settings",
      label: "Settings",
      href: `/server/${serverId}/settings`,
      icon: <Settings2 />,
      // 1. Add a flag here to hide this if the user is not admin/owner
      hidden: !isAdminOrOwner,
    },
  ];

  // 2. Filter the items before mapping
  const visibleItems = menuItems.filter((item) => !item.hidden);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed z-50 top-0 left-0 h-full bg-background border-r border-border transition-all duration-300 ease-in-out",
          isOpen
            ? "w-64 translate-x-0"
            : "w-20 -translate-x-full md:translate-x-0 md:w-26"
        )}
      >
        <div className="flex flex-col h-full mt-16 md:mt-10">
          <div className="md:flex h-16 hidden items-center justify-between px-4">
            <Button
              onClick={toggleSidebar}
              variant={"ghost"}
              className="p-1 rounded-md hover:bg-accent transition"
            >
              {isOpen ? (
                <ChevronLeft onClick={closeSidebar} size={2} className="ml-1" />
              ) : (
                <ArrowRight onClick={toggleSidebar} size={2} className="ml-4" />
              )}
            </Button>
            {isOpen && (
              <div>
                <ThemeSwitcher />
              </div>
            )}
          </div>

          {/* ServerSidebar content */}
          <div className="flex-1 overflow-y-auto px-4">
            <nav className="space-y-2">
              {/* 3. Map over visibleItems instead of menuItems */}
              {visibleItems.map((item) => (
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
      </aside>
    </>
  );
}
