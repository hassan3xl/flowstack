"use client";

import React from "react";
import BaseModal from "./BaseModal";
import { Button } from "../ui/button";
import { useToast } from "@/providers/ToastProvider";
import { useAddProjectItem } from "@/lib/hooks/project.hook";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";

interface AddProjectItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  serverId: string;
}

interface FormData {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  due_date?: string;
}

const AddProjectItemModal = ({
  isOpen,
  onClose,
  projectId,
  serverId,
}: AddProjectItemModalProps) => {
  const { mutateAsync: addProjectItem, isPending: addingItem } =
    useAddProjectItem();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addProjectItem({
        projectData: data,
        serverId,
        projectId,
      });

      toast.success("Task added successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Task to Project">
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

        {/* Priority Select */}
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
          <Button type="button" onClick={onClose} disabled={addingItem}>
            Cancel
          </Button>
          <Button type="submit" disabled={addingItem}>
            {addingItem ? "Adding..." : "Add Task"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddProjectItemModal;
