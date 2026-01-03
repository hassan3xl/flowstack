import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspace.api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { WorkspaceType } from "../types/workspace.types";

interface UpdateRolePayload {
  workspaceId: string;
  userId: string;
  data: any;
}

// --------------------- WORKSPACE----------------------->

// create workspace
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serverData: any) => workspaceApi.createWorkspace(serverData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("workspace created successfully!");
    },
  });
};

// get workspaces
export function useGetWorkspaces() {
  return useQuery({
    queryKey: ["workspaces"],
    queryFn: () => workspaceApi.getWorkspaces(),
  });
}

// get single workspace
export function useGetWorkspace(workspaceId: string) {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => workspaceApi.getWorkspace(workspaceId),
    enabled: !!workspaceId,
  });
}
// get workspace dashboard
export function useGetWorkspaceDashboard(workspaceId: string) {
  return useQuery({
    queryKey: ["workspace-dashboard", workspaceId],
    queryFn: () => workspaceApi.getWorkspaceDashboard(workspaceId),
    enabled: !!workspaceId,
  });
}

// update workspace
export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      workspaceData,
    }: {
      workspaceId: string;
      workspaceData: any;
    }) => workspaceApi.updateWorkspace(workspaceId, workspaceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
    },
  });
};

// delete workspace
export function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workspaceId: string) =>
      workspaceApi.deleteWorkspace(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      toast.success("workspace deleted successfully!");
    },
  });
}

// upload workspace image
export const useUploadWorkspaceImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      formData,
    }: {
      workspaceId: string;
      formData: FormData;
    }) => workspaceApi.uploadWorkspaceIcon(workspaceId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
    },
  });
};

// invite user
export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inviteData,
      workspaceId,
    }: {
      inviteData: any;
      workspaceId: string;
    }) => workspaceApi.inviteUserToWorkspace(inviteData, workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
    },
  });
};

// kick user
export const useKickUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      userId,
    }: {
      workspaceId: string;
      userId: string;
    }) => workspaceApi.kickUserFromWorkspace(workspaceId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-members"] });
      toast.success("User kicked successfully!");
    },
  });
};

// --------------------- INVITATIONS----------------------->

// get workspace invitations
export function useGetWorkspaceInvitations() {
  return useQuery({
    queryKey: ["workspace-invitations"],
    queryFn: () => workspaceApi.getWorkspaceInvitations(),
  });
}

// accept workspace invitation
export const useAcceptWorkspaceInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) =>
      workspaceApi.acceptWorkspaceInvites(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-invitations"] });
      toast.success("Invitation accepted successfully!");
    },
  });
};

// reject workspace invitation
export const useRejectWorkspaceInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workspaceId: string) =>
      workspaceApi.rejectWorkspaceInvites(workspaceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-invitations"] });
      toast.success("Invitation rejected successfully!");
    },
  });
};

// --------------------- MEMBERS----------------------->

// get workspace members
export function useGetWorkspaceMembers(workspaceId: string) {
  return useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => workspaceApi.getWorkspaceMembers(workspaceId),
  });
}

// update workspace member role
export const useUpdateWorkspaceMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ workspaceId, userId, data }: UpdateRolePayload) => {
      return await workspaceApi.updateWorkspaceMemberRole(
        workspaceId,
        userId,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      queryClient.invalidateQueries({ queryKey: ["servers"] });
    },
  });
};

// GET A SINGLE WORKSPACE MEMBERS
// export function useGetWorkspaceMember(workspaceId: string) {
//   return useQuery({
//     queryKey: ["workspace-member", workspaceId],
//     queryFn: () => workspaceApi.getWorkspaceMembers(workspaceId),
//     enabled: !!workspaceId,
//   });
// }
