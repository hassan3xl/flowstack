"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { InputField } from "../input/InputField";
import { apiService } from "@/services/apiService";
import { useToast, handleBackendError } from "../providers/ToastProvider";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
  initialTitle: string;
  initialDescription: string;
  initialVisibility: string;
}
const EditProjectModal = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
  initialTitle,
  initialDescription,
  initialVisibility,
}: EditProjectModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [visibility, setVisibility] = useState(initialVisibility || "private");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Reset modal fields when opening
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      setVisibility(initialVisibility || "private");
      setError(null);
    }
  }, [isOpen, initialTitle, initialDescription, initialVisibility]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload = {
      title,
      description,
      visibility,
    };
    try {
      await apiService.put(`api/projects/${projectId}/`, payload);
      if (onSuccess) onSuccess();
      toast.success("Project updated successfully!");
      onClose();
    } catch (err) {
      setError("Failed to update project.");
      handleBackendError(err, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          required
          field="input"
          label="Project Name"
          type="text"
          placeholder="Enter project name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          required
          field="textarea"
          label="Description"
          type="text"
          placeholder="What is this project about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          field="select"
          label="Who will see this project?"
          type="text"
          value={visibility}
          options={[
            { label: "Private", value: "private" },
            { label: "Shared", value: "shared" },
            { label: "Public", value: "public" },
          ]}
          onChange={(e) => setVisibility(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditProjectModal;
