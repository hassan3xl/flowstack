"use client";

import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { useInviteUser } from "@/lib/hooks/server.hooks";

interface InviteServerMemberProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  serverId: string;
}

interface FormData {
  email: string;
  role: string;
}

const InviteServerMember: React.FC<InviteServerMemberProps> = ({
  isOpen,
  onClose,
  onSuccess,
  serverId,
}) => {
  const { mutateAsync: inviteUser, isPending: loading } = useInviteUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await inviteUser({
        inviteData: data,
        serverId,
      });
      toast.success("invite has sent to the user");
      reset();
      onClose();
    } catch {}
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Invite User">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Project Name */}
        <FormInput
          register={register}
          name="email"
          placeholder="Enter user email"
          required
          errors={errors}
          type="email"
          label="User Email"
        />

        {/* role */}
        <div className="space-y-1">
          <label className="text-sm font-medium">role</label>
          <select
            {...register("role", { required: true })}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="member">Member</option>
          </select>

          {errors.role && (
            <p className="text-xs text-red-500">role is required</p>
          )}
        </div>

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
            {loading ? "inviting..." : "Invite User"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default InviteServerMember;
