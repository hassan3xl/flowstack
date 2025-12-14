"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronLeft,
  Files,
  Home,
  Laptop,
  MessageCircleCode,
  Settings2,
  LayoutDashboard,
  Users,
  Hash,
  Activity,
  ShieldCheck,
  Server,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useSidebar } from "@/contexts/SidebarContext";
import { useServer } from "@/contexts/ServerContext";
import { ThemeSwitcher } from "@/providers/theme-switcher";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { Separator } from "@/components/ui/separator";

interface ServerSidebarProps {
  server: any;
}

export function ServerSidebar({ server }: ServerSidebarProps) {
  const pathname = usePathname();
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();
  const { serverId, isAdminOrOwner } = useServer();

  // Define groups for the "Tree" structure
  const linkGroups = [
    {
      groupLabel: "General",
      items: [
        {
          label: "Home",
          href: `/server/${serverId}`,
          icon: <Home size={20} />,
        },
        {
          label: "Feeds",
          href: `/server/${serverId}/feeds`,
          icon: <Activity size={20} />,
        },
        {
          label: "Chats",
          href: `/server/${serverId}/chats`,
          icon: <MessageCircleCode size={20} />,
        },
      ],
    },
    {
      groupLabel: "Workspace",
      items: [
        {
          label: "Projects",
          href: `/server/${serverId}/projects`,
          icon: <Laptop size={20} />,
        },
        {
          label: "Boards",
          href: `/server/${serverId}/boards`,
          icon: <LayoutDashboard size={20} />,
        },
        {
          label: "Documents",
          href: `/server/${serverId}/docs`,
          icon: <Files size={20} />,
        },
      ],
    },
    {
      groupLabel: "Management",
      items: [
        {
          label: "Team",
          href: `/server/${serverId}/team`,
          icon: <Users size={20} />,
        },
        {
          label: "Settings",
          href: `/server/${serverId}/settings`,
          icon: <Settings2 size={20} />,
          hidden: !isAdminOrOwner,
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed z-[50] left-0 h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border transition-all duration-300 ease-in-out shadow-xl md:shadow-none",
          isOpen
            ? "w-[280px] translate-x-0"
            : "w-[80px] -translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* --- MOBILE ONLY: Server & User Info Header --- */}
          {/* This is the "First item" requested, hidden on MD */}
          <div className="md:hidden p-4 bg-muted/30 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Server size={20} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold truncate text-sm">
                  {server?.name || "Server Name"}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">
                    {server?.user_role || "Member"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- DESKTOP: Toggle & Theme --- */}
          <div className="hidden md:flex h-16 items-center justify-between px-4 border-b border-transparent">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <ChevronLeft size={18} /> : <ArrowRight size={18} />}
            </Button>
            {isOpen && <ThemeSwitcher />}
          </div>

          {/* --- SCROLLABLE CONTENT --- */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-6 px-3">
              {linkGroups.map((group, groupIndex) => {
                // Filter items based on permissions
                const activeItems = group.items.filter((i) => !i.hidden);
                if (activeItems.length === 0) return null;

                return (
                  <div key={groupIndex} className="flex flex-col gap-1">
                    {/* Section Label (Only visible if expanded) */}
                    {isOpen && (
                      <h4 className="px-2 mb-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                        {group.groupLabel}
                      </h4>
                    )}

                    {/* Collapsed Separator (Only visible if collapsed) */}
                    {!isOpen && groupIndex !== 0 && (
                      <Separator className="my-2 bg-border/50 w-8 mx-auto" />
                    )}

                    {/* Links */}
                    {activeItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            // Only close on mobile
                            if (window.innerWidth < 768) closeSidebar();
                          }}
                          className={cn(
                            "group relative flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            // Active State Styling
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            // Collapsed centering
                            !isOpen && "justify-center px-0 py-3"
                          )}
                        >
                          {/* Active Indicator Line (Left) */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-primary rounded-r-full" />
                          )}

                          {/* Icon */}
                          <span
                            className={cn(
                              "transition-transform group-hover:scale-105",
                              isActive && "text-primary"
                            )}
                          >
                            {item.icon}
                          </span>

                          {/* Label (Expanded only) */}
                          <span
                            className={cn(
                              "ml-3 truncate transition-all duration-300 origin-left",
                              isOpen
                                ? "w-auto opacity-100"
                                : "w-0 opacity-0 hidden"
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
