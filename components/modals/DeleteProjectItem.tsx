"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { apiService } from "@/services/apiService";
import { Button } from "../ui/button";
import { InputField } from "../input/InputField";
import { Folder } from "lucide-react";
import { useToast } from "../providers/ToastProvider";

interface DeleteProjectItemProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
  itemId: string;
}

const DeleteProjectItem = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
  itemId,
}: DeleteProjectItemProps) => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.delete(
        `api/projects/${projectId}/items/${itemId}/`
      );
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err?.detail || "Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Delete Project Task">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-xl">Are you sure you want to delete this task</h1>
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

export default DeleteProjectItem;
