"use client";

import { InputField } from "@/components/input/InputField";
import Loader from "@/components/Loader";
import AddProjectModal from "@/components/modals/AddProjectModal";
import ProjectCard from "@/components/projects/ProjectCard";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGetProjects } from "@/lib/hooks/project.hook";
import { Archive, FolderPlus, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useServer } from "@/contexts/ServerContext";
import { Input } from "@/components/ui/input";

interface ProjectPageProps {}

const ProjectPage = ({}: ProjectPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { serverId, userRole } = useServer();
  const { data: projects, isLoading } = useGetProjects(serverId);

  if (isLoading) {
    return <Loader />;
  }

  if (!projects) {
    return (
      <div>
        <h1>No projects found</h1>
      </div>
    );
  }

  return (
    <div className="grid w-full item-center gap-4">
      {projects.length > 0 ? (
        <div className="space-y-6">
          <Header
            title="Projects"
            subtitle="Manage your projects"
            stats={[
              {
                title: "Total Projects",
                value: projects.length,
              },
              {
                title: "Total Projects",
                value: projects.length,
              },
              {
                title: "Total Projects",
                value: projects.length,
              },
              {
                title: "Total Projects",
                value: projects.length,
              },
            ]}
          />
          <div>
            <div className="flex w-full gap-2 py-4">
              <div className="flex gap-2">
                <Button onClick={() => setIsModalOpen(true)} className="">
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
                <Button variant="outline">
                  <Link className="flex" href="projects/archives/">
                    <Archive className="w-4 h-4 mr-2" />
                    Archives
                  </Link>
                </Button>
              </div>
              <div>
                <Input
                  placeholder="Search"
                  className="w-full mx-auto "
                  type="search"
                ></Input>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  project={project}
                  key={project.id}
                  serverId={serverId}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6">
          <div className="bg-gradient-to-br mx-auto rounded-xl text-center max-w-lg">
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

            {/* Call to Action */}
            {userRole !== "member" && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            )}
          </div>
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
