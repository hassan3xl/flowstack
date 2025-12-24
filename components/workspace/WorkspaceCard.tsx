import React from "react";
import { Crown, MoreVertical, Settings, LogOut, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const WorkspaceCard = ({ workspace }: { workspace: any }) => {
  const isOwner = workspace.user_role === "owner";

  return (
    <div className="group bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:border-primary/50 transition-all duration-300 relative flex flex-col justify-between">
      <div className="flex items-start gap-4">
        {/* Logo with Status Indicator */}
        <div className="relative">
          <Avatar className="w-14 h-14 rounded-xl border border-border shadow-sm group-hover:scale-105 transition-transform">
            <AvatarImage src={workspace.logo} alt={workspace.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
              {workspace.name[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
              {workspace.name}
            </h3>
            {isOwner && (
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-1.5 py-0 h-5 text-[10px]"
              >
                <Crown className="w-3 h-3 mr-1" /> PRO
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {workspace.description || "No description provided"}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {workspace.members?.length || 0} members
            </div>
            <span>•</span>
            <span className="capitalize">{workspace.visibility}</span>
          </div>
        </div>

        {/* Action Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 text-muted-foreground hover:text-foreground"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link
                href={`/workspace/${workspace.id}/settings`}
                className="cursor-pointer"
              >
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Link>
            </DropdownMenuItem>
            {!isOwner && (
              <DropdownMenuItem className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" /> Leave Workspace
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-6 flex gap-2">
        <Button
          asChild
          className="flex-1 shadow-sm"
          variant="default"
          size="sm"
        >
          <Link href={`/workspace/${workspace.id}`}>Enter Workspace</Link>
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceCard;
