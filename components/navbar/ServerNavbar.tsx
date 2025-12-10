"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, BellIcon, Menu, MenuIcon } from "lucide-react";
import { AccountDropdown } from "./AccountDropdown";
import { useSidebar } from "@/contexts/SidebarContext";
import { useServer } from "@/contexts/ServerContext";
import { useGetServer } from "@/lib/hooks/server.hooks";
import { Button } from "../ui/button";

export function ServerNavbar() {
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();
  const { serverId } = useServer();
  const { data: server, isLoading: loading } = useGetServer(serverId);

  return (
    <nav className="fixed top-0 left-0 border-b right-0 z-50">
      {/* Container to handle padding and max width */}
      <div className="w-full">
        <div className="flex justify-between h-12 bg-background px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex gap-4">
            {/* Mobile menu button (on the left) */}
            <Button
              onClick={toggleSidebar}
              className="hover:bg-muted rounded-md md:hidden text-white"
              aria-label="Toggle mobile menu"
              variant={"ghost"}
            >
              <MenuIcon />
            </Button>
            <Link href="/home" className="rounded-md md:ml-22 p-2">
              <Image
                src="/favicon.png"
                width={25}
                height={25}
                alt="FlowStack Logo"
              />
            </Link>
          </div>
          <div className="p-2">{server?.name}</div>

          <div className="flex gap-4 items-center">
            <span className="pb-1">{server?.user_role}</span>
            <Link href="/notifications">
              <Bell size={16} />
            </Link>
            <AccountDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
