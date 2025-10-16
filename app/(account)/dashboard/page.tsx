"use client";

import React, { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import { useToast } from "@/components/providers/ToastProvider";
import ProjectCard from "@/components/projects/ProjectCard";
import Loader from "@/components/Loader";
import { ProjectType } from "@/app/(account)/projects/page";

interface DashboardUser {
  id: string;
  email: string;
  first_name: string;
  last_name?: string;
  username?: string;
  avatar?: string;
}

interface DashboardStatistics {
  total_projects: number;
  visibility_distribution: Record<string, number>;
  items_by_status: Record<string, number>;
  items_by_priority: Record<string, number>;
}

interface QuickStats {
  total_projects: number;
  total_tasks: number;
  shared_projects_count: number;
  todays_tasks: number;
  in_progress_tasks: number;
  overdue_tasks: number;
  completed_this_week: number;
}

interface Task {
  id?: string;
  title?: string;
  due_date?: string;
  status?: string;
  priority?: string;
  project_id?: string;
}

interface UserSettings {
  theme: "light" | "dark";
  language: string;
  items_per_page: number;
  auto_archive_completed: boolean;
  default_due_date_days: number;
  enable_email_notifications: boolean;
  enable_push_notifications: boolean;
}

interface DashboardData {
  user: DashboardUser;
  statistics: DashboardStatistics;
  recent_projects: ProjectType[];
  upcoming_tasks: Task[];
  shared_projects: ProjectType[];
  quick_stats: QuickStats;
  settings: UserSettings;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await apiService.get("api/dashboard/");
      setDashboardData(response);
    } catch (err: any) {
      toast.error(err?.detail || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("api/projects/");
      setProjects(response);
    } catch (err: any) {
      toast.error(err.detail);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    getProjects();
  }, []);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "text-blue-500",
  }: {
    icon: any;
    title: string;
    value: number | string;
    subtitle?: string;
    color?: string;
  }) => (
    <div className="bg-secondary rounded-lg p-4 border border-border hover:border-accent-hover transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        No dashboard data found.
      </div>
    );
  }

  const { quick_stats, recent_projects } = dashboardData;

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">
              Welcome, {dashboardData.user.first_name} 👋
            </h1>
            <p className="text-gray-400 mt-1">
              Here’s an overview of your projects and progress.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={CheckCircle}
            title="Total Projects"
            value={quick_stats.total_projects}
            color="text-blue-500"
          />
          <StatCard
            icon={Clock}
            title="Total Tasks"
            value={quick_stats.total_tasks}
            subtitle={`${quick_stats.completed_this_week} completed this week`}
            color="text-green-500"
          />
          <StatCard
            icon={AlertCircle}
            title="Overdue Tasks"
            value={quick_stats.overdue_tasks}
            color="text-red-500"
          />
          <StatCard
            icon={Users}
            title="Shared Projects"
            value={quick_stats.shared_projects_count}
            color="text-purple-500"
          />
        </div>

        {/* Recent Projects */}
        <div className="flex items-center justify-between mt-8">
          <p className="font-semibold text-lg">Recent Projects</p>
          <Link className="text-accent hover:underline" href="/projects">
            View all
          </Link>
        </div>

        {recent_projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No recent projects yet.</p>
        )}
      </div>
    </div>
  );
}
