"use client";

import { Button } from "@/components/ui/button";
import {
  Edit3,
  UserPlus,
  Users,
  Calendar,
  CheckCircle2,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import { useServer } from "@/contexts/ServerContext";
import { useGetServer } from "@/lib/hooks/server.hooks";
import { formatDate } from "@/lib/utils";
import InviteServerMember from "@/components/modals/InviteServerMember";

const ServerSettingsPage = () => {
  const { serverId } = useServer();

  const { data: server, isLoading: loading } = useGetServer(serverId);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  console.log("server", server);

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
            <Settings className="w-8 h-8 text-blue-400" />
            <h1 className="text-lg sm:text-3xl font-bold">Server Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your Server details, members, and more
          </p>
        </div>

        {/* Project Information Card */}
        <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
          <div className=" p-6 border-b border-border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-md sm:text-2xl font-semibold text-white">
                    {server.name}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {server.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {formatDate(server.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <span>Owner: {server.owner.email}</span> */}
                  </div>
                </div>
              </div>
              <Button size={"sm"}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          {/* server Stats */}
        </div>
      </div>

      {/* Collaborators Management */}
      <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Members</h2>
            </div>
            <Button
              onClick={() => setOpenInviteModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1">
                {server.members.map((member: any) => (
                  <div key={member.id} className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {member.role}
                    </span>
                    <span>{member.user.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
