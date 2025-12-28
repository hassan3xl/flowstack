import { apiService } from "../services/apiService";
import { ProfilePType } from "../types/user.types";

export const notificationApi = {
  getAllNotifications: async () => {
    const res: any = await apiService.get("/notifications/");
    return res;
  },
  getUnreadNotifications: async () => {
    const res: any = await apiService.get("/notifications/unread/");
    return res;
  },
  markNotificationAsRead: async (notificationId: string) => {
    const res: any = await apiService.get(
      `/notifications/${notificationId}/read`
    );
    return res;
  },
  deleteNotification: async (notificationId: string) => {
    const res: any = await apiService.delete(
      `/notifications/${notificationId}/`
    );
    return res;
  },
  markAllNotificationAsRead: async () => {
    const res: any = await apiService.post(`/notifications/mark-all-read/`);
    return res;
  },
};
