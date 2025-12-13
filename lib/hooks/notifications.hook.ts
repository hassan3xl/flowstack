import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notificationApi } from "../api/notification.api";

export const useGetnotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationApi.getAllNotifications(),
  });
};
