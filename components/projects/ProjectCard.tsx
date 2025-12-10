"use client";

import { formatDate } from "@/lib/utils";
import React, { useRef } from "react";
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Target,
  Settings,
  TrendingUp,
  CircleChevronRight,
  Settings2Icon,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { apiService } from "@/lib/services/apiService";
import { ProjectType } from "@/lib/types/project.types";
import { toast } from "sonner";
import { useServer } from "@/contexts/ServerContext";

interface ProjectCardProps {
  project: ProjectType;
  serverId: string;
}

const ProjectCard = ({ project, serverId }: ProjectCardProps) => {
  const router = useRouter();

  const { userRole } = useServer();

  // 🔹 Handle "Open Project" or "Request Collaboration"
  const handleProjectClick = () => {
    router.push(`/server/${serverId}/projects/${project.id}`);
  };

  const projectSettings = () => {
    router.push(`/server/${serverId}/projects/${project.id}/settings/`);
  };

  // Calculate completion percentage
  const completionPercentage =
    project.item_count > 0
      ? Math.round((project.completed_count / project.item_count) * 100)
      : 0;

  // Priority styling
  const getPriorityStyle = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-gray-500/20 text-muted-foreground border-gray-500/30";
    }
  };

  // Progress color
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-blue-500";
    if (completionPercentage >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      className="bg-card rounded-xl p-4 sm:p-6 border border-border
      hover:border-accent-hover/50 transition-all duration-300 "
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="font-bold text-md sm:text-lg text-primary cursor-pointer transition-colors truncate max-w-[220px]"
              title={project.title}
            >
              {project.title}
            </h3>
          </div>

          {project.priority && (
            <Badge
              variant="outline"
              className={`${getPriorityStyle(
                project.priority
              )} text-xs font-medium`}
            >
              <Target className="w-3 h-3 mr-1" />
              {project.priority} Priority
            </Badge>
          )}
        </div>
        <div className="flex gap-4 ">
          {!["owner", "admin"].includes(userRole as string) && (
            <Button
              variant="outline"
              size={"sm"}
              // onClick={() => apiService.requestCollaboration(project.id)}
            >
              Request
            </Button>
          )}
          <Button size={"sm"} onClick={projectSettings}>
            <Settings2Icon />
          </Button>

          <Button size={"sm"} onClick={handleProjectClick}>
            Open
          </Button>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Progress Section */}
      <div className="bg-accent rounded-lg p-4 border border-tertiary/30 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-muted-foreground">
              Progress
            </span>
          </div>
          <span className="text-sm font-bold text-primary bg-tertiary/50 px-2 py-1 rounded-full">
            {completionPercentage}%
          </span>
        </div>

        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${getProgressColor()} transition-all duration-500 relative overflow-hidden`}
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Tasks and Due Date */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-tertiary/30 px-3 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-primary">
                {project.completed_count}
              </span>
              <span className="text-gray-400">/{project?.item_count}</span>{" "}
              tasks
            </span>
          </div>
        </div>
      </div>

      {/* Collaborators + Status */}
      <div className="flex items-center justify-between pt-2 border-t border-tertiary/30">
        {/* Collaborators */}
        <div className="flex items-center gap-2">
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="flex -space-x-2">
              {project.collaborators.slice(0, 3).map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="w-8 h-8 rounded-full bg-muted/30 border-2 border-border 
                          flex items-center justify-center text-xs font-medium
                          overflow-hidden
                          "
                  title={`${collaborator.user.username}`}
                >
                  {collaborator.user.avatar ? (
                    <img
                      src={collaborator.user.avatar}
                      alt={`${collaborator.user.username}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/pngs/default-avatar.png"
                      alt="Default avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
              {project.collaborators.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-secondary flex items-center justify-center text-xs font-bold text-primary ring-2 ring-blue-500/20">
                  +{project.collaborators.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(project.created_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
