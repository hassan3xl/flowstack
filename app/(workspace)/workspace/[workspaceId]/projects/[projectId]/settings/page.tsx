"use client";

import AddProjectCollaboratorModal from "@/components/workspace/projects/AddProjectMemberModal";
import DeleteProjectModal from "@/components/workspace/projects/DeleteProjectModal";
import EditProjectModal from "@/components/workspace/projects/EditProjectModal";
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
  User,
  ShieldCheck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { useGetProject } from "@/lib/hooks/project.hook";
import { formatDate } from "@/lib/utils";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import AddProjectMemberModal from "@/components/workspace/projects/AddProjectMemberModal";

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

  const params = useParams();
  const { projectId } = params;
  const { workspaceId } = useWorkspace();

  const { data: project, isLoading: loading } = useGetProject(
    workspaceId,
    projectId as string
  );

  if (loading) {
    return <Loader variant="dots" title="Loading Settings" />;
  }

  if (!project) {
    return;
  }

  const handleUpdateRole = (collaboratorId: string, newRole: string) => {
    console.log(`Updating ${collaboratorId} to ${newRole}`);
    // Add your fetch/axios logic here
  };

  const handleRemoveCollaborator = (collaboratorId: string) => {
    console.log(`Removing ${collaboratorId}`);
    // Add your delete logic here
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
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
        </div>
        {/* Collaborators Management */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Collaborators</h2>
                <Badge className="bg-purple-100 text-purple-800">
                  {project.collaborators.length}
                </Badge>
              </div>
              <Button
                onClick={(e) => {
                  setShowAddCollaboratorModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {project.collaborators.map((collab) => (
              <div
                key={collab.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl gap-4 hover:border-yellow-600/30 transition-colors"
              >
                {/* Left Side: User Info */}
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="h-10 w-10 rounded-full bg-yellow-600/20 flex items-center justify-center text-yellow-500">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      {collab?.user?.username || "Unknown User"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {collab?.user?.email}
                    </p>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Role Selector (Update Role) */}
                  <div className="relative flex-1 sm:flex-none">
                    <ShieldCheck className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                    <select
                      defaultValue={collab.permission}
                      onChange={(e) =>
                        handleUpdateRole(collab.id, e.target.value)
                      }
                      className="pl-9 pr-8 py-2 w-full sm:w-32 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-gray-300 focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none appearance-none cursor-pointer hover:bg-zinc-900"
                    >
                      <option value="VIEWER">Viewer</option>
                      <option value="EDITOR">Editor</option>
                      {/* <option value="ADMIN">Admin</option> */}
                    </select>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveCollaborator(collab.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                    title="Remove User"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
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
      <AddProjectMemberModal
        isOpen={showAddCollaboratorModal}
        projectId={projectId as string}
        workspaceId={workspaceId}
        onClose={() => setShowAddCollaboratorModal(false)}
      />

      <DeleteProjectModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        projectId={projectId as string}
      />
      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={project}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default ProjectSettingsPage;
