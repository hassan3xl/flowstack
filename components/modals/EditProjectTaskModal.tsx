"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import { apiService } from "@/services/apiService";
import { Button } from "../ui/button";
import { InputField } from "../input/InputField";
import { Folder } from "lucide-react";
import { useToast } from "../providers/ToastProvider";

type ProjectItemType = {
  id: string;
  completed_at?: string | null;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string | null;
  is_important: boolean;
  created_at: string;
};
interface EditProjectTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  projectId: string;
  itemId: string;
  initialData: ProjectItemType | null;
}

const EditProjectTaskModal = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
  itemId,
  initialData,
}: EditProjectTaskModalProps) => {
  const [title, setTitle] = useState(initialData?.title || ""); // Assuming 'description' is used as 'title' in the modal form, which seems to be the case based on your input
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState(initialData?.priority || "medium");
  const [dueDate, setDueDate] = useState<string | null>(
    initialData?.due_date || null
  );
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (isOpen && initialData) {
      // Note: If you want to use a separate 'title' field, you'll need to update your data structure.
      // Assuming 'description' is what you want to edit as the main text.
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPriority(initialData.priority);
      // Ensure due_date is in the correct format (YYYY-MM-DD) for HTML date input
      setDueDate(
        initialData.due_date ? initialData.due_date.split("T")[0] : null
      );
    } else if (!isOpen) {
      // Optional: Reset state when the modal closes
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate(null);
    }
  }, [isOpen, initialData]);

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
      await apiService.put(
        `api/projects/${projectId}/items/${itemId}/`,
        payload
      );
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err?.detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Project Task">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* item title */}{" "}
        <InputField
          required
          field="input"
          label="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Description */}
        <InputField
          required
          field="textarea"
          label="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Priority */}
        <InputField
          required
          field="select"
          label="priority"
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
          label="due date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "saving..." : "save"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditProjectTaskModal;
