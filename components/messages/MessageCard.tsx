"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { MessageSquareDiffIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MessageCard() {
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <div
      onClick={() => {
        closeSidebar();
        router.push(`/chats`);
      }}
      className="border rounded-lg p-1 shadow-sm hover:shadow-md bg-accent/50 cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0">
          <MessageSquareDiffIcon size={60} />
        </div>

        {/* Text */}
        <div className="flex flex-col w-full sm:hidden">
          {isOpen && (
            <div>
              <p>Home</p>
              <p>coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
