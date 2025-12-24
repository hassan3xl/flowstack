"use client";

import React, { useState } from "react";
import BaseModal from "../../modals/BaseModal";
import { Button } from "../../ui/button";
import { InputField } from "../../input/InputField";
import { Folder } from "lucide-react";
import { toast } from "sonner";
import { apiService } from "@/lib/services/apiService";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
}

const DeleteProjectModal = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
}: DeleteProjectModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiService.delete(`api/projects/${projectId}/`);
      if (onSuccess) onSuccess();
      toast.success("Project Deleted successfully!");
      onClose();
    } catch (err) {
      toast.error("Failed to delete project, Please try again.");
    } finally {
      setLoading(false);
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
