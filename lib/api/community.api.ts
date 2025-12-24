import { apiService } from "../services/apiService";

export const communityApi = {
  createCommunity: async (data: any) => {
    const res = await apiService.post("/communities/", data);
    return res;
  },
  getCommunities: async () => {
    const res = await apiService.get("/communities/");
    return res;
  },
  getCommunity: async (communityId: string) => {
    const res = await apiService.get(`/communities/${communityId}/`);
    return res;
  },
  getCommunityMembers: async (communityId: string) => {
    const res = await apiService.get(`/communities/${communityId}/members/`);
    return res;
  },

  getPublicCommunities: async () => {
    const res = await apiService.get("/communities/public_communities/");
    return res;
  },

  getCommunityCategories: async () => {
    const res = await apiService.get("/communities/categories/");
    return res;
  },
  joinCommunity: async (inviteCode: string) => {
    const res = await apiService.post("/communities/join/", {
      invite_code: inviteCode,
    });
    return res.data;
  },

  getCommunityInviteCode: async (InviteCode: string) => {
    const res = await apiService.get(`/communities/invites/${InviteCode}/`);
    return res;
  },

  uploadCommunityIcon: async (communityId: string, formData: FormData) => {
    return apiService.patch(`/communities/${communityId}/icon/`, formData);
  },

  updateCommunityMemberRole: async (
    communityId: string,
    userId: string,
    data: any
  ) => {
    return apiService.post(`/communities/${communityId}/${userId}/role/`, data);
  },
  inviteUserToCommunity: async (inviteData: string, communityId: string) => {
    return apiService.post(`/communities/${communityId}/invite/`, inviteData);
  },

  acceptCommunityInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(
        `/communities/invites/${inviteId}/accept/`
      );
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },

  rejectCommunityInvites: async (inviteId: string) => {
    try {
      const res = await apiService.post(
        `/communities/invites/${inviteId}/reject/`
      );
      return res;
    } catch (error) {
      console.error("Error accepting server invites:", error);
      throw error;
    }
  },
};
