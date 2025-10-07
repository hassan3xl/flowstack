"use client";

import { ProjectType } from "@/app/(account)/projects/page";
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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useToast } from "../providers/ToastProvider";
import { Button } from "../ui/button";
import { apiService } from "@/services/apiService";

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();

  const isOwner = user?.email === project.owner_email;
  const isCollaborator = project.shared_users?.some(
    (collab: any) => collab.email === user?.email
  );
  const isPublic = project.visibility === "public";

  // 🔹 Navigate to settings
  const gotoSettings = () => {
    if (!isOwner) {
      toast.error("You're not the owner of the project");
      return;
    }
    router.push(`/projects/${project.id}/settings`);
  };
  const gotoUserProfile = (id: string) => {
    router.push(`/users/${id}`);
  };

  // 🔹 Handle "Open Project" or "Request Collaboration"
  const handleProjectClick = () => {
    if (isOwner || isCollaborator) {
      router.push(`/projects/${project.id}`);
    } else if (isPublic) {
      toast.info("This project is public. You can request collaboration.");
    } else {
      toast.error("You don't have access to this project.");
    }
  };

  const handleRequestCollaboration = async () => {
    const payload = {};
    try {
      // Example: PATCH or POST to request access
      await apiService.post(
        `api/projects/${project.id}/request-collaboration/`,
        payload
      );
      toast.success("Collaboration request sent successfully!");
    } catch (error: any) {
      toast.error(error?.detail || "Failed to send collaboration request");
    }
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
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Progress color
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-green-500";
    if (completionPercentage >= 50) return "bg-blue-500";
    if (completionPercentage >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Visibility badge
  const getVisibilityBadge = (visibility: string) => {
    const colors = {
      private: "bg-red-100 text-red-800 border-red-200",
      public: "bg-green-100 text-green-800 border-green-200",
      shared: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
      colors[visibility as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div
      className="bg-secondary rounded-xl p-4 sm:p-6 border border-tertiary/50 
      hover:border-accent-hover/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 
      group relative backdrop-blur-sm hover:scale-[1.02] transform"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className="font-bold text-md sm:text-lg text-white group-hover:text-accent cursor-pointer transition-colors truncate max-w-[220px]"
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
          {isOwner || isCollaborator ? (
            <Button onClick={handleProjectClick}>Open</Button>
          ) : isPublic ? (
            <Button
              onClick={handleRequestCollaboration}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Request Collaboration
            </Button>
          ) : (
            <Button disabled className="bg-gray-600 cursor-not-allowed">
              Private Project
            </Button>
          )}
          {isOwner && (
            <Button className="" onClick={gotoSettings}>
              <Settings className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Progress Section */}
      <div className="bg-primary/30 rounded-lg p-4 border border-tertiary/30 mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Progress</span>
          </div>
          <span className="text-sm font-bold text-white bg-tertiary/50 px-2 py-1 rounded-full">
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
          <Badge
            className={`${getVisibilityBadge(
              project.visibility
            )} text-xs capitalize`}
          >
            {project.visibility}
          </Badge>
          <div className="flex items-center gap-2 bg-tertiary/30 px-3 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">
              <span className="font-semibold text-white">
                {project.completed_count}
              </span>
              <span className="text-gray-400">/{project?.item_count}</span>{" "}
              tasks
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(project.created_at)}</span>
        </div>
      </div>

      {/* Collaborators + Status */}
      <div className="flex items-center justify-between pt-2 border-t border-tertiary/30">
        {/* Collaborators */}
        <div className="flex items-center gap-2">
          {project.shared_users && project.shared_users.length > 0 ? (
            <div className="flex -space-x-2">
              {project.shared_users.slice(0, 3).map((collaborator) => (
                <div
                  key={collaborator.id}
                  onClick={() => gotoUserProfile(collaborator.user_id)}
                  className="w-8 h-8 rounded-full bg-slate-700 border-2 border-secondary 
                          flex items-center justify-center text-xs font-medium text-white 
                          overflow-hidden ring-2 ring-blue-500/20 hover:ring-blue-500/50 
                          transition-all transform hover:scale-110"
                  title={`${collaborator.fullname}`}
                >
                  {collaborator.avatar ? (
                    <img
                      src={collaborator.avatar}
                      alt={`${collaborator.fullname}`}
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
              {project.shared_users.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-secondary flex items-center justify-center text-xs font-bold text-white ring-2 ring-blue-500/20">
                  +{project.shared_users.length - 3}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-xs">Solo project</span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          {completionPercentage === 100 ? (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Complete
            </Badge>
          ) : completionPercentage > 0 ? (
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Clock className="w-3 h-3 mr-1" />
              In Progress
            </Badge>
          ) : (
            <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Not Started
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
