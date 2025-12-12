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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useServer } from "@/contexts/ServerContext";
import { useGetServer } from "@/lib/hooks/server.hooks";
import { formatDate } from "@/lib/utils";
import InviteServerMember from "@/components/modals/InviteServerMember";

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

const dummyStats = {
  totalMembers: 24,
  activeToday: 18,
  totalMessages: 1247,
  pendingInvites: 3,
};

const ServerSettingsPage = () => {
  const { serverId } = useServer();
  const { data: server, isLoading: loading } = useGetServer(serverId);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("members");

  const handleRoleChange = ({ memberId, newRole }: any) => {
    console.log(`Changing role for member ${memberId} to ${newRole}`);
    // API call would go here
  };

  const handleSuspendMember = (memberId: any) => {
    console.log(`Suspending member ${memberId}`);
    // API call would go here
  };

  const handleRemoveMember = (memberId: any) => {
    console.log(`Removing member ${memberId}`);
    // API call would go here
  };

  const handleCancelInvite = (inviteId: any) => {
    console.log(`Canceling invite ${inviteId}`);
    // API call would go here
  };

  if (loading) {
    return <Loader variant="dots" title="Loading Settings" />;
  }

  if (!server) {
    return;
  }

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-lg sm:text-3xl font-bold">Server Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your Server details, members, and more
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-5 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">
                {dummyStats.totalMembers}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </div>

          <div className="bg-card p-5 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">
                {dummyStats.activeToday}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Active Today</p>
          </div>

          <div className="bg-card p-5 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">
                {dummyStats.totalMessages}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Total Messages</p>
          </div>

          <div className="bg-card p-5 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold">
                {dummyStats.pendingInvites}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Pending Invites</p>
          </div>
        </div>

        {/* Project Information Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-md sm:text-2xl font-semibold">
                    {server.name}
                  </h2>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20">
                    Active
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {server.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {formatDate(server.created_at)}</span>
                  </div>
                </div>
              </div>
              <Button size="sm">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">Members</h2>
                  </div>
                  <Button onClick={() => setOpenInviteModal(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {server.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
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
                                : member.role === "moderator"
                                ? "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                                : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                            }`}
                          >
                            {member.role}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Joined{" "}
                            {formatDate(member.joined_at || server.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {member.role !== "owner" && (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          defaultValue={member.role}
                        >
                          <option value="member">Member</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>

                        <Button
                          size="sm"
                          variant="outline"
                          className="text-yellow-500 hover:text-yellow-600"
                          onClick={() => handleSuspendMember(member.id)}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

              <div className="p-6 space-y-3">
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

      <InviteServerMember
        isOpen={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        serverId={serverId}
      />
    </div>
  );
};

export default ServerSettingsPage;
