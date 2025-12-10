import { apiService } from "../services/apiService";

export const projectApi = {
  // projects
  getProjects: async (serverId: string) => {
    try {
      const res = await apiService.get(`/servers/${serverId}/projects/`);
      return res;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  getProject: async (serverId: string, projectId: string) => {
    try {
      const res = await apiService.get(
        `/servers/${serverId}/projects/${projectId}/`
      );
      return res;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  addProject: async (projectData: any, serverId: string) => {
    try {
      const res = await apiService.post(
        `/servers/${serverId}/projects/`,
        projectData
      );
      return res;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },
  updateProject: async (
    projectData: any,
    serverId: string,
    projectId: string
  ) => {
    try {
      const res = await apiService.patch(
        `/servers/${serverId}/projects/${projectId}/`,
        projectData
      );
      return res;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  addProjectCollab: async (
    collabData: any,
    serverId: string,
    projectId: string
  ) => {
    const res = await apiService.post(
      `/servers/${serverId}/projects/${projectId}/add-collab/`,
      collabData
    );
    return res;
  },

  removeProjectCollab: async (
    collabData: any,
    serverId: string,
    projectId: string
  ) => {
    const res = await apiService.post(
      `/servers/${serverId}/projects/${projectId}/remove-collab/`,
      collabData
    );
    return res;
  },

  // tasks/items
  addProjectItem: async (
    projectData: any,
    serverId: string,
    projectId: string
  ) => {
    try {
      const res = await apiService.post(
        `/servers/${serverId}/projects/${projectId}/items/`,
        projectData
      );
      return res;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  updateProjectItem: async (
    projectData: any,
    serverId: string,
    projectId: string,
    itemId: string
  ) => {
    try {
      const res = await apiService.patch(
        `/servers/${serverId}/projects/${projectId}/items/${itemId}/`,
        projectData
      );
      return res;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  deleteProjectItem: async (
    serverId: string,
    projectId: string,
    itemId: string
  ) =>
    apiService.delete(
      `/servers/${serverId}/projects/${projectId}/items/${itemId}/`
    ),

  startTask: async (serverId: string, projectId: string, itemId: string) => {
    const res = await apiService.post(
      `/servers/${serverId}/projects/${projectId}/items/${itemId}/start/`
    );
    return res;
  },

  completeTask: async (serverId: string, projectId: string, itemId: string) => {
    const res = await apiService.post(
      `/servers/${serverId}/projects/${projectId}/items/${itemId}/complete/`
    );
    return res;
  },

  commentTask: async (
    serverId: string,
    projectId: string,
    itemId: string,
    commentData: any
  ) => {
    const res = await apiService.post(
      `/servers/${serverId}/projects/${projectId}/items/${itemId}/comment/`,
      commentData
    );
    return res;
  },
};
