import { apiService } from "../services/apiService";
import { ProfilePType } from "../types/user.types";

export const notificationApi = {
  getAllNotifications: async () => {
    const res: any = await apiService.get("/notifications/");
    return res;
  },
};
