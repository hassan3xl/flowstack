import { apiService } from "../services/apiService";

export const profileApi = {
  getProfile: async () => {
    try {
      const res = await apiService.get("/profile/");
      console.log("profile details", res);
      return res;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },
};
