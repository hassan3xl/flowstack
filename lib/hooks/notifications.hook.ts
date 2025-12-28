import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationApi } from "../api/notification.api";

export const useGetnotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationApi.getAllNotifications(),
  });
};

export const markAllNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationApi.markAllNotificationAsRead(),
    onSuccess: () => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

export const markNotificationAsRead = (notificationId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationApi.markNotificationAsRead(notificationId),
    onSuccess: () => {
      toast.success("Notification marked as read");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
