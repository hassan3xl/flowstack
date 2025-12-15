"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ServerCardProps {
  server: {
    id: string;
    name: string;
    icon: string | null;
  };
}

export default function ServerCard({ server }: ServerCardProps) {
  const router = useRouter();
  const params = useParams();
  const { isOpen, closeSidebar } = useSidebar();

  const isActive = params?.serverId === server.id;
  const firstLetter = server.name?.charAt(0).toUpperCase() || "?";

  const handleNavigate = () => {
    router.push(`/server/${server.id}`);
    closeSidebar();
  };

  const content = (
    <button
      onClick={handleNavigate}
      className={cn(
        "group relative flex items-center w-full gap-3 md:justify-center transition-all",
        // Mobile Layout
        "p-2 rounded-lg hover:bg-accent/50",
        // Desktop Layout (Reset padding, handle shape)
        "md:p-0 md:bg-transparent md:hover:bg-transparent"
      )}
    >
      {/* Active Indicator (Desktop Left Stripe) */}
      <div
        className={cn(
          "absolute left-[-12px] bg-primary rounded-r-full transition-all duration-300 md:block hidden",
          isActive
            ? "h-[32px] w-[4px]"
            : "h-[8px] w-[4px] scale-0 group-hover:scale-100"
        )}
      />

      {/* Icon Container */}
      <div
        className={cn(
          "relative flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300",
          "w-12 h-12 text-lg font-medium",
          // The Discord Squircle Magic:
          isActive || isOpen
            ? "rounded-[16px]"
            : "rounded-[24px] group-hover:rounded-[16px]",
          // Colors
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-card text-foreground group-hover:bg-primary group-hover:text-white"
        )}
      >
        {server.icon ? (
          <Image
            src={server.icon}
            alt={server.name}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <span>{firstLetter}</span>
        )}
      </div>

      {/* Text (Mobile Only) */}
      <div
        className={cn(
          "md:hidden flex flex-col items-start",
          !isOpen && "hidden"
        )}
      >
        <span
          className={cn("font-semibold text-sm", isActive && "text-primary")}
        >
          {server.name}
        </span>
      </div>
    </button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">
        <p className="font-bold">{server.name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
