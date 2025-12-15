"use client";

import React from "react";
import BaseModal from "./BaseModal";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAddProjectItem } from "@/lib/hooks/project.hook";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { Calendar, Flag, ChevronDown, AlignLeft, Plus } from "lucide-react";

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
  due_date?: string | null;
}

const AddProjectItemModal = ({
  isOpen,
  onClose,
  projectId,
  serverId,
}: AddProjectItemModalProps) => {
  const { mutateAsync: addProjectItem, isPending: addingItem } =
    useAddProjectItem();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const payload = { ...data };
    if (!payload.due_date) payload.due_date = null;

    try {
      await addProjectItem({ projectData: payload, serverId, projectId });
      toast.success("Task created successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      description="Add a new item to your project board. Fill in the details below."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="space-y-1">
          <FormInput
            register={register}
            name="title"
            label="Task Title"
            type="text"
            placeholder="e.g., Redesign homepage hero section"
            required
          />
        </div>

        {/* Grid for Priority & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Custom Styled Select for Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
              <Flag className="w-3.5 h-3.5 text-muted-foreground" /> Priority
            </label>
            <div className="relative">
              <select
                {...register("priority", { required: true })}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <option value="" disabled selected>
                  Select Level
                </option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              {/* Custom Chevron to hide ugly browser arrow */}
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
            </div>
            {errors.priority && (
              <p className="text-[0.8rem] font-medium text-destructive">
                Priority is required
              </p>
            )}
          </div>

          {/* Custom Styled Date Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Due
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("due_date")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                uppercase tracking-wider text-muted-foreground focus:text-foreground
                "
              />
              {/* CSS trick to make date picker icon white/dark mode compatible is handled by browser, but we can rely on standard border/bg here */}
            </div>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-2">
          <FormInput
            register={register}
            name="description"
            label="Description"
            field="textarea"
            placeholder="Describe the acceptance criteria or add notes..."
            required
            rows={4}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-border/40">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={addingItem}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={addingItem}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
          >
            {addingItem ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Adding...
              </div>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" /> Create Task
              </>
            )}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddProjectItemModal;
