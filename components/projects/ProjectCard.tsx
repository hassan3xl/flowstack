"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MoreVertical,
  CalendarDays,
  Target,
  CheckCircle2,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { ProjectType } from "@/lib/types/project.types";
import { formatDate } from "@/lib/utils";
import { useServer } from "@/contexts/ServerContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: ProjectType;
  serverId: string;
}

const ProjectCard = ({ project, serverId }: ProjectCardProps) => {
  const router = useRouter();
  const { userRole } = useServer();

  const handleOpenProject = () => {
    router.push(`/server/${serverId}/projects/${project.id}`);
  };

  const handleSettings = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/server/${serverId}/projects/${project.id}/settings/`);
  };

  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    // apiService.requestCollaboration(project.id)
  };

  // Calculations
  const completionPercentage =
    project.item_count > 0
      ? Math.round((project.completed_count / project.item_count) * 100)
      : 0;

  // Visual Helpers
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "border-red-500/50 hover:border-red-500 shadow-red-900/10";
      case "medium":
        return "border-yellow-500/50 hover:border-yellow-500 shadow-yellow-900/10";
      case "low":
        return "border-green-500/50 hover:border-green-500 shadow-green-900/10";
      default:
        return "border-border hover:border-blue-500 shadow-blue-900/10";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div
      onClick={handleOpenProject}
      className={`
        group relative flex flex-col justify-between
        bg-card rounded-xl border p-5
        cursor-pointer transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl
        ${getPriorityColor(project.priority)}
      `}
    >
      {/* --- Header Section --- */}
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-1 pr-8">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <Badge
            variant="secondary"
            className={`text-[10px] px-2 h-5 ${getPriorityBadge(
              project.priority
            )}`}
          >
            {project.priority || "Normal"} Priority
          </Badge>
        </div>

        {/* Floating Actions Menu */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleOpenProject}>
                <ArrowUpRight className="mr-2 h-4 w-4" /> Open Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings}>
                <Target className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
              {userRole !== "admin" && userRole !== "owner" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleRequest}>
                    <Users className="mr-2 h-4 w-4" /> Request Access
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* --- Description --- */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">
        {project.description || "No description provided."}
      </p>

      {/* --- Progress Section --- */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted-foreground font-medium">Progress</span>
          <span className="font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>
        <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${completionPercentage}%` }}
          >
            {/* Shimmer effect on progress bar */}
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]" />
          </div>
        </div>
      </div>

      {/* --- Footer (Collaborators & Stats) --- */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        {/* Collaborators Stack */}
        <div className="flex items-center -space-x-2">
          {project.collaborators?.slice(0, 3).map((collab, i) => (
            <Avatar
              key={collab.id || i}
              className="w-7 h-7 border-2 border-card ring-1 ring-border"
            >
              <AvatarImage src={collab.user?.avatar} />
              <AvatarFallback className="text-[9px] bg-secondary font-bold">
                {collab.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          ))}
          {(project.collaborators?.length || 0) > 3 && (
            <div className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[9px] font-bold text-muted-foreground">
              +{project.collaborators.length - 3}
            </div>
          )}
        </div>

        {/* Task Stat */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 bg-secondary/40 px-2 py-1 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span>
              {project.completed_count}/{project.item_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
