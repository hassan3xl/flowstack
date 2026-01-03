"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import HomeCard from "./cards/HomeCard";
import MessageCard from "../messages/MessageCard";
import UserCard from "./cards/UserCard";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import CommunitiesCard from "./cards/CommunitiesCard";
import WorkspaceCard from "./cards/WorkspaceCard";
import SidebarWorkspaceCard from "./cards/SidebarWorkspaceCard";

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <TooltipProvider delayDuration={0}>
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar Panel */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 mt-13 z-50 h-[94vh] flex flex-col bg-background/95 backdrop-blur border-r border-border transition-all duration-300 ease-in-out shadow-2xl md:shadow-none",
            // Width Logic: Mobile (Full) vs Desktop (Slim)
            isOpen ? "w-[280px] translate-x-0" : "w-[280px] -translate-x-full",
            "md:translate-x-0 md:w-[72px]"
          )}
        >
          {/* --- TOP SECTION (Navigation) --- */}
          <div className="flex flex-col mt-4 items-center gap-3 py-2 px-2">
            <HomeCard />
            <WorkspaceCard />
            {/* <MessageCard /> */}
            <CommunitiesCard />

            <Separator className="h-[2px] w-10 bg-accent rounded-full mx-auto" />
          </div>

          {/* --- MIDDLE SECTION (Scrollable Servers) --- */}
          <div className="flex-1 w-full overflow-hidden hover:overflow-y-auto custom-scrollbar  py-2 space-y-2">
            <SidebarWorkspaceCard />
          </div>

          {/* --- BOTTOM SECTION (Actions & User) --- */}
          <div className="flex flex-col items-center gap-3 pb-4 pt-2 px-2 bg-background/50">
            <Separator className="h-[2px] w-10 bg-accent rounded-full mx-auto" />

            {/* User Card */}
            <div className="mt-2 w-full">
              <UserCard />
            </div>
          </div>
        </aside>
      </>
    </TooltipProvider>
  );
}
