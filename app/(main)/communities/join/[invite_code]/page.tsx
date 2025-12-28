"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Users, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import { Button } from "@/components/ui/button";
import {
  joinCommunity,
  useGetCommuityInviteCode,
} from "@/lib/hooks/community.hooks";

const InvitePage = () => {
  const router = useRouter();
  const { invite_code } = useParams();
  const { user, loading: authLoading } = useAuth();
  const {
    data: invite,
    isLoading: loading,
    isError: error,
  } = useGetCommuityInviteCode(invite_code as string);
  console.log("invite", invite);

  const join = joinCommunity();

  const handleJoin = async () => {
    if (!invite) return;

    join.mutate(invite_code as string);

    router.push(`/communities/${invite.server_id}`);
  };

  if (loading || authLoading)
    return <div className="p-8 text-white">Loading...</div>;

  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => router.push("/communities/explore")}
          className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg"
        >
          Back to Explore
        </button>
      </div>
    );

  const isMember = invite.user_role !== null;

  return (
    <div className="max-w-xl mx-auto p-6 text-white bg-zinc-900 rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-2">{invite.server_name}</h2>
      <p className="text-sm text-zinc-400 mb-4">
        {invite.server_description || "No description"}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <Users size={18} />
        <span>{invite.member_count} members</span>
        {invite.is_owner && <Badge>Owner</Badge>}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleJoin}
          className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Check size={16} /> Join Server
        </Button>
      </div>
    </div>
  );
};

export default InvitePage;
