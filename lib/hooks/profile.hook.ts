import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../types/usert.ypes";
import { profileApi } from "../api/profile.api";

export function useGetProfile() {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });
}
