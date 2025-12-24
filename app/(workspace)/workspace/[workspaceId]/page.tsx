"use client";

import React from "react";
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
} from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CommunityHomeMemberCard from "@/components/workspace/WorkspaceHomeMemberCard";
import Loader from "@/components/Loader";
import Image from "next/image";

// Hooks & Context
import { useGetProjects } from "@/lib/hooks/project.hook";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  useGetWorkspace,
  useGetWorkspaceMembers,
} from "@/lib/hooks/workspace.hook";
import { useWorkspace } from "@/contexts/WorkspaceContext";

const ServerDetails = () => {
  const { user } = useAuth();
  const { workspaceId } = useWorkspace();

  // Data Fetching
  const { data: workspace, isLoading: workspaceLoading } =
    useGetWorkspace(workspaceId);
  const { data: members } = useGetWorkspaceMembers(workspaceId);
  const { data: projects } = useGetProjects(workspaceId);

  // Derived Data
  const recentMembers = members?.slice(0, 5) || [];
  const activeProjects = projects?.filter((p) => p.status !== "archived") || [];

  // Mock Tasks Data (In real app, fetch from useGetMyTasks)
  const myTasks = [
    {
      id: 1,
      title: "Review Pull Request #42",
      due: "Today",
      priority: "high",
      project: "Backend API",
    },
    {
      id: 2,
      title: "Update documentation",
      due: "Tomorrow",
      priority: "medium",
      project: "Frontend",
    },
    {
      id: 3,
      title: "Deploy to staging",
      due: "In 2 days",
      priority: "low",
      project: "DevOps",
    },
  ];

  if (workspaceLoading) return <Loader variant="ring" />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <Image
                  src={workspace?.logo || "/placeholder-logo.png"}
                  width={80}
                  height={80}
                  alt="icon"
                  className="rounded-2xl object-cover border-2 border-border shadow-sm"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-card" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  {workspace?.name}
                  {/* Optional Verified/Pro Badge */}
                  <Badge variant="secondary" className="text-xs font-normal">
                    PRO
                  </Badge>
                </h1>
                <p className="text-muted-foreground text-sm max-w-lg">
                  {workspace?.description ||
                    "Welcome to your workspace dashboard."}
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex-1 md:flex-none">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Button>
              <Button className="flex-1 md:flex-none">
                <UserPlus className="w-4 h-4 mr-2" /> Invite
              </Button>
            </div>
          </div>
        </div>

        {/* --- STATS BAR --- */}
        <div className="border-t border-border bg-muted/20 px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem
              icon={<Folder className="w-4 h-4 text-blue-500" />}
              label="Active Projects"
              value={workspace?.total_projects || 0}
            />
            <StatItem
              icon={<Users className="w-4 h-4 text-purple-500" />}
              label="Team Members"
              value={workspace?.members?.length || 0}
            />
            <StatItem
              icon={<CheckCircle2 className="w-4 h-4 text-green-500" />}
              label="Tasks Done"
              value="128" // Mock
            />
            <StatItem
              icon={<TrendingUp className="w-4 h-4 text-orange-500" />}
              label="Velocity"
              value="+12%"
            />
          </div>
        </div>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Main Dashboard (8 cols) */}
        <div className="xl:col-span-8 space-y-8">
          {/* 1. Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div>

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

            <div className="bg-card border border-border rounded-xl shadow-sm divide-y divide-border">
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high" ? "bg-red-500" : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <Folder className="w-3 h-3" /> {task.project}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.due}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {myTasks.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No pending tasks. You're all caught up!
                </div>
              )}
            </div>
          </div>

          {/* 3. Active Projects (Moved from sidebar to main for better visibility) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" />
                Active Projects
              </h2>
              <Link
                href={`workspaces/${workspaceId}/projects`}
                className="text-sm text-primary hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProjects.slice(0, 4).map((project) => (
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
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-1.5" />
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
              {activeProjects.length === 0 && (
                <div className="col-span-full p-8 border border-dashed border-border rounded-xl text-center">
                  <p className="text-muted-foreground mb-2">
                    No active projects
                  </p>
                  <Button variant="outline" size="sm">
                    Create Project
                  </Button>
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-0.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <p className="text-foreground">
                      <span className="font-medium">Sarah</span> completed task{" "}
                      <span className="text-muted-foreground">
                        "Fix login bug"
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      2 hours ago
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
                href={`/server/${workspaceId}/members`}
                className="text-xs text-blue-500 hover:underline flex items-center"
              >
                See All <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="p-4 space-y-4">
              {recentMembers.map((member: any) => (
                <CommunityHomeMemberCard member={member} key={member.id} />
              ))}
              {(!recentMembers || recentMembers.length === 0) && (
                <div className="text-center text-sm text-muted-foreground">
                  No members found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatItem = ({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wide">
      {icon} {label}
    </div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
  </div>
);

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

export default ServerDetails;
