"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Home } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeCard() {
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <div
      onClick={() => {
        closeSidebar();

        router.push(`/home`);
      }}
      className="border rounded-lg p-1 shadow-sm hover:shadow-md bg-muted/50 cursor-pointer transition"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-16 h-16 items-center flex-shrink-0">
          <Home size={60} />
        </div>

        {/* Text */}
        <div className="flex flex-col md:hidden">
          {isOpen && (
            <div>
              <p>Home</p>
              <p>get your feeds and so on ....</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
