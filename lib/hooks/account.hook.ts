import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApi } from "../api/account.api";
import { toast } from "sonner";

export const useGetAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: () => accountApi.getAccount(),
  });
};
// src/lib/hooks/account.hook.ts (or wherever this file is)

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const data = await accountApi.getProfile();
        return data;
      } catch (error: any) {
        // If the error is 401 (Unauthorized) or 403, it just means
        // the user isn't logged in. Return null so the app knows
        // "No User" instead of "App Error".
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return null;
        }
        // If it's a different error (like 500 server error), re-throw it
        throw error;
      }
    },
    // CRITICAL: Disable retries for this specific query.
    // If the user isn't logged in, retrying 3 times won't magically log them in.
    retry: false,
    // Optional: Prevent refetching when window gains focus if user is missing
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => accountApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
  });
};

export const useUploaadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => accountApi.uploadAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Avatar uploaded successfully!");
    },
  });
};
