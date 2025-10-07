"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { InputField } from "../input/InputField";
import { apiService } from "@/services/apiService";
import { useToast, handleBackendError } from "../providers/ToastProvider";

interface AddProjectCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
}

const AddProjectCollaboratorModal: React.FC<
  AddProjectCollaboratorModalProps
> = ({ isOpen, onClose, onSuccess, projectId }) => {
  const [email, setEmail] = useState("");
  const [access_level, setAccessLevel] = useState("read");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Debug: Check if projectId is valid

      await apiService.post(`api/projects/${projectId}/invite/`, {
        email,
        access_level,
      });

      toast.success("Collaborator invited successfully!");

      // Reset form
      setEmail("");
      setAccessLevel("read");

      // Call success callback
      if (onSuccess) onSuccess();

      onClose();
    } catch (err: any) {
      toast.error(err.error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setEmail("");
    setAccessLevel("read");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} title="Add Collaborator">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          required
          field="input"
          label="User Email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          required
          field="select"
          label="Permission Level"
          value={access_level}
          options={[
            { label: "Read", value: "read" },
            { label: "Write", value: "write" },
            { label: "Manage", value: "manage" },
          ]}
          onChange={(e) => setAccessLevel(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Collaborator"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddProjectCollaboratorModal;
