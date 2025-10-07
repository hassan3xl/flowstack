"use client";

import { InputField } from "@/components/input/InputField";
import Loader from "@/components/Loader";
import AddProjectModal from "@/components/modals/AddProjectModal";
import ProjectCard from "@/components/projects/ProjectCard";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/apiService";
import {
  Archive,
  Badge,
  CheckCircle2,
  Clock,
  Download,
  FolderOpen,
  FolderPlus,
  LayoutGrid,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SharedUsers {
  id: string;
  user_id: string;
  avatar: string;
  fullname: string;
}
export type ProjectType = {
  id: string;
  title: string;
  priority: string;
  description: string;
  item_count: number;
  visibility: string;
  created_at: string;
  owner_email: string;
  completed_count: number;
  shared_users: SharedUsers[];
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("api/projects/");
      setProjects(response);
    } catch (err: any) {
      setError("Failed to fetch projects");
      toast.error(err.detail);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const OnSuccessAdding = () => {
    getProjects();
  };

  if (loading) {
    return <Loader variant="dots" color="white" title="Loading Projects" />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid max-w-7xl w-full item-center mx-auto gap-4">
      {projects.length > 0 ? (
        <div className="space-y-6">
          {/* ✨ Enhanced Header Section */}
          <div
            className="bg-gradient-to-r from-secondary/80 to-secondary/60 backdrop-blur-sm 
                    rounded-xl p-6 border border-tertiary/50 shadow-lg"
          >
            {/* Search and Filter Controls */}
            <div className="flex flex-row gap-3">
              <div className="w-[70%]">
                <InputField
                  field="input"
                  icon={Search}
                  type="text"
                  placeholder="Search projects by name or description..."
                  value=""
                  onChange={() => {}}
                  className="p-2.5 "
                />
              </div>
              <div className="w-[30%]">
                <InputField
                  field="select"
                  value=""
                  onChange={() => {}}
                  className="p-3 border-accent rounded-lg"
                  options={[
                    { label: "🗂️ All", value: "all" },
                    { label: "⚡ Active", value: "active" },
                    { label: "✅ Completed", value: "completed" },
                    { label: "⚠️ Overdue", value: "overdue" },
                    { label: "👥 Shared", value: "shared" },
                    { label: "🔒 Private", value: "private" },
                  ]}
                />
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary rounded-lg p-4 border border-tertiary hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FolderOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {projects.length}
                    </p>
                    <p className="text-sm text-gray-400">Total Projects</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary  rounded-lg p-4 border border-tertiary hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {
                        projects.filter((p) => {
                          const completion =
                            p.item_count > 0
                              ? (p.completed_count / p.item_count) * 100
                              : 0;
                          return completion === 100;
                        }).length
                      }
                    </p>
                    <p className="text-sm text-gray-400">Completed</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-lg p-4 border border-tertiary hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {
                        projects.filter((p) => {
                          const completion =
                            p.item_count > 0
                              ? (p.completed_count / p.item_count) * 100
                              : 0;
                          return completion > 0 && completion < 100;
                        }).length
                      }
                    </p>
                    <p className="text-sm text-gray-400">In Progress</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary rounded-lg p-4 border border-tertiary hover:border-accent">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Archive className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-sm text-gray-400">Archived</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-white">
                Your Projects
              </h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Link className="flex" href="projects/archives/">
                    <Archive className="w-4 h-4 mr-2" />
                    Archives
                  </Link>
                </Button>
                <Button onClick={() => setModalOpen(true)} className="">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div
            className="bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm 
                    rounded-2xl p-12 border border-tertiary/30 text-center max-w-lg"
          >
            {/* Empty State Icon */}
            <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center border border-white">
              <FolderPlus className="w-12 h-12 text-white" />
            </div>

            {/* Empty State Content */}
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to get organized?
            </h3>
            <p className="text-gray-300 text-lg mb-2">
              No projects found. Create your first project to start managing
              tasks and collaborating with your team.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Projects help you organize tasks, track progress, and work
              together more effectively.
            </p>

            {/* Call to Action */}
            <Button
              onClick={() => setModalOpen(true)}
              className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Project
            </Button>

            {/* Quick Tips */}
            <div className="mt-8 pt-6 border-t border-tertiary/30">
              <p className="text-xs text-gray-400 mb-4">
                Quick tips to get started:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                Coming soon
              </div>
            </div>
          </div>
        </div>
      )}
      <AddProjectModal
        onSuccess={OnSuccessAdding}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsPage;
