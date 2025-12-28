import { apiService } from "../services/apiService";

export const profileApi = {
  getProfile: async () => {
    const res = await apiService.get("/profile/");
    console.log("profile details", res);
    return res;
  },
};
