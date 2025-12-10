"use client";

import React, { useEffect } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { ProjectType } from "@/lib/types/project.types";
import { useUpdateproject } from "@/lib/hooks/project.hook";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  serverId: string;
  project: ProjectType;
}

interface FormData {
  title: string;
  description: string;
  status: "planning" | "active" | "on_hold" | "completed" | "archived";
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  serverId,
  project,
}) => {
  const { mutateAsync: updateProject, isPending: loading } = useUpdateproject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      status: "planning",
    },
  });

  console.log("project", project);

  // ✅ Load initial project data into the form
  useEffect(() => {
    if (isOpen && project) {
      reset({
        title: project.title,
        description: project.description,
        status: project.status,
      });
    }
  }, [isOpen, project, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await updateProject({
        serverId,
        projectId: project.id,
        projectData: data,
      });

      toast.success("Project updated successfully");
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Project Name */}
        <FormInput
          register={register}
          name="title"
          placeholder="Enter a name for your project"
          required
          field="input"
          label="Project Name"
        />

        {/* Description */}
        <FormInput
          register={register}
          name="description"
          placeholder="Enter a description for your project"
          required
          field="input"
          label="Project Description"
        />

        {/* ✅ Status Select */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Status</label>
          <select
            {...register("status", { required: true })}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>

          {errors.status && (
            <p className="text-xs text-red-500">Status is required</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
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
