"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { apiService } from "@/lib/services/apiService";
import { toast } from "sonner";
import { useGetServerMembers } from "@/lib/hooks/server.hooks";
import { Search, User, Check, Shield, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils"; // Standard shadcn utility
import { InputField } from "../input/InputField";
import { useAddProjectCollab } from "@/lib/hooks/project.hook";

interface FormData {
  email: string;
  permission: "read" | "write";
}
interface AddProjectCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  serverId: string;
}

const AddProjectCollaboratorModal: React.FC<
  AddProjectCollaboratorModalProps
> = ({ isOpen, onClose, serverId, projectId }) => {
  const { data: members, isLoading: membersLoading } =
    useGetServerMembers(serverId);
  const { mutateAsync: addCollab, isPending } = useAddProjectCollab();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [permission, setPermission] = useState<"read" | "write">("read");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter members based on search
  const filteredMembers = members?.filter(
    (member: any) =>
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMemberId) {
      toast.error("Please select a member first");
      return;
    }

    setIsSubmitting(true);

    try {
      await addCollab({
        serverId,
        projectId,
        collabData: {
          user_id: selectedMemberId,
          permission,
        },
      });

      toast.success("Collaborator added successfully");
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedMemberId(null);
    setPermission("read");
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Project Collaborator"
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* 1. Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <InputField
            placeholder="Search by email or username..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 2. Members List (Scrollable) */}
        <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[300px] border rounded-md mb-4 divide-y">
          {membersLoading ? (
            <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
              Loading members...
            </div>
          ) : filteredMembers?.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
              No members found.
            </div>
          ) : (
            filteredMembers?.map((member: any) => {
              const isSelected = selectedMemberId === member.user.id;

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.user.id)}
                  className={cn(
                    "flex items-center justify-between p-3 cursor-pointer transition-colors hover:bg-accent/50",
                    isSelected && "bg-accent border-l-4 border-primary pl-2" // Visual highlight
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Simple Avatar Fallback */}
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary uppercase">
                      {member.user.email[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium leading-none">
                        {member.user.username || "Unknown User"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.user.email}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </div>
              );
            })
          )}
        </div>

        {/* 3. Permission Selector */}
        <div className="mb-6 space-y-3">
          <label className="text-sm font-medium">Permission Level</label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setPermission("read")}
              className={cn(
                "border rounded-lg p-3 cursor-pointer flex items-center gap-2 hover:border-primary transition-all",
                permission === "read"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-input"
              )}
            >
              <Shield className="h-4 w-4 text-blue-500" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Read Only</span>
                <span className="text-[10px] text-muted-foreground">
                  Can view tasks
                </span>
              </div>
            </div>

            <div
              onClick={() => setPermission("write")}
              className={cn(
                "border rounded-lg p-3 cursor-pointer flex items-center gap-2 hover:border-primary transition-all",
                permission === "write"
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-input"
              )}
            >
              <ShieldAlert className="h-4 w-4 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Write Access</span>
                <span className="text-[10px] text-muted-foreground">
                  Can edit & delete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Footer Actions */}
        <div className="flex justify-end gap-3 mt-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!selectedMemberId || isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Adding..." : "Add User"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddProjectCollaboratorModal;
