import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { communityApi } from "../api/community.api";

export function useGetCommunities() {
  return useQuery({
    queryKey: ["communities"],
    queryFn: () => communityApi.getCommunities(),
  });
}

export function useGetPublicCommuities() {
  return useQuery({
    queryKey: ["public-communities"],
    queryFn: () => communityApi.getPublicCommunities(),
  });
}

export function useGetCommuitiesCateories() {
  return useQuery({
    queryKey: ["community-categories"],
    queryFn: () => communityApi.getCommunityCategories(),
  });
}
export function joinCommunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteCode: string) => communityApi.joinCommunity(inviteCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["community-codes"] });
      queryClient.invalidateQueries({ queryKey: ["community-invites"] });
      toast.success("Joined community successfully");
    },
  });
}

export function useGetCommuityInviteCode(inviteCode: string) {
  return useQuery({
    queryKey: ["invite-codes"],
    queryFn: () => communityApi.getCommunityInviteCode(inviteCode),
  });
}

// GET A SINGLE community
export function useGetCommuity(communityId: string) {
  return useQuery({
    queryKey: ["community", communityId],
    queryFn: () => communityApi.getCommunity(communityId),
    enabled: !!communityId,
  });
}

// GET A SINGLE community MEMBERS
export function useGetCommuityMembers(communityId: string) {
  return useQuery({
    queryKey: ["community-members", communityId],
    queryFn: () => communityApi.getCommunityMembers(communityId),
    enabled: !!communityId,
  });
}

export const useUploadCommuityImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      communityId,
      formData,
    }: {
      communityId: string;
      formData: FormData;
    }) => communityApi.uploadCommunityIcon(communityId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["community"] });
      toast.success("Icon uploaded successfully!");
    },
  });
};

interface UpdateRolePayload {
  communityId: string;
  userId: string;
  data: any;
}

export const useUpdateCommuityMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ communityId, userId, data }: UpdateRolePayload) => {
      return await communityApi.updateCommunityMemberRole(
        communityId,
        userId,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityMembers"] });
      queryClient.invalidateQueries({ queryKey: ["community"] });
      queryClient.invalidateQueries({ queryKey: ["communities"] });

      toast.success("Role updated successfully");
    },
  });
};

export const useAcceptCommuityInvites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) =>
      communityApi.acceptCommunityInvites(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["community-invites"] });
    },
  });
};

export const useRejectCommuityInvites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) =>
      communityApi.rejectCommunityInvites(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["community-invites"] });
    },
  });
};

export const useCreateCommuity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityData: any) =>
      communityApi.createCommunity(communityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};

export const useInviteUserToCommuity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inviteData,
      communityId,
    }: {
      inviteData: any;
      communityId: string;
    }) => communityApi.inviteUserToCommunity(inviteData, communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
    },
  });
};
