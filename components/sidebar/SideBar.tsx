"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ServersPage from "../servers/Servers";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import AddServerModal from "../servers/AddServerModal";
import { useSidebar } from "@/contexts/SidebarContext";
import ServerInviteModal from "../servers/ServerInviteModal";
import { useGetServerInvites } from "@/lib/hooks/server.hooks";

export function Sidebar() {
  const pathname = usePathname();
  const [openAddServerModal, setOpenAddServerModal] = useState(false);
  const [openServerInviteModal, setOpenServerInviteModal] = useState(false);

  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { data: invites } = useGetServerInvites();
  console.log("invites", invites);

  // Auto-close sidebar on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  }, [pathname, closeSidebar]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed z-50 otop-0 left-0 h-full bg-background border-r border-border transition-all duration-300 ease-in-out",
          isOpen
            ? "w-64 translate-x-0"
            : "w-20 -translate-x-full md:translate-x-0 md:w-26"
        )}
      >
        <div className="flex flex-col h-full ">
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-3">
            <ServersPage
              setOpenAddServerModal={setOpenAddServerModal}
              setOpenServerInviteModal={setOpenServerInviteModal}
              invites={invites}
            />
          </div>
        </div>
      </aside>
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
  );
}
