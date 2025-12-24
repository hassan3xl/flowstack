"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  CheckCircle2,
  PlayCircle,
  Plus,
  Edit3,
  Trash2,
  User,
  Flag,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ListTodo,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
import Loader from "@/components/Loader";

// Modals & Components
import CommentComponent from "@/components/workspace/task/CommentComponent";

// Hooks & Context
import {
  useAddTask,
  useCompleteTask,
  useDeleteTask,
  useGetProject,
  useStartTask,
} from "@/lib/hooks/project.hook";
import { ProjectType } from "@/lib/types/project.types";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import AddTaskModal from "@/components/workspace/task/AddTaskModal";
import EditTaskModal from "@/components/workspace/task/EditTaskModal";

const ProjectDetailPage = () => {
  const params = useParams();
  const { projectId } = params;
  const { workspaceId } = useWorkspace();

  // Local State
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const [editModalState, setEditModalState] = useState<{
    isOpen: boolean;
    itemId: string;
    initialData: ProjectType["tasks"][number] | null;
  }>({
    isOpen: false,
    itemId: "",
    initialData: null,
  });

  // API Hooks
  const {
    data: project,
    isLoading: loading,
    isError: error,
  } = useGetProject(workspaceId, projectId as string);
  const { mutateAsync: completeTask, isPending: completingTask } =
    useCompleteTask();
  const { mutateAsync: startTask, isPending: startingTask } = useStartTask();
  const { mutateAsync: deleteItem, isPending: deletingItem } = useDeleteTask();
  console.log("project", project);

  // Handlers
  const openEditModal = (itemId: string) => {
    const itemToEdit = project?.tasks.find((item) => item.id === itemId);
    if (itemToEdit)
      setEditModalState({ isOpen: true, itemId, initialData: itemToEdit });
  };

  const toggleExpand = (id: string) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleStartTask = async (taskId: string) => {
    try {
      await startTask({
        workspaceId: workspaceId as string,
        projectId: projectId as string,
        taskId,
      });
      toast.success("Task started");
    } catch (err) {
      toast.error("Failed to start task");
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask({
        workspaceId: workspaceId as string,
        projectId: projectId as string,
        taskId,
      });
      toast.success("Task completed");
    } catch (err) {
      toast.error("Failed to complete task");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteItem({
        workspaceId: workspaceId as string,
        projectId: projectId as string,
        itemId,
      });
      toast.success("Task deleted");
    } finally {
      setDeleteTarget(null);
    }
  };

  // Helper Functions
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "in_progress":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "pending":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "cancelled":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  if (loading)
    return (
      <Loader variant="ring" color="white" title="Loading project details..." />
    );
  if (error || !project)
    return (
      <div className="p-8 text-center text-red-400">Error loading project.</div>
    );

  // Derived Stats
  const total = project.tasks.length;
  const completed = project.tasks.filter(
    (i) => i.status === "completed"
  ).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* --- HEADER SECTION --- */}
      <div className="relative overflow-hidden bg-card rounded-2xl border border-border shadow-2xl">
        {/* Background Gradient Mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  {project.title}
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* mebmers Stack */}
              <div className="flex items-center gap-4 pt-2">
                {project.collaborators?.length > 0 && (
                  <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                    {project.collaborators.slice(0, 5).map((c) => (
                      <Avatar
                        key={c.user.id}
                        className="border-2 border-background ring-2 ring-border/50 w-8 h-8 cursor-pointer"
                      >
                        <AvatarImage src={c.user.avatar} />
                        <AvatarFallback>{c.user.username[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.collaborators.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold border-2 border-background z-10">
                        +{project.collaborators.length - 5}
                      </div>
                    )}
                  </div>
                )}
                <div className="h-4 w-px bg-border mx-2"></div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Created{" "}
                    {format(new Date(project.created_at), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-2 gap-3 min-w-[300px]">
              <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-bold text-blue-500">
                  {percentage}%
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Complete
                </span>
              </div>
              <div className="bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/50 flex flex-col justify-center items-center text-center">
                <span className="text-3xl font-bold text-foreground">
                  {total}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Total Tasks
                </span>
              </div>
              <Button
                onClick={() => setProjectModalOpen(true)}
                className="col-span-2 h-12 text-md shadow-lg shadow-blue-500/20"
              >
                <Plus className="w-5 h-5 mr-2" /> Add New Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- TASKS SECTION --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-blue-500" />
            Project Tasks
          </h2>
          {/* Add Filter/Sort Controls Here if needed */}
        </div>

        {project.tasks.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 bg-card/30 rounded-2xl border border-dashed border-border">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <ListTodo className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm text-muted-foreground mb-6">
              Create a task to get things moving.
            </p>
            <Button variant="outline" onClick={() => setProjectModalOpen(true)}>
              Create Task
            </Button>
          </div>
        ) : (
          <div className="grid gap-3">
            {project.tasks.map((item) => (
              <div
                key={item.id}
                className={`
                  group bg-card hover:bg-accent/30 transition-all duration-200 
                  rounded-lg border border-border overflow-hidden
                  ${getPriorityBorder(item.priority)} border-l-4
                `}
              >
                {/* --- Task Row (Always Visible) --- */}
                <div
                  className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  {/* Status Icon */}
                  <div className="mt-1 sm:mt-0">
                    {item.status === "completed" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : item.status === "in_progress" ? (
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Title & Mobile Meta */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-sm sm:text-base truncate ${
                        item.status === "completed"
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span
                        className={`px-1.5 py-0.5 rounded-md border ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                      {item.due_date && (
                        <span className="flex items-center gap-1">
                          • Due {format(new Date(item.due_date), "MMM d")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desktop Meta & Expand Icon */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Priority Badge */}
                    {item.priority && (
                      <Badge
                        variant="outline"
                        className="text-[10px] h-5 uppercase tracking-wide"
                      >
                        {item.priority}
                      </Badge>
                    )}

                    {/* Comment Count */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{item.comments?.length || 0}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                    >
                      {expandedTaskId === item.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* --- Expanded Details Section --- */}
                {expandedTaskId === item.id && (
                  <div className="bg-muted/30 border-t border-border p-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Left: Description & Meta */}
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Description
                          </h4>
                          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                            {item.description || "No description provided."}
                          </p>
                        </div>

                        {item.started_by && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card p-2 rounded-md border inline-block">
                            <User className="w-3 h-3" /> Started by{" "}
                            <span className="text-foreground font-medium">
                              {item.started_by}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Actions
                        </h4>

                        {item.status !== "completed" && (
                          <>
                            {item.status !== "in_progress" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="justify-start border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                                onClick={() => handleStartTask(item.id)}
                                disabled={startingTask}
                              >
                                <PlayCircle className="w-4 h-4 mr-2" /> Start
                                Task
                              </Button>
                            )}
                            {item.status === "in_progress" && (
                              <Button
                                size="sm"
                                className="justify-start bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleCompleteTask(item.id)}
                                disabled={completingTask}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Mark
                                Complete
                              </Button>
                            )}
                          </>
                        )}

                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => openEditModal(item.id)}
                          >
                            <Edit3 className="w-4 h-4 mr-2" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                            onClick={() => setDeleteTarget(item.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Comments Section integrated in expand */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <CommentComponent
                        itemId={item.id}
                        isOpen={true}
                        workspaceId={workspaceId}
                        projectId={projectId as string}
                        comments={item.comments}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODALS --- */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && handleDeleteItem(deleteTarget)}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingItem ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditTaskModal
        initialData={editModalState.initialData}
        isOpen={editModalState.isOpen}
        itemId={editModalState.itemId}
        projectId={projectId as string}
        workspaceId={workspaceId as string}
        onClose={() => setEditModalState({ ...editModalState, isOpen: false })}
      />

      <AddTaskModal
        isOpen={isProjectModalOpen}
        projectId={projectId as string}
        workspaceId={workspaceId as string}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
};

export default ProjectDetailPage;
