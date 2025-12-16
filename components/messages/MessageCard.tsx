"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import { Home, MessageSquare } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HomeCard() {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();

  const isActive = pathname === "/chats";

  const content = (
    <button
      onClick={() => {
        closeSidebar();
        router.push(`/chats`);
      }}
      className={cn(
        "group relative flex items-center gap-4 w-full md:justify-center p-2 md:p-0 transition-all",
        // Desktop: Circle to Squircle animation
        "md:h-12 md:w-12 md:rounded-[24px] md:hover:rounded-[16px]",
        // Active State
        isActive
          ? "md:bg-primary md:text-primary-foreground bg-accent"
          : "md:bg-background md:hover:bg-accent md:text-foreground",
        // Mobile: Standard list item
        "rounded-lg"
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 shrink-0">
        <MessageSquare
          size={24}
          className={cn("transition-all", isActive && "fill-current")}
        />
      </div>

      {/* Text (Mobile Only) */}
      <div className={cn("md:hidden font-medium", !isOpen && "hidden")}>
        Chats
      </div>

      {/* Active Indicator Strip (Desktop) */}
      {!isOpen && isActive && (
        <div className="absolute left-[-10px] w-[4px] h-[32px] bg-primary rounded-r-full md:block hidden" />
      )}
    </button>
  );

  // Return Tooltip on Desktop, standard on Mobile
  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right" className="font-semibold">
        Chats
      </TooltipContent>
    </Tooltip>
  );
}
