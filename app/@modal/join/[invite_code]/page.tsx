"use client";

import React from "react";
import AcceptInviteModal from "@/components/community/join/AcceptInviteModal";
import { useRouter } from "next/navigation";

export default function InviteModalPage({
  params,
}: {
  params: Promise<{ invite_code: string }>;
}) {
  const router = useRouter();

  // ✅ unwrap params
  const { invite_code } = React.use(params);
  console.log("invite_code", invite_code);

  return (
    <AcceptInviteModal inviteCode={invite_code} onClose={() => router.back()} />
  );
}
