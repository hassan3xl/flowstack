"use client";

import Loader from "@/components/Loader";
import AddProjectCollaboratorModal from "@/components/modals/AddProjectCollaborator";
import AddTodoItemModal from "@/components/modals/AddProjectItemModal";
import DeleteProjectItem from "@/components/modals/DeleteProjectItem";
import EditProjectTaskModal from "@/components/modals/EditProjectTaskModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { apiService } from "@/services/apiService";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
useToast;
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  XCircle,
  Plus,
  Edit3,
  Trash2,
  Star,
  User,
} from "lucide-react";
import AddProjectItemModal from "@/components/modals/AddProjectItemModal";
import { useToast } from "@/components/providers/ToastProvider";

export type ProjectDetailType = {
  id: string;
  title: string;
  description: string;
  item_count: number;
  visibility: "private" | "public" | "shared";
  owner_email: string;
  created_at: string;
  shared_users: Array<{
    id: string;
    user_id: string;
    fullname: string;
    avatar: string;
    email: string;
    role: string;
  }>;
  project_items: Array<{
    id: string;
    completed_at?: string;
    started_by: {
      fullname: string;
      avatar: string;
    };
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string | null;
    is_important: boolean;
    created_at: string;
  }>;
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const router = useRouter();

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    itemId: "",
  });
  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    itemId: string;
    initialData: ProjectDetailType["project_items"][number] | null;
  }>({
    isOpen: false,
    itemId: "",
    initialData: null,
  });

  const [taskActionLoading, setTaskActionLoading] = useState<string | null>(
    null
  );

  const toast = useToast();

  const fetchProject = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get(`api/projects/${projectId}/`);
      setProject(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch project details";
      setError(errorMessage);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const handleDeleteSuccess = () => {
    fetchProject();
    toast.success("Task deleted successfully");
  };

  const handleEditSuccess = () => {
    fetchProject();
    toast.success("Task updated successfully");
  };

  const handleAddTaskSuccess = () => {
    fetchProject();
    toast.success("Task added successfully");
  };

  const openDeleteModal = (itemId: string) => {
    setDeleteModalState({ isOpen: true, itemId });
  };

  const closeDeleteModal = () => {
    setDeleteModalState({ isOpen: false, itemId: "" });
  };

  const openEditModal = (itemId: string) => {
    const itemToEdit = project?.project_items.find(
      (item) => item.id === itemId
    );
    if (itemToEdit) {
      setEditModalState({
        isOpen: true,
        itemId,
        initialData: itemToEdit,
      });
    }
  };

  const closeEditModal = () => {
    setEditModalState({ isOpen: false, itemId: "", initialData: null });
  };

  const gotoUserProfile = (id: string) => {
    router.push(`/users/${id}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in progress":
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVisibilityBadge = (visibility: string) => {
    const colors = {
      private: "bg-red-100 text-red-800",
      public: "bg-green-100 text-green-800",
      shared: "bg-blue-100 text-blue-800",
    };
    return (
      colors[visibility as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const updateTaskStatus = (
    taskId: string,
    newStatus: string,
    completedAt?: string | null
  ) => {
    if (!project) return;

    setProject((prevProject) => {
      if (!prevProject) return prevProject;

      return {
        ...prevProject,
        project_items: prevProject.project_items.map((item) =>
          item.id === taskId
            ? {
                ...item,
                status: newStatus,
                ...(completedAt && { completed_at: completedAt }),
              }
            : item
        ),
      };
    });
  };

  const handleStartTask = async (taskId: string) => {
    setTaskActionLoading(taskId);
    updateTaskStatus(taskId, "in progress");

    try {
      await apiService.post(`api/projects/${projectId}/tasks/${taskId}/start/`);
      fetchProject();
      toast.success("Task started successfully");
    } catch (err: any) {
      toast.error(err.detail);
    } finally {
      setTaskActionLoading(null);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    setTaskActionLoading(taskId);
    const completedAt = new Date().toISOString();
    updateTaskStatus(taskId, "completed", completedAt);

    try {
      const response = await apiService.post(
        `api/projects/${projectId}/tasks/${taskId}/complete/`
      );

      if (response && response.project_items) {
        setProject(response);
      }

      toast.success("Task completed successfully");
    } catch (err) {
      updateTaskStatus(taskId, "in progress");
      const errorMessage =
        err instanceof Error ? err.message : "Failed to complete task";
      toast.error(errorMessage);
    } finally {
      setTaskActionLoading(null);
    }
  };

  if (loading)
    return <Loader variant="ring" color="white" title="Loading project" />;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!project) return <p className="text-gray-500">Project not found.</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-tertiary/50">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{project.title}</h1>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Badge
              className={`${getVisibilityBadge(project.visibility)} capitalize`}
            >
              {project.visibility}
            </Badge>

            <User className="w-4 h-4" />
            <span>
              Admin:{" "}
              <span className="text-gray-200">{project.owner_email}</span>
            </span>
          </div>
          <div>
            {project.visibility === "shared" && (
              <div className="flex justify-between">
                <Badge
                  variant="outline"
                  className="text-blue-400 border-blue-400"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {project.shared_users?.length} collaborators
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              Created:{" "}
              <span className="text-gray-200">
                {formatDate(project.created_at)}
              </span>
            </span>
          </div>
        </div>

        {/* Collaborators Section */}
        {project.visibility === "shared" &&
          project.shared_users?.length > 0 && (
            <div className="mt-6 p-4 bg-primary/50 rounded-lg border border-tertiary/30">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Collaborators
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.shared_users.map((user) => (
                  <div
                    key={user.user_id}
                    onClick={() => gotoUserProfile(user.user_id)}
                    className="flex items-center gap-2 py-2 px-3 bg-secondary/60 hover:bg-secondary/80 
               transition-colors duration-200 rounded-lg border border-tertiary/30 
               cursor-pointer hover:scale-105 transform"
                  >
                    <img
                      src={user.avatar || "/pngs/default-avatar.png"}
                      alt={`${user.fullname}`}
                      className="w-7 h-7 rounded-full ring-2 ring-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      <p>Name: {user.fullname}</p>
                      <p>Role: {user.role}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Stats and Add Task */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-tertiary/30">
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-200 font-medium">
              {project.item_count} Total Tasks
            </span>
          </div>

          <Button onClick={() => setProjectModalOpen(true)} className="">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Tasks
        </h2>

        {project.project_items?.length > 0 ? (
          <div className="space-y-4">
            {project.project_items.map((item) => (
              <div
                key={item.id}
                className="bg-secondary/80 backdrop-blur-sm rounded-xl p-6 border border-tertiary/50 
                         shadow-lg hover:shadow-xl transition-all duration-300 hover:border-tertiary/70
                         group"
              >
                {/* Task Header - Improved Layout */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors flex-1 break-words">
                      {item.title}
                    </h3>

                    {/* Completed Badge - Moved to top right */}
                    {item.status === "completed" && (
                      <div className="flex items-center gap-2 text-accent bg-green-900/20 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {item?.completed_at
                            ? formatDate(item.completed_at)
                            : "Not completed"}{" "}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status and Priority Badges Row */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${getStatusColor(item.status)} text-xs`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </Badge>

                    {item.priority && (
                      <Badge
                        className={`${getPriorityColor(item.priority)} text-xs`}
                      >
                        Priority: {item.priority}
                      </Badge>
                    )}

                    {item.due_date && (
                      <Badge
                        variant="outline"
                        className="text-blue-400 border-blue-400 text-xs"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {formatDate(item.due_date)}
                      </Badge>
                    )}
                  </div>

                  {/* Started By - Separate Row */}
                  {item.started_by && item.status !== "pending" && (
                    <div className="flex items-center gap-2 text-sm text-gray-300 bg-primary/30 px-3 py-2 rounded-lg w-fit">
                      <User className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Started by:</span>
                      <span className="font-medium">
                        {item.started_by.fullname}
                      </span>
                    </div>
                  )}
                </div>

                {/* Task Description */}
                <p className="text-gray-300 mb-4 leading-relaxed break-words">
                  {item.description}
                </p>

                {/* Task Actions - Improved Responsive Layout */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => openEditModal(item.id)}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteModal(item.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  {item.status !== "completed" && (
                    <div className="flex flex-wrap gap-2">
                      {item.status !== "in_progress" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartTask(item.id)}
                          disabled={taskActionLoading === item.id}
                        >
                          {taskActionLoading === item.id ? (
                            "Starting..."
                          ) : (
                            <>
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Start Task
                            </>
                          )}
                        </Button>
                      )}

                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 transition-all"
                        onClick={() => handleCompleteTask(item.id)}
                        disabled={taskActionLoading === item.id}
                      >
                        {taskActionLoading === item.id ? (
                          "Completing..."
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark Complete
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-xl border border-tertiary/30">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No tasks found</p>
            <p className="text-gray-500 text-sm">
              Get started by adding your first task
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <DeleteProjectItem
        isOpen={deleteModalState.isOpen}
        onSuccess={handleDeleteSuccess}
        projectId={projectId as string}
        itemId={deleteModalState.itemId}
        onClose={closeDeleteModal}
      />

      <EditProjectTaskModal
        initialData={editModalState.initialData}
        isOpen={editModalState.isOpen}
        onSuccess={handleEditSuccess}
        projectId={projectId as string}
        itemId={editModalState.itemId}
        onClose={closeEditModal}
      />

      <AddProjectItemModal
        isOpen={isProjectModalOpen}
        onSuccess={handleAddTaskSuccess}
        projectId={projectId as string}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailPage;
