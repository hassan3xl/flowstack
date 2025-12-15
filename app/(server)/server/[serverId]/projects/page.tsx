"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Archive,
  FolderPlus,
  SlidersHorizontal,
} from "lucide-react";
import { useServer } from "@/contexts/ServerContext";
import { useGetProjects } from "@/lib/hooks/project.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import AddProjectModal from "@/components/modals/AddProjectModal";
import ProjectCard from "@/components/projects/ProjectCard";

const ProjectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { serverId, userRole } = useServer();
  const { data: projects, isLoading } = useGetProjects(serverId);
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Loader />;

  // Filter Logic (Client side for now)
  const filteredProjects = projects?.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 w-full">
      {/* 1. Dashboard Header */}
      {projects && projects.length > 0 && (
        <Header
          title="Projects Board"
          subtitle="Oversee and manage your team's initiatives."
          stats={[
            { title: "Active", value: projects.length },
            {
              title: "Completed",
              value: projects.filter((p) => p.completed_count === p.item_count)
                .length,
            },
            // Add real logic for these stats when available
            { title: "Pending", value: 0 },
            { title: "Total", value: projects.length },
          ]}
        />
      )}

      {/* 2. Controls & Grid */}
      {!projects || projects.length === 0 ? (
        // --- Empty State ---
        <div className="flex flex-col items-center justify-center min-h-[50vh] border-2 border-dashed border-border/50 rounded-2xl bg-card/20 p-8">
          <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center mb-6 ring-4 ring-secondary/20">
            <FolderPlus className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Create your first project to start tracking tasks, managing files,
            and collaborating with your team.
          </p>
          {userRole !== "member" && (
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="gap-2"
            >
              <Plus className="w-5 h-5" /> Create New Project
            </Button>
          )}
        </div>
      ) : (
        // --- Content State ---
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10 bg-background/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="outline" asChild className="flex-1 md:flex-none">
                <Link href="projects/archives/">
                  <Archive className="w-4 h-4 mr-2" />
                  Archives
                </Link>
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 md:flex-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects?.map((project) => (
              <ProjectCard
                project={project}
                key={project.id}
                serverId={serverId}
              />
            ))}
          </div>

          {filteredProjects?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serverId={serverId}
      />
    </div>
  );
};

export default ProjectPage;
