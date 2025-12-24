"use client";

import React, { useState } from "react";
import {
  X,
  Users,
  Hash,
  Link as LinkIcon,
  Globe,
  ChevronRight,
  Gamepad2,
  GraduationCap,
  Coffee,
  Briefcase,
  ArrowLeft,
  Upload,
  Compass,
} from "lucide-react";

import { Button } from "../ui/button";
import BaseModal from "../modals/BaseModal";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { toast } from "sonner";
import {
  useCreateWorkspace,
  useUploadWorkspaceImage,
} from "@/lib/hooks/workspace.hook";

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  visibility: "public" | "private";
}

const CreateWorkspaceModal = ({ isOpen, onClose }: AddServerModalProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      visibility: "private",
    },
  });

  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspace();
  const uploadLogo = useUploadWorkspaceImage();

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await createWorkspace(data);
      onClose();
    } catch (error) {}
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a workspace"
      size="md"
    >
      <div className="">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register}
            name="name"
            label="Workspace Name"
            placeholder=""
            required
          />
          <FormInput
            register={register}
            name="description"
            label="Workspace description"
            placeholder=""
          />
          <Button type="submit" className="w-full ">
            Create
          </Button>
        </form>
      </div>
    </BaseModal>
  );
};

export default CreateWorkspaceModal;
