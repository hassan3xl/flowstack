"use client";

import React, { useEffect } from "react";
import BaseModal from "./BaseModal";
import { Button } from "../ui/button";
import { useToast } from "@/providers/ToastProvider";
import { useUpdateProjectItem } from "@/lib/hooks/project.hook";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";

type ProjectItemType = {
  id: string;
  completed_at?: string | null;
  title: string;
  description: string;
  status: string;
  priority: "high" | "medium" | "low";
  due_date: string | null;
  is_important: boolean;
  created_at: string;
};

interface EditProjectTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  serverId: string;
  projectId: string;
  itemId: string;
  initialData: ProjectItemType | null;
}

interface FormData {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  due_date?: string | null;
}

const EditProjectTaskModal = ({
  isOpen,
  onClose,
  serverId,
  projectId,
  itemId,
  initialData,
}: EditProjectTaskModalProps) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      due_date: null,
    },
  });

  const { mutateAsync: updateProjectItem, isPending: loading } =
    useUpdateProjectItem();

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        due_date: initialData.due_date
          ? initialData.due_date.split("T")[0]
          : null,
      });
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateProjectItem({
        serverId,
        projectId,
        itemId,
        projectData: data,
      });

      toast.success("Task updated successfully");
      onClose();
    } catch (err: any) {
      toast.error(err?.detail || "Failed to update task");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Project Task">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <FormInput register={register} name="title" label="Title" required />

        {/* Description */}
        <FormInput
          register={register}
          name="description"
          label="Description"
          required
        />

        {/* Priority */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Priority</label>
          <select
            {...register("priority", { required: true })}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {errors.priority && (
            <p className="text-xs text-red-500">Priority is required</p>
          )}
        </div>

        {/* Due Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Due Date (optional)</label>
          <input
            type="date"
            {...register("due_date")}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditProjectTaskModal;
