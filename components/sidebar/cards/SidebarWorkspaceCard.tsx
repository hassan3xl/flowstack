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
import { useGetWorkspaces } from "@/lib/hooks/workspace.hook";
import Loader from "@/components/Loader";
import { WorkspaceType } from "@/lib/types/workspace.types";

export default function SidebarWorkspaceCard() {
  const router = useRouter();
  const params = useParams<{ workspaceId?: string }>();
  const { isOpen, closeSidebar } = useSidebar();

  const { data: workspaces, isLoading } = useGetWorkspaces();

  if (isLoading) return;
  if (!workspaces || workspaces.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {workspaces.map((workspace: WorkspaceType) => {
        const isActive = params.workspaceId === workspace.id;
        const firstLetter = workspace.name?.charAt(0).toUpperCase() || "?";

        const handleNavigate = () => {
          router.push(`/workspace/${workspace.id}`);
          closeSidebar();
        };

        const content = (
          <button
            key={workspace.id}
            onClick={handleNavigate}
            className={cn(
              "group relative flex items-center w-full gap-3 md:justify-center transition-all",
              // Mobile layout
              "p-2 rounded-lg hover:bg-accent/50",
              // Desktop layout
              "md:p-0 md:bg-transparent md:hover:bg-transparent"
            )}
          >
            {/* Active indicator (desktop) */}
            <div
              className={cn(
                "absolute left-[-12px] bg-primary rounded-r-full transition-all duration-300 md:block hidden",
                isActive
                  ? "h-[32px] w-[4px]"
                  : "h-[8px] w-[4px] scale-0 group-hover:scale-100"
              )}
            />

            {/* Icon container */}
            <div
              className={cn(
                "relative flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300",
                "w-12 h-12 text-lg font-medium",
                isActive || isOpen
                  ? "rounded-[16px]"
                  : "rounded-[24px] group-hover:rounded-[16px]",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground group-hover:bg-primary group-hover:text-white"
              )}
            >
              {workspace.logo ? (
                <Image
                  src={workspace.logo}
                  alt={workspace.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <span>{firstLetter}</span>
              )}
            </div>

            {/* Text (mobile only) */}
            <div
              className={cn(
                "md:hidden flex flex-col items-start",
                !isOpen && "hidden"
              )}
            >
              <span
                className={cn(
                  "font-semibold text-sm",
                  isActive && "text-primary"
                )}
              >
                {workspace.name}
              </span>
            </div>
          </button>
        );

        return (
          <Tooltip key={workspace.id}>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-bold">{workspace.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
