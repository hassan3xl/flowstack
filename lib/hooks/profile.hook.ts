import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";
import { ProfilePType } from "../types/user.types";

export function useGetProfile() {
  return useQuery<ProfilePType>({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });
}
