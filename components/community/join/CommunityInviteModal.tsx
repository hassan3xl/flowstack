"use client";

import React, { useState } from "react";
import { Link } from "lucide-react";

import { Button } from "../../ui/button";
import BaseModal from "../../modals/BaseModal";

import { formatDate } from "@/lib/utils";
import { InvitesType } from "@/lib/types/server.types";
import { toast } from "sonner";
import {
  useAcceptCommuityInvites,
  useRejectCommuityInvites,
} from "@/lib/hooks/community.hooks";

interface CommunityInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  invites: InvitesType[];
}

const CommunityInviteModal = ({
  isOpen,
  onClose,
  invites,
}: CommunityInviteModalProps) => {
  const [activeInviteId, setActiveInviteId] = useState<string | null>(null);

  const { mutateAsync: acceptInvite, isPending: accepting } =
    useAcceptCommuityInvites();
  const { mutateAsync: rejectInvite, isPending: rejecting } =
    useRejectCommuityInvites();

  const handleAccept = async (inviteId: string) => {
    try {
      setActiveInviteId(inviteId);
      await acceptInvite(inviteId);
      toast.success("Invitation accepted");
      onClose(); // ✅ CLOSE MODAL AFTER SUCCESS
    } finally {
      setActiveInviteId(null);
    }
  };

  const handleReject = async (inviteId: string) => {
    try {
      setActiveInviteId(inviteId);
      await rejectInvite(inviteId);
      toast.success("Invitation rejected");
      onClose(); // ✅ CLOSE MODAL AFTER SUCCESS
    } catch (err: any) {
      toast.error("Failed to reject invitation");
    } finally {
      setActiveInviteId(null);
    }
  };

  const pendingInvites = invites?.filter(
    (invite) => invite.status === "pending"
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Server Invitations"
      size="md"
    >
      <div className="space-y-4">
        {pendingInvites && pendingInvites?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {pendingInvites?.map((invite) => (
              <div
                key={invite.id}
                className="flex flex-col border-b py-4 gap-4"
              >
                <div className="text-sm text-secondary-foreground">
                  <strong>{invite.invited_by}</strong>
                  <p>invited you to join this server</p>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <Link className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-1">
                      {invite.server_name}
                    </h3>
                    <p className="text-sm text-secondary-foreground">
                      {formatDate(invite.created_at)}
                    </p>
                    <p className="text-sm text-secondary-foreground">
                      role: {invite.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => handleAccept(invite.id)}
                    disabled={activeInviteId === invite.id && accepting}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleReject(invite.id)}
                    disabled={activeInviteId === invite.id && rejecting}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No pending invitations.
          </p>
        )}
      </div>
    </BaseModal>
  );
};

export default CommunityInviteModal;
