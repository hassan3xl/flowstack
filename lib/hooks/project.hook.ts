import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
workspaceApi;
import { ProjectType } from "../types/project.types";
import { apiService } from "../services/apiService";
import { workspaceApi } from "../api/workspace.api";
import { toast } from "sonner";

export function useGetProjects(workspaceId: string) {
  return useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: () => projectApi.getProjects(workspaceId),
  });
}

export function useGetProject(workspaceId: string, projectId: string) {
  return useQuery<ProjectType>({
    queryKey: ["project", projectId],
    queryFn: () => projectApi.getProject(workspaceId, projectId),
    enabled: !!projectId,
  });
}

export const useAddproject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      workspaceId,
    }: {
      projectData: any;
      workspaceId: string;
    }) => projectApi.addProject(projectData, workspaceId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateproject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      workspaceId,
      projectId,
    }: {
      projectData: any;
      workspaceId: string;
      projectId: string;
    }) => projectApi.updateProject(projectData, workspaceId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export function useAddProjectCollab() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collabData,
      workspaceId,
      projectId,
    }: {
      collabData: any;
      workspaceId: string;
      projectId: string;
    }) => projectApi.addProjectMember(collabData, workspaceId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      workspaceId,
      projectId,
    }: {
      projectData: any;
      workspaceId: string;
      projectId: string;
    }) => projectApi.addTask(projectData, workspaceId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Task created successfully");
    },
  });
}
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      workspaceId,
      projectId,
      itemId,
    }: {
      projectData: any;
      workspaceId: string;
      projectId: string;
      itemId: string;
    }) => projectApi.updateTask(projectData, workspaceId, projectId, itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      projectId,
      itemId,
    }: {
      workspaceId: string;
      projectId: string;
      itemId: string;
    }) => projectApi.deleteTask(workspaceId, projectId, itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      projectId,
      taskId,
    }: {
      workspaceId: string;
      projectId: string;
      taskId: string;
    }) => projectApi.startTask(workspaceId, projectId, taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      projectId,
      taskId,
    }: {
      workspaceId: string;
      projectId: string;
      taskId: string;
    }) => projectApi.completeTask(workspaceId, projectId, taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};

export const useCommentTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      projectId,
      itemId,
      commentData,
    }: {
      workspaceId: string;
      projectId: string;
      itemId: string;
      commentData: any;
    }) => projectApi.commentTask(workspaceId, projectId, itemId, commentData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Comment added successfully");
    },
  });
};
