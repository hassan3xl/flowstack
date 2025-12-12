import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApi } from "../api/account.api";

export const useGetAccount = () => {
  return useQuery({
    queryKey: ["account"],
    queryFn: () => accountApi.getAccount(),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => accountApi.getProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => accountApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUploaadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => accountApi.uploadAvatar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
