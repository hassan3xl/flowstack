"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronLeft,
  Home,
  Settings2,
  Users,
  Hash,
  Activity,
  ShieldCheck,
  MessageSquare,
  Globe,
  Radio,
  Bell,
  Heart,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Button } from "../ui/button";
import { useSidebar } from "@/contexts/SidebarContext";
import { ThemeSwitcher } from "@/providers/theme-switcher";
import { Separator } from "@/components/ui/separator";

export function CommunitySidebar() {
  const pathname = usePathname();
  const params = useParams();
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();

  // Use communityId from params if available, otherwise fallback to community object
  const community = {
    id: params.id,
    name: "Midjourney",
    isOwner: true,
  };
  const communityId = params.id;
  const isOwner = community.isOwner;

  const linkGroups = [
    {
      groupLabel: "Overview",
      items: [
        {
          label: "Home Feed",
          href: `/communities/${communityId}`,
          icon: <Home size={20} />,
        },
        {
          label: "Explore",
          href: `/communities/explore`,
          icon: <Globe size={20} />,
        },
        {
          label: "Notifications",
          href: `/communities/${communityId}/notifications`,
          icon: <Bell size={20} />,
        },
      ],
    },
    {
      groupLabel: "Channels",
      items: [
        {
          label: "General Chat",
          href: `/communities/${communityId}/chat`,
          icon: <MessageSquare size={20} />,
        },
        {
          label: "Announcements",
          href: `/communities/${communityId}/announcements`,
          icon: <Hash size={20} />,
        },
        {
          label: "Live Lounge",
          href: `/communities/${communityId}/live`,
          icon: <Radio size={20} />,
        },
      ],
    },
    {
      groupLabel: "Community",
      items: [
        {
          label: "Members",
          href: `/communities/${communityId}/members`,
          icon: <Users size={20} />,
        },
        {
          label: "Invite People",
          href: `/communities/${communityId}/invite`,
          icon: <UserPlus size={20} />,
        },
        {
          label: "Settings",
          href: `/communities/${communityId}/settings`,
          icon: <Settings2 size={20} />,
          hidden: !isOwner,
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

      <aside
        className={cn(
          "fixed z-[50] left-0 h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border transition-all duration-300 ease-in-out shadow-xl md:shadow-none",
          isOpen
            ? "w-[280px] translate-x-0"
            : "w-[80px] -translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* --- MOBILE ONLY: Community Info Header --- */}
          <div className="md:hidden p-4 bg-muted/30 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                {community?.name?.[0] || "C"}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-bold truncate text-sm">
                  {community?.name || "Community"}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <ShieldCheck size={12} className="text-blue-500" />
                  <span className="text-xs text-muted-foreground capitalize">
                    {isOwner ? "Founder" : "Member"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- DESKTOP: Navigation Toggle --- */}
          <div className="hidden md:flex h-16 items-center justify-between px-4">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <ChevronLeft size={18} /> : <ArrowRight size={18} />}
            </Button>
          </div>

          {/* --- LINKS --- */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-6 px-3">
              {linkGroups.map((group, groupIndex) => {
                const activeItems = group.items.filter((i) => !i.hidden);
                if (activeItems.length === 0) return null;

                return (
                  <div key={groupIndex} className="flex flex-col gap-1">
                    {isOpen && (
                      <h4 className="px-2 mb-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em]">
                        {group.groupLabel}
                      </h4>
                    )}

                    {!isOpen && groupIndex !== 0 && (
                      <Separator className="my-2 bg-border/50 w-8 mx-auto" />
                    )}

                    {activeItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => closeSidebar()}
                          className={cn(
                            "group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            !isOpen && "justify-center px-0 py-3"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r-full" />
                          )}

                          <span
                            className={cn(
                              "transition-transform group-hover:scale-110",
                              isActive && "text-blue-600"
                            )}
                          >
                            {item.icon}
                          </span>

                          <span
                            className={cn(
                              "ml-3 truncate transition-all duration-300",
                              isOpen ? "opacity-100" : "opacity-0 hidden"
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

          {/* Sidebar Footer (Optional) */}
          {isOpen && (
            <div className="p-4 border-t border-border mt-auto">
              <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                  <Heart size={14} />
                </div>
                <div className="text-[10px] leading-tight text-muted-foreground">
                  Enjoying the community? <br />
                  <span className="text-foreground font-bold hover:underline cursor-pointer">
                    Support us
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
