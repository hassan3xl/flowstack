import { apiService } from "../services/apiService";

export const serverApi = {
  createServer: async (serverData: any) => {
    const res = await apiService.post("/servers/", serverData);
    return res;
  },
  getServers: async () => {
    const res = await apiService.get("/servers/");
    return res;
  },
  getPublicServers: async () => {
    const res = await apiService.get("/servers/public_servers/");
    return res;
  },
  getServerInvites: async () => {
    try {
      const res = await apiService.get("/servers/invites/received/");
      return res;
      console.log("res", res);
    } catch (error) {
      console.error("Error fetching server invites:", error);
      throw error;
    }
  },
  inviteUserToServer: async (inviteData: string, serverId: string) => {
    return apiService.post(`/servers/${serverId}/invite/`, inviteData);
  },

  acceptServerInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(`/servers/invites/${inviteId}/accept/`);
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  rejectServerInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(`/servers/invites/${inviteId}/reject/`);
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  getServer: async (serverId: string) => {
    try {
      const res = await apiService.get(`/servers/${serverId}/`);
      return res;
    } catch (error) {
      console.error("Error fetching servers:", error);
      throw error;
    }
  },
  getServerMembers: async (serverId: string) => {
    const res = await apiService.get(`/servers/${serverId}/members/`);
    return res;
  },
};
