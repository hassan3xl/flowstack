"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserCard() {
  const router = useRouter();
  const { isOpen, closeSidebar } = useSidebar();
  const { user } = useAuth();

  const handleProfile = () => {
    router.push(`/account`);
    closeSidebar();
  };

  const content = (
    <button
      onClick={handleProfile}
      className={cn(
        "flex items-center gap-3 w-full transition-all group",
        // Desktop: Simple Avatar
        "md:justify-center md:p-0",
        // Mobile: Card style
        "p-2 rounded-xl hover:bg-accent bg-accent/30"
      )}
    >
      <div className="relative w-10 h-10 shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all">
          <Image
            src={user?.avatar || "/userIcon.png"}
            alt="user"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
      </div>

      <div
        className={cn(
          "md:hidden flex flex-col items-start overflow-hidden",
          !isOpen && "hidden"
        )}
      >
        <p className="text-sm font-bold truncate w-32 text-left">
          {user?.username}
        </p>
        <p className="text-xs text-muted-foreground truncate w-32 text-left">
          {user?.user.email}
        </p>
      </div>

      {/* Mobile Settings Icon */}
      <div className={cn("md:hidden ml-auto", !isOpen && "hidden")}>
        <Settings className="w-4 h-4 text-muted-foreground" />
      </div>
    </button>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">My Account</TooltipContent>
    </Tooltip>
  );
}
