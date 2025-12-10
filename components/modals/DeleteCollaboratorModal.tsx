"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "../ui/button";
import { InputField } from "../input/InputField";
import { Folder } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "@/lib/services/apiService";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
  userId: any;
}

const DeleteCollaboratorModal = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
  userId,
}: DeleteProjectModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.delete(`api/projects/${projectId}/users/${userId}/`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err?.detail || "Failed to remove collaborator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Remove Collaborator">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-xl">
          Are you sure you want to remove this user from the contributors
        </h1>
        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} disabled={loading}>
            No Cancel
          </Button>
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? "Deleting..." : "Yes Remove"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default DeleteCollaboratorModal;
