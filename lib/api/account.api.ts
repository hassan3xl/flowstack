import { apiService } from "../services/apiService";
import { ProfilePType } from "../types/user.types";

export const accountApi = {
  getAccount: async () => {
    const res: any = await apiService.get("/user/account/");
    return res;
  },
  getProfile: async () => {
    const res: ProfilePType = await apiService.get("/user/profile/");
    return res;
  },
  updateProfile: async (data: any) => {
    const res = await apiService.patch("/user/profile/", data);
    return res;
  },
  uploadAvatar: async (formData: FormData) => {
    const res = await apiService.patch("/user/profile/avatar/", formData);
    return res;
  },
};
