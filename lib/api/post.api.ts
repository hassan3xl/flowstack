import { apiService } from "../services/apiService";

export const postApi = {
  getHomePosts: async () => {
    const res = await apiService.get("/posts/home/");
    return res;
  },

  getCommunityPosts: async (communityId: string) => {
    const res = await apiService.get(`/posts/communities/${communityId}/`);
    return res;
  },

  createPost: async (communityId: string, data: { content: string }) => {
    const res = await apiService.post(
      `/posts/community/${communityId}/create/`,
      data
    );
    return res;
  },

  deletePost: async (feedId: string) => {
    const res = await apiService.delete(`/posts/${feedId}/`);
    return res;
  },
};
