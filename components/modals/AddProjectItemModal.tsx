"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { apiService } from "@/services/apiService";
import { Button } from "../ui/button";
import { InputField } from "../input/InputField";
import { Folder } from "lucide-react";
import { useToast } from "../providers/ToastProvider";

interface AddProjectItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
}

const AddProjectItemModal = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
}: AddProjectItemModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      description,
      priority,
      due_date: dueDate,
      status: "pending",
    };

    try {
      await apiService.post(`api/projects/${projectId}/items/`, payload);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Task to Project">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* item title */}{" "}
        <InputField
          required
          field="input"
          label="Title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Description */}
        <InputField
          required
          field="textarea"
          label="Description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Priority */}
        <InputField
          required
          field="select"
          label="Priority"
          type="text"
          value={description}
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" },
          ]}
          onChange={(e) => setPriority(e.target.value)}
        />
        {/* Due Date */}
        <InputField
          field="input"
          type="date"
          value={dueDate || ""}
          label="Due date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddProjectItemModal;
