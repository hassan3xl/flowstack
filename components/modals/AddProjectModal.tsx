"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { InputField } from "../input/InputField";
import { apiService } from "@/services/apiService";
import { useToast, handleBackendError } from "../providers/ToastProvider";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // callback after successful add
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiService.post("api/projects/", {
        title,
        description,
        visibility,
      });

      if (onSuccess) onSuccess();
      toast.success("Project created successfully!");
      onClose();
      setTitle("");
      setDescription("");
      setVisibility("private");
    } catch (err) {
      setError("Failed to add project.");
      handleBackendError(err, toast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Todo Project">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Project Name */}
        <InputField
          required
          field="input"
          label="Project Name"
          type="text"
          placeholder="Enter project name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <InputField
          required
          field="textarea"
          label="Description"
          type="text"
          placeholder="What is this project about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Visibility */}
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

        {/* Error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Actions */}
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
            {loading ? "Adding..." : "Add Project"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddProjectModal;
