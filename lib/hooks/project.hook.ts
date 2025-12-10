import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { ProjectType } from "../types/project.types";
import { apiService } from "../services/apiService";

export function useGetProjects(serverId: string) {
  return useQuery<ProjectType[]>({
    queryKey: ["projects"],
    queryFn: () => projectApi.getProjects(serverId),
  });
}

export function useGetProject(serverId: string, projectId: string) {
  return useQuery<ProjectType>({
    queryKey: ["project", projectId],
    queryFn: () => projectApi.getProject(serverId, projectId),
    enabled: !!projectId,
  });
}

export const useAddproject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
    }: {
      projectData: any;
      serverId: string;
    }) => projectApi.addProject(projectData, serverId),

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
      serverId,
      projectId,
    }: {
      projectData: any;
      serverId: string;
      projectId: string;
    }) => projectApi.updateProject(projectData, serverId, projectId),

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
      serverId,
      projectId,
    }: {
      collabData: any;
      serverId: string;
      projectId: string;
    }) => projectApi.addProjectCollab(collabData, serverId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export function useAddProjectItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
      projectId,
    }: {
      projectData: any;
      serverId: string;
      projectId: string;
    }) => projectApi.addProjectItem(projectData, serverId, projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}
export function useUpdateProjectItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectData,
      serverId,
      projectId,
      itemId,
    }: {
      projectData: any;
      serverId: string;
      projectId: string;
      itemId: string;
    }) =>
      projectApi.updateProjectItem(projectData, serverId, projectId, itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

export const useDeleteProjectItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      serverId,
      projectId,
      itemId,
    }: {
      serverId: string;
      projectId: string;
      itemId: string;
    }) => projectApi.deleteProjectItem(serverId, projectId, itemId),

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
      serverId,
      projectId,
      taskId,
    }: {
      serverId: string;
      projectId: string;
      taskId: string;
    }) => projectApi.startTask(serverId, projectId, taskId),

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
      serverId,
      projectId,
      taskId,
    }: {
      serverId: string;
      projectId: string;
      taskId: string;
    }) => projectApi.completeTask(serverId, projectId, taskId),

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
      serverId,
      projectId,
      itemId,
      commentData,
    }: {
      serverId: string;
      projectId: string;
      itemId: string;
      commentData: any;
    }) => projectApi.commentTask(serverId, projectId, itemId, commentData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
};
