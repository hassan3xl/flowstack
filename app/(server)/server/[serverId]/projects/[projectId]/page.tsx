"use client";

import Loader from "@/components/Loader";
import EditProjectTaskModal from "@/components/modals/EditProjectTaskModal";
import { Button } from "@/components/ui/button";
import { formatDate, getStatusColor, getPriorityColor } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  User,
  Flag,
  MessageCircle,
} from "lucide-react";
import AddProjectItemModal from "@/components/modals/AddProjectItemModal";
import { toast } from "sonner";
import CommentComponent from "@/components/projects/CommentComponent";
import {
  useAddProjectItem,
  useCompleteTask,
  useDeleteProjectItem,
  useGetProject,
  useStartTask,
} from "@/lib/hooks/project.hook";
import { useServer } from "@/contexts/ServerContext";
import { ProjectType } from "@/lib/types/project.types";
import BaseModal from "@/components/modals/BaseModal";

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

const ProjectDetailPage = () => {
  const params = useParams();
  const { projectId } = params;
  const { serverId } = useServer();

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);

  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    itemId: string;
    initialData: ProjectType["project_items"][number] | null;
  }>({
    isOpen: false,
    itemId: "",
    initialData: null,
  });

  // hooks
  const {
    data: project,
    isLoading: loading,
    isError: error,
  } = useGetProject(serverId, projectId as string);

  const {
    mutateAsync: completeTask,
    isPending: completingTask,
    isError: completeError,
  } = useCompleteTask();

  const {
    mutateAsync: startTask,
    isPending: startingTask,
    isError: startError,
  } = useStartTask();

  const {
    mutateAsync: deleteItem,
    isPending: deletingItem,
    isError: deleteError,
  } = useDeleteProjectItem();

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

  const handleStartTask = async (
    taskId: string,
    projectId: string,
    serverId: string
  ) => {
    try {
      await startTask({ serverId: serverId, projectId: projectId, taskId });
      toast.success("Task started successfully");
    } catch (err) {}
  };

  const handleCompleteTask = async (
    taskId: string,
    projectId: string,
    serverId: string
  ) => {
    try {
      await completeTask({ serverId, projectId, taskId });
      toast.success("Task completed successfully");
    } catch (err) {}
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!itemId) return;

    try {
      await deleteItem({
        serverId: serverId as string,
        projectId: projectId as string,
        itemId,
      });

      toast.success("Task deleted successfully");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading)
    return <Loader variant="ring" color="white" title="Loading project" />;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!project) return <p className="text-gray-500">Project not found.</p>;

  return (
    <div className="">
      {/* Project Header */}
      <div className="bg-card p-4 sm:p-6 mb-4 rounded-xl shadow-lg border border-border">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-md sm:text-2xl font-bold text-primary">
                {project.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
        <div></div>

        <div className="flex flex-col gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="flex gap-2">
              Created at:{" "}
              <span className="text-gray-200">
                {formatDate(project.created_at)}
              </span>
              <span className="text-gray-200">By: {project.created_by}</span>
            </span>
          </div>
        </div>

        {/* Collaborators Section */}
        {project.visibility === "shared" &&
          project.collaborators?.length > 0 && (
            <div className="mt-6 px-2 py-4 sm:p-4 bg-primary/50 rounded-lg border border-tertiary/30">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Collaborators
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {project.collaborators.map((user) => (
                  <div
                    key={user.user.id}
                    className="flex items-center gap-2 p-2 bg-tertiary hover:bg-secondary rounded-lg border border-tertiary/30 cursor-pointer hover:scale-105 transform"
                  >
                    <img
                      src={user.user.avatar || "/pngs/default-avatar.png"}
                      alt={`${user.user.username}`}
                      className="w-7 h-7 rounded-full ring-2 ring-gray-600"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      <p>{user.user.username}</p>
                      {/* <p className="text-xs">Role: {user.role}</p> */}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Tasks List */}
      <div className="rounded-lg">
        <div className="mx-auto space-y-6">
          {/* Section Header */}
          <div className="flex bg-card p-4 rounded-md items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <span className="text-xl mt-1 text-gray-400">
                {project.project_items.length} task
                {project.project_items.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex gap-2 ml-auto">
              <div>
                <Button onClick={() => setProjectModalOpen(true)} className="">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </div>
          {project.project_items?.length > 0 ? (
            <div className="space-y-4">
              {project.project_items.map((item) => (
                <div key={item.id} className="space-y-4">
                  <div className="bg-card rounded-2xl border border-border shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className="px-2 py-4 sm:px-6">
                      {/* Top Row: Status & Priority Badges */}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {getStatusIcon(item.status)}
                          <span className="capitalize">
                            {item.status.replace("_", " ")}
                          </span>
                        </span>

                        {item.priority && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                              item.priority
                            )}`}
                          >
                            <Flag className="w-3 h-3" />
                            <span className="capitalize">{item.priority}</span>
                          </span>
                        )}

                        {item.due_date && (
                          <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/30">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.due_date)}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Meta Information Row */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700/50">
                        {item.started_by && item.status !== "pending" && (
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <User className="w-4 h-4 text-gray-500" />
                            <span>
                              Started by{" "}
                              <span className="text-white font-medium">
                                {item.started_by}
                              </span>
                            </span>
                          </div>
                        )}

                        {item.status === "completed" && item.completed_at && (
                          <div className="flex items-center gap-2 text-sm text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{formatDate(item.completed_at)}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Button
                            onClick={() => openEditModal(item.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600/50 hover:border-slate-500 transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>

                          <Button
                            onClick={() => setDeleteTarget(item.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>

                          <Button
                            onClick={() =>
                              setOpenCommentId(
                                openCommentId === item.id ? null : item.id
                              )
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:border-purple-500/50 transition-all"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {item.comments.length || 0}
                          </Button>
                        </div>

                        {item.status !== "completed" && (
                          <div className="flex items-center gap-2">
                            {item.status !== "in_progress" && (
                              <Button
                                onClick={() =>
                                  handleStartTask(
                                    item.id,
                                    projectId as string,
                                    serverId as string
                                  )
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:border-blue-500/50 transition-all disabled:opacity-50"
                              >
                                {startingTask ? "Starting..." : "Start Task"}
                              </Button>
                            )}
                            {item.status === "in_progress" && (
                              <Button
                                onClick={() =>
                                  handleCompleteTask(
                                    item.id,
                                    projectId as string,
                                    serverId as string
                                  )
                                }
                                disabled={completingTask}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all disabled:opacity-50"
                              >
                                {completingTask
                                  ? "Completing..."
                                  : "Mark Complete"}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Comment Input Section */}
                  <CommentComponent
                    itemId={item.id as string}
                    isOpen={openCommentId === item.id}
                    serverId={serverId}
                    projectId={projectId as string}
                    onClose={() => setOpenCommentId(null)}
                    comments={item.comments}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/30 mb-4">
                <AlertCircle className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-300 text-lg font-medium mb-2">
                No tasks found
              </p>
              <p className="text-gray-500 text-sm">
                Get started by adding your first task
              </p>
            </div>
          )}
        </div>
        <AlertDialog
          open={!!deleteTarget}
          onOpenChange={() => setDeleteTarget(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this task?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteTarget(null)}>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={() => deleteTarget && handleDeleteItem(deleteTarget)}
                disabled={deletingItem}
              >
                {deletingItem ? "Deleting..." : "Delete Task"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <EditProjectTaskModal
        initialData={editModalState.initialData}
        isOpen={editModalState.isOpen}
        itemId={editModalState.itemId}
        projectId={projectId as string}
        serverId={serverId as string}
        onClose={closeEditModal}
      />

      <AddProjectItemModal
        isOpen={isProjectModalOpen}
        projectId={projectId as string}
        serverId={serverId as string}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailPage;
