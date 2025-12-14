"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { InputField } from "../input/InputField";
import { apiService } from "@/lib/services/apiService";
import { useAddproject } from "@/lib/hooks/project.hook";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  serverId: string;
}

interface FormData {
  title: string;
  description: string;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  serverId,
}) => {
  const { mutateAsync: addProject, isPending: loading } = useAddproject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addProject({
        projectData: data,
        serverId,
      });
      toast.success("Project added successfully");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to add project");
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add a Project">
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
          field="textarea"
          label="Project Description"
        />

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
