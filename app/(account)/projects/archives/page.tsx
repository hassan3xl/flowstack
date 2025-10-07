"use client";

import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiService } from "@/services/apiService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Trash2,
  Eye,
  Lock,
  Globe,
  Users,
  CheckCircle2,
  FolderArchive,
  AlertCircle,
  Calendar,
  Package,
} from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import Loader from "@/components/Loader";
import { ProjectType } from "@/app/(account)/projects/page";

const ProjectArchivesPage = () => {
  const [archivedProjects, setArchivedProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<{
    id: string;
    action: "restore" | "delete";
  } | null>(null);
  const toast = useToast();
  const router = useRouter();

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("api/projects/archives/");
      setArchivedProjects(Array.isArray(response) ? response : []);
    } catch (error: any) {
      toast.error(error?.detail || "Failed to fetch archived projects");
      setArchivedProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  if (loading) {
    return <Loader title="loading archives" />;
  }

  return (
    <div className="min-h-screen bg-primary mx-auto max-w-7xl text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-tertiary/50">
          <div className="flex items-center gap-3 mb-2">
            <FolderArchive className="w-8 h-8 text-orange-400" />
            <h1 className="text-3xl font-bold">Archived Projects</h1>
          </div>
          <p className="text-gray-300">
            View and manage your archived projects. Restore them or permanently
            delete them.
          </p>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 flex items-center gap-2 px-3 py-1.5">
              <Archive className="w-4 h-4" />
              {archivedProjects.length} Archived{" "}
              {archivedProjects.length === 1 ? "Project" : "Projects"}
            </Badge>
          </div>
        </div>

        {/* Projects Grid */}
        {archivedProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {archivedProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl border border-tertiary/50 p-12 text-center">
            <FolderArchive className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              No Archived Projects
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't archived any projects yet. Archived projects will
              appear here.
            </p>
            <Button
              onClick={() => router.push("/projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Go to Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectArchivesPage;
