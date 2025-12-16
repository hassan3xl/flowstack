"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import ServersPage from "../servers/Servers";
import { Plus, Mail } from "lucide-react";
import AddServerModal from "../servers/AddServerModal";
import { useSidebar } from "@/contexts/SidebarContext";
import ServerInviteModal from "../servers/ServerInviteModal";
import { useGetServerInvites } from "@/lib/hooks/server.hooks";
import HomeCard from "../servers/HomeCard";
import MessageCard from "../messages/MessageCard";
import UserCard from "../servers/UserCard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"; // Use Shadcn ScrollArea if available, or div
import { TooltipProvider } from "@/components/ui/tooltip"; // Important for slim view

export function Sidebar() {
  const [openAddServerModal, setOpenAddServerModal] = useState(false);
  const [openServerInviteModal, setOpenServerInviteModal] = useState(false);

  const { isOpen, closeSidebar } = useSidebar();
  const { data: invites } = useGetServerInvites();

  const hasPendingInvites = invites?.some(
    (inv: any) => inv.status === "pending"
  );

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
            <MessageCard />
            <Separator className="h-[2px] w-10 bg-accent rounded-full mx-auto" />
          </div>

          {/* --- MIDDLE SECTION (Scrollable Servers) --- */}
          <div className="flex-1 w-full overflow-hidden hover:overflow-y-auto custom-scrollbar  py-2 space-y-2">
            <ServersPage />
          </div>

          {/* --- BOTTOM SECTION (Actions & User) --- */}
          <div className="flex flex-col items-center gap-3 pb-4 pt-2 px-2 bg-background/50">
            <Separator className="h-[2px] w-10 bg-accent rounded-full mx-auto" />

            {/* Invite Button */}
            <SidebarAction
              icon={<Mail size={20} />}
              label="Invites"
              onClick={() => setOpenServerInviteModal(true)}
              isActive={false}
              alert={hasPendingInvites}
            />

            {/* Add Server Button */}
            <SidebarAction
              icon={<Plus size={24} className="text-green-500" />}
              label="Add Server"
              onClick={() => {
                closeSidebar();
                setOpenAddServerModal(true);
              }}
              isActive={false}
              className="group-hover:bg-green-500 group-hover:text-white text-green-500"
            />

            {/* User Card */}
            <div className="mt-2 w-full">
              <UserCard />
            </div>
          </div>
        </aside>

        {/* Modals */}
        <AddServerModal
          isOpen={openAddServerModal}
          onClose={() => setOpenAddServerModal(false)}
        />
        <ServerInviteModal
          isOpen={openServerInviteModal}
          onClose={() => setOpenServerInviteModal(false)}
          invites={invites}
        />
      </>
    </TooltipProvider>
  );
}

// Internal Helper for Bottom Buttons to keep code clean
function SidebarAction({
  icon,
  label,
  onClick,
  isActive,
  className,
  alert,
}: any) {
  return (
    <div className="relative group flex items-center justify-center w-full">
      <button
        onClick={onClick}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-[24px] group-hover:rounded-[16px] transition-all duration-300 overflow-hidden bg-background hover:bg-accent border border-transparent hover:border-border",
          isActive && "bg-primary text-primary-foreground rounded-[16px]",
          className
        )}
      >
        {icon}
      </button>
      {/* Notification Dot */}
      {alert && (
        <span className="absolute top-0 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      )}
    </div>
  );
}
