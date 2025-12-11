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

  const { isOpen, closeSidebar } = useSidebar();
  const { data: invites } = useGetServerInvites();

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
          "fixed z-50 otop-0 left-0 h-full bg-sidebar border-r border-border transition-all duration-300 ease-in-out",
          isOpen
            ? "w-full sm:w-27 translate-x-0"
            : "w-27 -translate-x-full md:translate-x-0 md:w-26"
        )}
      >
        <div className="flex flex-col h-full ">
          {/* Scrollable content */}
          <div className="flex-1 p-3">
            <ServersPage
              setOpenAddServerModal={setOpenAddServerModal}
              setOpenServerInviteModal={setOpenServerInviteModal}
              invites={invites}
              isOpen={isOpen}
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
