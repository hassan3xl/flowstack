"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, BellIcon, Menu, MenuIcon } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { Button } from "../ui/button";
import { NotificationDropdown } from "./components/NotificationDropdown";

export function CommunityNavbar({}) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 border-b right-0 z-50">
      <div className="w-full">
        <div className="flex justify-between h-12 bg-background px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex mt-1">
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

          <div className="flex gap-4 items-center">
            <NotificationDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
