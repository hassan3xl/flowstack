"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Crown,
  Sparkles,
  Mail,
  Check,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import {
  useAcceptWorkspaceInvitation,
  useGetWorkspaceInvitations,
  useGetWorkspaces,
  useRejectWorkspaceInvitation,
} from "@/lib/hooks/workspace.hook";
import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const WorkspacesPage = () => {
  const { user } = useAuth();
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const { data: invitations } = useGetWorkspaceInvitations();
  console.log("workspaces", workspaces);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "owned" | "invitations">(
    "all"
  );
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [openCreateWorkspaceModal, setOpenCreateWorkspaceModal] =
    useState(false);

  // hooks

  const acceptInvite = useAcceptWorkspaceInvitation();
  const rejectInvite = useRejectWorkspaceInvitation();

  const handleCreateClick = () => {
    if (workspaces && workspaces.length >= 1) {
      setShowPremiumModal(true);
    } else {
      setOpenCreateWorkspaceModal(true);
    }
  };

  const handleAcceptInvite = async (inviteId: string) => {
    console.log("Accepting invite:", inviteId);
    try {
      await acceptInvite.mutate(inviteId);
    } catch (error) {}
  };

  const handleRejectInvite = (inviteId: string) => {
    console.log("Rejecting invite:", inviteId);
    rejectInvite.mutate(inviteId);
  };

  // --- Filtering Logic ---
  const filteredWorkspaces = workspaces?.filter((ws: any) => {
    const matchesSearch = ws.name.toLowerCase().includes(search.toLowerCase());

    if (activeTab === "owned") {
      const ownedWs = ws.user_role === "owner";
      return ownedWs;
    }
    return matchesSearch;
  });

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <Header
        title="Workspaces"
        subtitle="Switch between your different projects and teams"
        actions={
          <Button onClick={handleCreateClick} className="gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            <p className="hidden md:inline-block font-semibold">
              Create Workspace
            </p>
          </Button>
        }
      />

      {/* Toolbar: Search & Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search workspaces..."
              className="pl-10 h-11 rounded-xl bg-card"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 bg-muted/50 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("owned")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "owned"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Owned
            </button>
            <button
              onClick={() => setActiveTab("invitations")}
              className={`flex-1 sm:flex-none relative px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "invitations"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Invitations
              {invitations && invitations?.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VIEW: Workspaces (All or Owned) */}
        {activeTab !== "invitations" && (
          <>
            {filteredWorkspaces?.map((workspace: any) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}

            {filteredWorkspaces?.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/30">
                <p className="text-muted-foreground">
                  No workspaces found matching your criteria.
                </p>
              </div>
            )}
          </>
        )}

        {/* VIEW: Invitations */}
        {activeTab === "invitations" && (
          <>
            {invitations?.map((invite: any) => (
              <div
                key={invite.id}
                className="bg-card rounded-xl border border-border p-5 shadow-sm flex flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Inviter Avatar */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                      {invite.invited_by?.avatar ? (
                        <Image
                          src={invite.invited_by.avatar}
                          alt={invite.invited_by.email}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {invite.invited_by?.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Invited you as{" "}
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1 py-0"
                        >
                          {invite.role}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>

                <div className="text-sm text-muted-foreground">
                  You have been invited to join workspace{" "}
                  <span className="font-mono text-xs bg-muted px-1 rounded">
                    {invite.workspace.name}
                  </span>
                  <p></p>
                </div>

                <div className="flex gap-2 mt-auto pt-2">
                  <Button
                    disabled={acceptInvite.isPending}
                    className="flex-1 gap-2"
                    size="sm"
                    onClick={() => handleAcceptInvite(invite.id)}
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                    size="sm"
                    disabled={rejectInvite.isPending}
                    onClick={() => handleRejectInvite(invite.id)}
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}

            {invitations?.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/30">
                <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  You have no pending invitations.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        isOpen={openCreateWorkspaceModal}
        onClose={() => setOpenCreateWorkspaceModal(false)}
      />

      {/* Premium Upgrade Modal */}
      <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-amber-600" />
            </div>
            <DialogTitle className="text-2xl">Upgrade to Pro</DialogTitle>
            <DialogDescription className="text-base">
              You've reached the limit of free workspace. Upgrade to create
              unlimited spaces for your teams.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="flex items-center gap-3 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Unlimited Workspaces</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Advanced Team Permissions</span>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-none h-11">
              Upgrade Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspacesPage;
