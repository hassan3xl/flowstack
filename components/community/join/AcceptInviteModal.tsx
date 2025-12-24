"use client";

import { useEffect, useState } from "react";
import { X, Users } from "lucide-react";
import { apiService } from "@/lib/services/apiService";
import { useGetCommuityInviteCode } from "@/lib/hooks/community.hooks";

interface Props {
  inviteCode: string;
  onClose: () => void;
}

export default function AcceptInviteModal({ inviteCode, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");

  const { data: invite } = useGetCommuityInviteCode(inviteCode);

  const joinServer = async () => {
    setJoining(true);
    try {
      await apiService.post(`/servers/invite/${inviteCode}/accept/`);
      window.location.href = `/servers/${invite.server}`;
    } catch {
      setError("Failed to join server.");
      setJoining(false);
    }
  };

  if (loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-zinc-900 w-full max-w-md rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-2">
              Join {invite.server_name}
            </h2>
            <p className="text-zinc-400 text-sm mb-4">
              {invite.server_description}
            </p>

            <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
              <Users size={16} />
              {invite.member_count} members
            </div>

            <button
              onClick={joinServer}
              disabled={joining}
              className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-medium"
            >
              {joining ? "Joining..." : "Join Server"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
