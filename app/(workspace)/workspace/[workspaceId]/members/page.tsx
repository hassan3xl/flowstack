"use client";

import React, { useState } from "react";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useGetWorkspaceMembers } from "@/lib/hooks/workspace.hook";
import WorkspaceMemberCard from "@/components/workspace/WorkspaceMemberCard";

const WorkspaceMembers = () => {
  const { workspaceId } = useWorkspace();
  const { data: members, isLoading } = useGetWorkspaceMembers(workspaceId);
  const [search, setSearch] = useState("");

  // Simple client-side filtering
  const filteredMembers = members?.filter(
    (member: any) =>
      member.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      member.user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/50 p-6 rounded-xl border border-border">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" />
            Workspace Members
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage roles and view everyone in this server.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-9 bg-background/50 border-border focus:bg-background transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          // Skeleton Loading State
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] rounded-xl bg-card/50 animate-pulse border border-border"
            />
          ))
        ) : filteredMembers?.length > 0 ? (
          filteredMembers.map((member: any) => (
            <WorkspaceMemberCard key={member.id} member={member} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No members found matching "{search}"
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="text-center text-xs text-muted-foreground pt-4">
        Showing {filteredMembers?.length || 0} members
      </div>
    </div>
  );
};

export default WorkspaceMembers;
