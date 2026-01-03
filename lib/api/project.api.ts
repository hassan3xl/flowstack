import { get } from "http";
import { apiService } from "../services/apiService";

export const projectApi = {
  // projects
  getProjects: async (workspaceId: string) => {
    const res = await apiService.get(`/workspaces/${workspaceId}/projects/`);
    return res;
  },

  getProject: async (workspaceId: string, projectId: string) => {
    const res = await apiService.get(
      `/workspaces/${workspaceId}/projects/${projectId}/`
    );
    return res;
  },

  addProject: async (projectData: any, workspaceId: string) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/`,
      projectData
    );
    return res;
  },
  updateProject: async (
    projectData: any,
    workspaceId: string,
    projectId: string
  ) => {
    const res = await apiService.patch(
      `/workspaces/${workspaceId}/projects/${projectId}/`,
      projectData
    );
    return res;
  },

  deleteProject: async (workspaceId: string, projectId: string) => {
    const res = await apiService.delete(
      `/workspaces/${workspaceId}/projects/${projectId}/`
    );
    return res;
  },

  addProjectMember: async (
    collabData: any,
    workspaceId: string,
    projectId: string
  ) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/${projectId}/collaborators/`,
      collabData
    );
    return res;
  },

  getProjectMembers: async (workspaceId: string, projectId: string) => {
    const res = await apiService.get(
      `/workspaces/${workspaceId}/projects/${projectId}/collaborators/`
    );
    return res;
  },
  removeProjectMember: async (
    collabData: any,
    workspaceId: string,
    projectId: string
  ) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/${projectId}/collaborators/`,
      collabData
    );
    return res;
  },

  // tasks/items
  addTask: async (projectData: any, workspaceId: string, projectId: string) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/`,
      projectData
    );
    return res;
  },

  updateTask: async (
    projectData: any,
    workspaceId: string,
    projectId: string,
    itemId: string
  ) => {
    const res = await apiService.patch(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${itemId}/`,
      projectData
    );
    return res;
  },

  deleteTask: async (workspaceId: string, projectId: string, itemId: string) =>
    apiService.delete(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${itemId}/`
    ),

  startTask: async (workspaceId: string, projectId: string, itemId: string) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${itemId}/start/`
    );
    return res;
  },

  completeTask: async (
    workspaceId: string,
    projectId: string,
    itemId: string
  ) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${itemId}/complete/`
    );
    return res;
  },

  commentTask: async (
    workspaceId: string,
    projectId: string,
    itemId: string,
    commentData: any
  ) => {
    const res = await apiService.post(
      `/workspaces/${workspaceId}/projects/${projectId}/tasks/${itemId}/comment/`,
      commentData
    );
    return res;
  },
};
