"use client";

import AddProjectCollaboratorModal from "@/components/modals/AddProjectCollaborator";
import DeleteProjectModal from "@/components/modals/DeleteProjectModal";
import EditProjectModal from "@/components/modals/EditProjectModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Trash2,
  Archive,
  ArchiveRestore,
  UserPlus,
  Users,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Crown,
  Settings,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import DeleteCollaboratorModal from "@/components/modals/DeleteCollaboratorModal";
import { useToast } from "@/providers/ToastProvider";
import { useGetProject } from "@/lib/hooks/project.hook";
import { useServer } from "@/contexts/ServerContext";

const ProjectSettingsPage = () => {
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    useState(false);
  const [showDeleteCollaboratorModal, setShowCollaboratorDeleteModal] =
    useState<{
      isOpen: boolean;
      userId: string | null;
    }>({
      isOpen: false,
      userId: null,
    });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const params = useParams();
  const { projectId } = params;
  const { serverId } = useServer();

  const { data: project, isLoading: loading } = useGetProject(
    serverId,
    projectId as string
  );

  const HandleSuccessAddCollab = () => {
    setShowAddCollaboratorModal(false);
  };

  const handleDeleteCollaboratorSuccess = () => {
    toast.success("Collaborator removed successfully");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loader variant="dots" title="Loading Settings" />;
  }

  if (!project) {
    return;
  }

  // const completionRate =
  //   project.item_count > 0
  //     ? Math.round(
  //         (project.completed_count / project.item_count) * 100
  //       )
  //     : 0;

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-blue-400" />
            <h1 className="text-lg sm:text-3xl font-bold">Project Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your project details, collaborators, and settings
          </p>
        </div>

        {/* Project Information Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className=" p-6 border-b border-border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-md sm:text-2xl font-semibold text-white">
                    {project.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {formatDate(project.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>By: {project.created_by}</span>
                  </div>
                </div>
              </div>
              <Button size={"sm"} onClick={() => setShowEditModal(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          {/* Project Stats */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <div className="bg-accent p-4 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-blue-400">
                {project.item_count}
              </div>
              <div className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Total Tasks
              </div>
            </div>
            <div className="bg-accent p-4 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-green-400">
                {project.completed_count}
              </div>
              <div className="text-sm text-gray-400 mt-1">Completed</div>
              <div className="text-xs text-green-400 mt-1">
                {/* {completionRate}% done */}
              </div>
            </div>
            <div className="bg-accent p-4 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-red-400">
                {project.project_items.filter((item) => item.due_date).length}
              </div>
              <div className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                Overdue
              </div>
            </div>
            <div className="bg-accent p-4 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-purple-400">
                {/* {project.shared_users.length} */}
              </div>
              <div className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Users className="w-3 h-3" />
                Collaborators
              </div>
            </div>
          </div>
        </div>

        {/* Collaborators Management */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Collaborators</h2>
                <Badge className="bg-purple-100 text-purple-800">
                  {/* {project.shared_users.length + 1} */}
                </Badge>
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAddCollaboratorModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {/* Owner */}
            <div className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 p-4 rounded-lg border border-yellow-600/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        {project?.created_by}
                      </span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Owner
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      Full access & control
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shared Users */}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-xl border border-red-500/50 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 p-6 border-b border-red-500/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-semibold text-red-400">
                Danger Zone
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Archive/Restore */}
            <div className="bg-accent p-5 rounded-lg border border-border">
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {project.status === "archived" ? (
                      <ArchiveRestore className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Archive className="w-5 h-5 text-orange-400" />
                    )}
                    <h3 className="font-semibold text-white">
                      {project.status === "archived"
                        ? "Restore Project"
                        : "Archive Project"}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    {project.status === "archived"
                      ? "Restore this project to your active projects list"
                      : "Hide this project from your active list. You can restore it anytime."}
                  </p>
                </div>
                <Button
                  className={`shrink-0 shadow-lg hover:shadow-xl transition-all ${
                    project.status === "archived"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  }`}
                >
                  {project.status === "archived" ? (
                    <>
                      <ArchiveRestore className="w-4 h-4 mr-2" />
                      Restore
                    </>
                  ) : (
                    <>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Delete Project */}
            <div className="bg-red-900/20 p-5 rounded-lg border border-red-500/30">
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="w-5 h-5 text-red-400" />
                    <h3 className="font-semibold text-red-400">
                      Delete Project
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    Permanently delete this project and all its data. This
                    action cannot be undone.
                  </p>
                </div>
                <Button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all shrink-0"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProjectCollaboratorModal
        isOpen={showAddCollaboratorModal}
        projectId={projectId as string}
        onClose={() => setShowAddCollaboratorModal(false)}
        onSuccess={HandleSuccessAddCollab}
      />
      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        projectId={projectId as string}
      />

      <DeleteCollaboratorModal
        isOpen={showDeleteCollaboratorModal.isOpen}
        onClose={() =>
          setShowCollaboratorDeleteModal({ isOpen: false, userId: null })
        }
        projectId={projectId as string}
        userId={showDeleteCollaboratorModal.userId}
        onSuccess={handleDeleteCollaboratorSuccess}
      />
      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={project}
        serverId={serverId}
      />
    </div>
  );
};

export default ProjectSettingsPage;
