"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Folder,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Plus,
  LayoutDashboard,
  Settings,
  UserPlus,
  ClipboardList,
  Clock,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CommunityHomeMemberCard from "@/components/workspace/WorkspaceHomeMemberCard";
import Loader from "@/components/Loader";

// Hooks & Context
import { formatDate, timeAgo } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useGetWorkspaceDashboard } from "@/lib/hooks/workspace.hook";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { ProjectType } from "@/lib/types/project.types";
import AddProjectModal from "@/components/workspace/projects/AddProjectModal";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

const WorkspaceDetails = () => {
  const { user } = useAuth();
  const { workspaceId, userRole, isAdminOrOwner } = useWorkspace();
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const { data: dashboard, isLoading: dashboardLoading } =
    useGetWorkspaceDashboard(workspaceId);
  console.log("dashboard", dashboard);

  // if (dashboard === null || dashboard === undefined) {
  //   return;
  // }
  if (dashboardLoading) return <Loader variant="ring" />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HERO SECTION --- */}
      <WorkspaceHeader dashboard={dashboard} />

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Dashboard (8 cols) */}

        <div className="xl:col-span-8 space-y-8">
          {/* 1. Quick Actions Grid */}
          {isAdminOrOwner && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <>
                <QuickActionCard
                  title="New Project"
                  desc="Start a new initiative"
                  icon={Folder}
                  color="text-blue-600"
                  bgColor="bg-blue-50 dark:bg-blue-950/30"
                />
                <QuickActionCard
                  title="Create Task"
                  desc="Assign work to team"
                  icon={ClipboardList}
                  color="text-orange-600"
                  bgColor="bg-orange-50 dark:bg-orange-950/30"
                />
                <QuickActionCard
                  title="Add Member"
                  desc="Grow your team"
                  icon={UserPlus}
                  color="text-purple-600"
                  bgColor="bg-purple-50 dark:bg-purple-950/30"
                />
              </>
            </div>
          )}

          {/* 2. My Priorities (Replacing Feed) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                My Priorities
              </h2>
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground"
              >
                View all tasks
              </Button>
            </div>

            {/* user priorities */}
            <div className="bg-card border border-border rounded-xl shadow-sm divide-y divide-border">
              {dashboard?.my_tasks?.slice(0, 5).map((task: any) => (
                <div
                  key={task.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {task.title.slice(0, 30) + "..."}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <Folder className="w-3 h-3" />{" "}
                        {task.project_title.slice(0, 20) + "..."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(task?.due_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Active */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" />
                Active Projects
              </h2>
              <Link
                href={`/workspace/${workspaceId}/projects`}
                className="text-sm text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            {/* recent projects  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dashboard?.active_projects?.map((project: ProjectType) => (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Folder className="w-5 h-5" />
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                      Active
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Updated {formatDate(project.updated_at)}
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{dashboard.progress}%</span>
                    </div>
                    <Progress value={dashboard.progress} className="h-1.5" />
                  </div>

                  <div className="flex items-center -space-x-2 mt-4 pt-4 border-t border-border/50">
                    {project?.collaborators
                      ?.slice(0, 3)
                      .map((c: any, i: number) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-card bg-muted flex items-center justify-center text-[10px] font-bold"
                        >
                          {c.user.username?.[0] || "?"}
                        </div>
                      ))}
                    {(project?.collaborators?.length || 0) > 3 && (
                      <div className="w-6 h-6 rounded-full border border-card bg-muted flex items-center justify-center text-[8px]">
                        +{project?.collaborators.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {dashboard?.active_projects.length === 0 && (
                <div className="col-span-full p-8 border border-dashed border-border rounded-xl text-center">
                  <p className="text-muted-foreground mb-2">
                    No active projects
                  </p>
                  {isAdminOrOwner && (
                    <>
                      <Button
                        onClick={() => setIsAddProjectModalOpen(true)}
                        variant="outline"
                        size="sm"
                      >
                        Create Project
                      </Button>
                      <AddProjectModal
                        isOpen={isAddProjectModalOpen}
                        onClose={() => setIsAddProjectModalOpen(false)}
                        workspaceId={workspaceId}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Recent Activity Widget (System Logs) */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-4 border-b border-border/50 bg-muted/20">
              <h3 className="font-semibold text-sm">Recent Activity</h3>
            </div>
            <div className="p-4 space-y-4">
              {dashboard?.activities?.slice(0, 5).map((activity: any) => (
                <div key={activity.id} className="flex gap-3 text-sm">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-foreground">
                      <span className="font-medium">{activity.actor_name}</span>{" "}
                      {activity.action_type}
                      <span className="pl-1 text-muted-foreground">
                        {activity.target_text}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {timeAgo(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border/50">
              <Button
                variant="ghost"
                className="w-full text-xs h-8 text-muted-foreground"
              >
                View Log
              </Button>
            </div>
          </div>

          {/* Members Widget */}
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-purple-500" />
                Team Members
              </h3>
              <Link
                href={`/workspace/${workspaceId}/members`}
                className="text-xs text-blue-500 hover:underline flex items-center"
              >
                See All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {dashboard.recent_members.slice(0, 3).map((member: any) => (
                <CommunityHomeMemberCard member={member} key={member.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ title, desc, icon: Icon, color, bgColor }: any) => (
  <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/50 cursor-pointer transition-all hover:shadow-sm group">
    <div
      className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center shrink-0`}
    >
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  </div>
);

export default WorkspaceDetails;

const WorkspaceHeader = ({ dashboard }: any) => {
  return (
    <div className="relative bg-card rounded-2xl border border-border shadow-sm overflow-hidden group">
      {/* 1. Decorative Header Gradient/Banner */}
      <div className="h-32 bg-gradient-to-r from-zinc-800/90 via-gray-800/20 to-slate-800/90 border-b border-border/50 relative">
        {/* Optional: Abstract Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="px-6 pb-6 md:px-8">
        <div className="relative -mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          {/* 2. Main Identity Section */}
          <div className="flex items-end gap-5">
            <Avatar className="w-30 h-30 rounded-xl">
              <AvatarImage
                src={dashboard.workspace_logo || "/placeholder-logo.png"}
              />
              <AvatarFallback>{dashboard.workspace_name?.[0]}</AvatarFallback>
            </Avatar>

            <div className="mb-1 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {dashboard.workspace_name}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-200"
                >
                  <Sparkles className="w-3 h-3 mr-1" /> PRO
                </Badge>
              </div>
              <p className="text-muted-foreground font-medium text-sm max-w-lg line-clamp-1">
                {dashboard?.workspace_description ||
                  "Manage your projects and team in one place."}
              </p>
            </div>
          </div>

          {/* 3. Action / Context Area (Optional) */}
          {/* You could put an 'Invite Member' button here */}
        </div>

        {/* 4. Stats Grid - Clean & Separated */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Folder className="w-5 h-5 text-blue-500" />}
            label="Active Projects"
            value={dashboard.total_projects || 0}
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-purple-500" />}
            label="Team Members"
            value={dashboard.total_members || 0}
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            label="Total Tasks"
            value={dashboard.total_tasks || 0}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-orange-500" />}
            label="Velocity"
            value="+12%"
            subtext="vs last week"
          />
        </div>
      </div>
    </div>
  );
};

// Helper Component for consistency
function StatCard({ icon, label, value, subtext }: any) {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <div className="p-2 bg-background rounded-lg shadow-sm border border-border/50">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {subtext && (
          <span className="text-xs text-green-600 font-medium">{subtext}</span>
        )}
      </div>
    </div>
  );
}
