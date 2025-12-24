import { apiService } from "../services/apiService";

export const workspaceApi = {
  createWorkspace: async (serverData: any) => {
    const res = await apiService.post("/workspaces/", serverData);
    return res;
  },
  getWorkspaces: async () => {
    const res = await apiService.get("/workspaces/");
    return res;
  },

  getWorkspace: async (workspaceId: string) => {
    const res = await apiService.get(`/workspaces/${workspaceId}/`);
    return res;
  },

  updateWorkspace: async (workspaceId: string, workspaceData: any) => {
    const res = await apiService.patch(
      `/workspaces/${workspaceId}/`,
      workspaceData
    );
    return res;
  },

  deleteWorkspace: async (workspaceId: string) => {
    const res = await apiService.delete(`/workspaces/${workspaceId}/`);
    return res;
  },
  getWorkspaceInvitations: async () => {
    const res = await apiService.get(`/workspaces/invitations/`);
    return res;
  },

  uploadWorkspaceIcon: async (workspaceId: string, formData: FormData) => {
    return apiService.patch(`/workspaces/${workspaceId}/logo/`, formData);
  },

  updateWorkspaceMemberRole: async (
    workspaceId: string,
    userId: string,
    data: any
  ) => {
    return apiService.post(
      `/workspaces/${workspaceId}/${userId}/member-role/`,
      data
    );
  },
  inviteUserToWorkspace: async (inviteData: string, workspaceId: string) => {
    return apiService.post(`/workspaces/${workspaceId}/invite/`, inviteData);
  },

  kickUserFromWorkspace: async (workspaceId: string, userId: string) => {
    return apiService.delete(
      `/workspaces/${workspaceId}/members/${userId}/remove/`
    );
  },

  acceptWorkspaceInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(
        `/workspaces/invites/${inviteId}/accept/`
      );
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  rejectWorkspaceInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(
        `/workspaces/invites/${inviteId}/reject/`
      );
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  getWorkspaceMembers: async (workspaceId: string) => {
    const res = await apiService.get(`/workspaces/${workspaceId}/members/`);
    return res;
  },
};
