"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BellIcon,
  Menu,
  MenuIcon,
  MessageCircleCode,
  MessageCircleDashedIcon,
  MessageCircleReply,
  X,
} from "lucide-react";
import { AccountDropdown } from "./AccountDropdown";
import { useSidebar } from "@/contexts/SidebarContext";
import { NotificationDropdown } from "./NotificationDropdown";
import { MessagesDropdown } from "./InboxDropdown";

export function Navbar() {
  const { isOpen, closeSidebar, toggleSidebar } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 border right-0 z-50">
      {/* Container to handle padding and max width */}
      <div className="w-full bg-sidebar">
        <div className="flex items-center justify-between h-12  px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center">
            {/* Mobile menu button (on the left) */}

            {!isOpen && (
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-muted rounded-md md:hidden text-white"
                aria-label="Toggle mobile menu"
              >
                <MenuIcon />
              </button>
            )}
            {isOpen && (
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-muted rounded-md md:hidden text-white"
                aria-label="Toggle mobile menu"
              >
                <X />
              </button>
            )}

            <Link href="/" className="rounded-md ml-2 p-2">
              <Image
                src="/logo.png"
                width={150}
                height={5}
                alt="FlowStack Logo"
                className="w-32 sm:w-[150px] h-auto"
              />
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <MessagesDropdown />
            <NotificationDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
