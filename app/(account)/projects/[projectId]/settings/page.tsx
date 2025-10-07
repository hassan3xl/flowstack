"use client";

import AddProjectCollaboratorModal from "@/components/modals/AddProjectCollaborator";
import DeleteProjectModal from "@/components/modals/DeleteProjectModal";
import EditProjectModal from "@/components/modals/EditProjectModal";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiService } from "@/services/apiService";
import {
  Edit3,
  Trash2,
  Archive,
  ArchiveRestore,
  UserPlus,
  Users,
  Shield,
  Calendar,
  Eye,
  EyeOff,
  Globe,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Crown,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InputField } from "@/components/input/InputField";
import Loader from "@/components/Loader";
import DeleteCollaboratorModal from "@/components/modals/DeleteCollaboratorModal";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  is_overdue: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface SharedUser {
  id: string;
  user_id: string;
  email: string;
  fullname: string;
  role: string;
  avatar?: string;
}

interface SharedList {
  id: string;
  user: string;
}

interface ProjectSettings {
  id: string;
  title: string;
  description: string;
  visibility: "private" | "shared" | "public";
  is_archived: boolean;
  is_shared: boolean;
  owner: string;
  owner_email: string;
  item_count: number;
  completed_count: number;
  created_at: string;
  updated_at: string;
  project_items: ProjectItem[];
  shared_users: SharedUser[];
  shared_list: SharedList[];
}

const ProjectSettingsPage = () => {
  const [projectSettings, setProjectSettings] =
    useState<ProjectSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    useState(false);
  const [showDeleteCollaboratorModal, setShowCollaboratorDeleteModal] =
    useState({
      isOpen: false,
      userId: null,
    });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [changingRole, setChangingRole] = useState<string | null>(null);
  const [removingUser, setRemovingUser] = useState<string | null>(null);
  const { projectId } = useParams();
  const router = useRouter();
  const toast = useToast();

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(
        `api/projects/${projectId}/settings/`
      );
      console.log(response);
      setProjectSettings(response);
    } catch (err) {
      setError("Error fetching project settings");
      toast.error("Failed to load project settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchSettings();
    }
  }, [projectId]);

  const handleEditProjectSuccess = () => {
    setShowEditModal(false);
    fetchSettings();
    toast.success("Project updated successfully!");
  };

  const handleDeleteProjectSuccess = () => {
    setShowDeleteModal(false);
    router.push("/projects");
    toast.success("Project deleted successfully!");
  };

  const HandleSuccessAddCollab = () => {
    fetchSettings();
    setShowAddCollaboratorModal(false);
  };

  const handleDeleteCollaboratorSuccess = () => {
    fetchSettings();
    toast.success("Collaborator removed successfully");
  };

  const handleArchiveProject = async (projectId: string) => {
    if (!projectSettings) return;
    try {
      // Toggle the current archived state
      const newArchivedState = !projectSettings.is_archived;

      const res = await apiService.patch(`api/projects/${projectId}/archive/`, {
        is_archived: newArchivedState,
      });

      // Update your local state immediately (so UI changes without refresh)
      setProjectSettings((prev: any) => ({
        ...prev,
        is_archived: newArchivedState,
      }));

      toast.success(
        newArchivedState
          ? "Project archived successfully!"
          : "Project restored successfully!"
      );
    } catch (error: any) {
      toast.error(error?.detail || "Failed to update project status");
    }
  };

  const handleChangeRole = async (sharedAccessId: string, newRole: string) => {
    if (!projectSettings) return;

    setChangingRole(sharedAccessId);
    try {
      await apiService.patch(`api/projects/shared-lists/${sharedAccessId}/`, {
        access_level: newRole,
      });
      toast.success(`Role changed to ${newRole} successfully`);
      await fetchSettings(); // Refresh to reflect updated role
    } catch (err: any) {
      toast.error(err?.detail || "Failed to change role");
    } finally {
      setChangingRole(null);
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "private":
        return <Lock className="w-4 h-4" />;
      case "public":
        return <Globe className="w-4 h-4" />;
      case "shared":
        return <Users className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "private":
        return "bg-red-100 text-red-800 border-red-200";
      case "public":
        return "bg-green-100 text-green-800 border-green-200";
      case "shared":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "editor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "viewer":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    <Loader variant="dots" title="Loading Settings" />;
  }

  if (error || !projectSettings) {
    return <div></div>;
  }

  const completionRate =
    projectSettings.item_count > 0
      ? Math.round(
          (projectSettings.completed_count / projectSettings.item_count) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-primary text-white p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-tertiary/50">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Project Settings</h1>
          </div>
          <p className="text-gray-300">
            Manage your project details, collaborators, and settings
          </p>
        </div>

        {/* Project Information Card */}
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl border border-tertiary/50 shadow-lg overflow-hidden">
          <div className="bg-secondary p-6 border-b border-tertiary/50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold text-white">
                    {projectSettings.title}
                  </h2>
                  <Badge
                    className={`${getVisibilityColor(
                      projectSettings.visibility
                    )} capitalize flex items-center gap-1`}
                  >
                    {getVisibilityIcon(projectSettings.visibility)}
                    {projectSettings.visibility}
                  </Badge>
                  {projectSettings.is_archived && (
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 flex items-center gap-1">
                      <Archive className="w-3 h-3" />
                      Archived
                    </Badge>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {projectSettings.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Created: {formatDate(projectSettings.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span>Owner: {projectSettings.owner_email}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowEditModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <div className="bg-primary/50 p-4 rounded-lg border border-tertiary/30 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {projectSettings.item_count}
              </div>
              <div className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Total Tasks
              </div>
            </div>
            <div className="bg-primary/50 p-4 rounded-lg border border-tertiary/30 text-center">
              <div className="text-3xl font-bold text-green-400">
                {projectSettings.completed_count}
              </div>
              <div className="text-sm text-gray-400 mt-1">Completed</div>
              <div className="text-xs text-green-400 mt-1">
                {completionRate}% done
              </div>
            </div>
            <div className="bg-primary/50 p-4 rounded-lg border border-tertiary/30 text-center">
              <div className="text-3xl font-bold text-red-400">
                {
                  projectSettings.project_items.filter(
                    (item) => item.is_overdue
                  ).length
                }
              </div>
              <div className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                Overdue
              </div>
            </div>
            <div className="bg-primary/50 p-4 rounded-lg border border-tertiary/30 text-center">
              <div className="text-3xl font-bold text-purple-400">
                {projectSettings.shared_users.length}
              </div>
              <div className="text-sm text-gray-400 mt-1 flex items-center justify-center gap-1">
                <Users className="w-3 h-3" />
                Collaborators
              </div>
            </div>
          </div>
        </div>

        {/* Collaborators Management */}
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl border border-tertiary/50 shadow-lg overflow-hidden">
          <div className="bg-secondary p-6 border-b border-tertiary/50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Collaborators</h2>
                <Badge className="bg-purple-100 text-purple-800">
                  {projectSettings.shared_users.length + 1}
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
                Invite
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
                        {projectSettings.owner_email}
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
                <span className="text-gray-500 text-sm">Cannot modify</span>
              </div>
            </div>

            {/* Shared Users */}
            {projectSettings.shared_users.map((user) => {
              const sharedAccess = projectSettings.shared_list?.find(
                (s) => s.user === user.user_id
              );

              return (
                <div
                  key={user.id}
                  className="bg-primary/50 p-4 rounded-lg border border-tertiary/30 hover:border-tertiary/60 transition-all duration-200"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={user.avatar || "/pngs/default-avatar.png"}
                        alt={user.fullname}
                        className="w-10 h-10 rounded-full ring-2 ring-gray-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-white truncate">
                            {user.fullname}
                          </span>
                          <Badge
                            className={`${getRoleBadgeColor(
                              user.role
                            )} capitalize text-xs`}
                          >
                            {user.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Role Change Dropdown */}
                      <div className="mt-6">
                        <InputField
                          field="select"
                          label=""
                          options={[
                            { label: "Read", value: "read" },
                            { label: "Write", value: "write" },
                            { label: "Manage", value: "manage" },
                          ]}
                          value={user.role}
                          disabled={changingRole === sharedAccess?.id}
                          onChange={(e) => {
                            const newRole = e.target.value;
                            if (sharedAccess && newRole !== user.role) {
                              handleChangeRole(sharedAccess.id, newRole);
                            }
                          }}
                          className=""
                        />
                      </div>

                      <Button
                        onClick={() =>
                          setShowCollaboratorDeleteModal({
                            isOpen: true,
                            userId: user.user_id,
                          })
                        }
                        disabled={removingUser === user.id}
                        variant="destructive"
                        className="hover:bg-red-600 transition-all"
                      >
                        {removingUser === user.id ? (
                          "Removing..."
                        ) : (
                          <>
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {projectSettings.shared_users.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg">No collaborators yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Invite people to work on this project with you
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl border border-red-500/50 shadow-lg overflow-hidden">
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
            <div className="bg-primary/50 p-5 rounded-lg border border-tertiary/30">
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {projectSettings.is_archived ? (
                      <ArchiveRestore className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Archive className="w-5 h-5 text-orange-400" />
                    )}
                    <h3 className="font-semibold text-white">
                      {projectSettings.is_archived
                        ? "Restore Project"
                        : "Archive Project"}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    {projectSettings.is_archived
                      ? "Restore this project to your active projects list"
                      : "Hide this project from your active list. You can restore it anytime."}
                  </p>
                </div>
                <Button
                  onClick={() => handleArchiveProject(projectSettings.id)}
                  className={`shrink-0 shadow-lg hover:shadow-xl transition-all ${
                    projectSettings.is_archived
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  }`}
                >
                  {projectSettings.is_archived ? (
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
        onSuccess={handleDeleteProjectSuccess}
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
        projectId={projectId as string}
        initialTitle={projectSettings.title}
        initialDescription={projectSettings.description}
        initialVisibility={projectSettings.visibility}
        onSuccess={handleEditProjectSuccess}
      />
    </div>
  );
};

export default ProjectSettingsPage;
