"use client";

import React, { useState } from "react";
import BaseModal from "../../modals/BaseModal";
import { Button } from "../../ui/button";
import { InputField } from "../../input/InputField";
import { Folder } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "@/lib/services/apiService";
import { useDeleteProject } from "@/lib/hooks/project.hook";
import { useRouter } from "next/navigation";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  workspaceId: string;
}

const DeleteProjectModal = ({
  isOpen,
  onClose,
  projectId,
  workspaceId,
}: DeleteProjectModalProps) => {
  const { mutateAsync: deleteProject, isPending: loading } = useDeleteProject();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await deleteProject({
        workspaceId,
        projectId,
      });
      onClose();
      router.push(`/workspace/${workspaceId}/projects/`);
    } catch (err: any) {
      toast.error(err?.detail || "Failed to delete project");
    } finally {
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Delete Project">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-xl">
          Are you sure you want to delete this Project, Permanently delete this
          project and all its items. This action cannot be undone.
        </h1>
        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} disabled={loading}>
            No Cancel
          </Button>
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? "Deleting..." : "Yes Delete"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default DeleteProjectModal;
