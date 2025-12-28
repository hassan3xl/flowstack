"use client";

import { Button } from "@/components/ui/button";
import {
  Edit3,
  UserPlus,
  Users,
  Calendar,
  Settings,
  Ban,
  Trash2,
  Clock,
  Activity,
  MessageSquare,
  XCircle,
  Mail,
  Crown,
  Shield,
  Upload,
  Pencil,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";

import { formatDate } from "@/lib/utils";
import Image from "next/image";
import {
  useDeleteWorkspace,
  useGetWorkspace,
  useKickUser,
  useUpdateWorkspaceMemberRole,
  useUploadWorkspaceImage,
} from "@/lib/hooks/workspace.hook";

import InviteWorkspaceMember from "@/components/modals/InviteWorkspaceMember";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";

// Dummy data for new features
const dummyPendingInvites = [
  {
    id: 1,
    email: "john.doe@example.com",
    sentAt: "2024-12-10T10:30:00Z",
    role: "member",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    sentAt: "2024-12-09T14:20:00Z",
    role: "moderator",
  },
  {
    id: 3,
    email: "bob.wilson@example.com",
    sentAt: "2024-12-08T09:15:00Z",
    role: "member",
  },
];

const WorkspaceSettingsPage = () => {
  const { workspaceId, userRole, isAdminOrOwner } = useWorkspace();

  const { data: workspace, isLoading: loading } = useGetWorkspace(workspaceId);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("members");

  // hooks
  const { mutateAsync: uploadIcon } = useUploadWorkspaceImage();
  const { mutate: updateRole } = useUpdateWorkspaceMemberRole();
  const deleteWorkspace = useDeleteWorkspace();
  const kickUser = useKickUser();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUploadIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("file", file);

    const formData = new FormData();
    formData.append("icon", file);
    uploadIcon({ workspaceId, formData });
  };

  const handleRoleChange = (memberId: string, role: string) => {
    updateRole({ workspaceId: workspaceId, userId: memberId, data: { role } });
  };

  const handleRemoveMember = (memberId: any) => {
    console.log(`Removing member ${memberId}`);
    try {
      kickUser.mutate({ workspaceId: workspaceId, userId: memberId });
    } catch (error) {}
  };

  const handleCancelInvite = (inviteId: any) => {
    console.log(`Canceling invite ${inviteId}`);
    // API call would go here
  };

  const handleDeleteWorkspace = async () => {
    try {
      console.log(`Deleting workspace ${workspaceId}`);
      await deleteWorkspace.mutateAsync(workspaceId);
      router.push("/workspace"); // 4. Use router.push for smoother navigation
    } catch (error) {}
  };

  if (loading) {
    return <Loader variant="dots" title="Loading Settings" />;
  }

  if (!workspace) {
    return;
  }

  if (!isAdminOrOwner) {
    router.push(`/workspace/${workspaceId}`);
  }
  return (
    <div className="">
      <div className="space-y-6">
        {/* Project Information Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Left Column: Logo & Upload */}
              <div className="flex flex-col items-center gap-3 shrink-0">
                <div className="relative group">
                  <Image
                    src={workspace.logo}
                    alt={`${workspace.name} logo`}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover border border-border"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  className="w-full"
                >
                  <Upload className="w-3 h-3 mr-2" />
                  Change Icon
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadIcon}
                />
              </div>

              {/* Middle Column: workspace Info */}
              <div className="flex-1 space-y-3 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {workspace.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {formatDate(workspace.created_at)}</span>
                    </div>
                  </div>

                  {/* Desktop Actions (Positioned Top Right) */}
                  <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    {["owner", "admin"].includes(userRole) && (
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}

                    {userRole === "owner" && (
                      <Dialog
                        open={openDeleteDialog}
                        onOpenChange={setOpenDeleteDialog}
                      >
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Workspace
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Workspace</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this workspace?
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              disabled={deleteWorkspace.isPending}
                              variant="destructive"
                              onClick={handleDeleteWorkspace}
                            >
                              Delete
                            </Button>
                            <Button
                              disabled={deleteWorkspace.isPending}
                              onClick={() => setOpenDeleteDialog(false)}
                            >
                              Cancel
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {workspace.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className="border-b border-border">
            <div className="flex gap-1 p-2">
              <Button
                onClick={() => setActiveTab("members")}
                variant={activeTab === "members" ? "default" : "ghost"}
                className="flex-1 sm:flex-none"
              >
                <Users className="w-4 h-4 mr-2" />
                Members
              </Button>
              <Button
                onClick={() => setActiveTab("invites")}
                variant={activeTab === "invites" ? "default" : "ghost"}
                className="flex-1 sm:flex-none"
              >
                <Mail className="w-4 h-4 mr-2" />
                Pending Invites
              </Button>
            </div>
          </div>

          {/* Members Tab */}
          {activeTab === "members" && (
            <div>
              <div className="p-6 border-b border-border">
                <div className="flex flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Members</h2>
                  </div>
                  <Button size={"sm"} onClick={() => setOpenInviteModal(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              <div className="p-2 sm:p-4 md:p-6 space-y-3">
                {workspace.members.map((member: any) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:p-1 py-4 rounded-lg border-b border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 w-full">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary flex-shrink-0">
                        {member.user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold truncate">
                            {member.user.email}
                          </span>
                          {member.role === "owner" && (
                            <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              member.role === "owner"
                                ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                : member.role === "admin"
                                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                : member.role === "guest"
                                ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                                : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Joined{" "}
                            {formatDate(
                              member.joined_at || workspace.created_at
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {member.role !== "owner" && (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue={member.role}
                          onChange={(e) =>
                            handleRoleChange(member.user.id, e.target.value)
                          }
                        >
                          <option value="member">Member</option>
                          <option value="guest">Guest</option>
                          <option value="admin">Admin</option>
                        </select>

                        <Dialog
                          open={openDeleteDialog}
                          onOpenChange={setOpenDeleteDialog}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Remove Workspace</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to Remove this user from
                                this workspace? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                disabled={deleteWorkspace.isPending}
                                variant="destructive"
                                onClick={() =>
                                  handleRemoveMember(member.user.id)
                                }
                              >
                                Remove
                              </Button>
                              <Button
                                disabled={deleteWorkspace.isPending}
                                onClick={() => setOpenDeleteDialog(false)}
                              >
                                Cancel
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Invites Tab */}
          {activeTab === "invites" && (
            <div>
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-semibold">Pending Invitations</h2>
                </div>
              </div>

              <div className="p-2 sm:p-6 space-y-3">
                {dummyPendingInvites.length > 0 ? (
                  dummyPendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 w-full">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold truncate">
                              {invite.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded text-xs font-medium">
                              {invite.role}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Sent {formatDate(invite.sentAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive w-full sm:w-auto"
                        onClick={() => handleCancelInvite(invite.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Invite
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No pending invitations</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <InviteWorkspaceMember
        isOpen={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        workspaceId={workspaceId}
      />
    </div>
  );
};

export default WorkspaceSettingsPage;
