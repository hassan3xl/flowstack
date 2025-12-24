"use client";

import React from "react";
import BaseModal from "./BaseModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { useInviteUser } from "@/lib/hooks/workspace.hook";
import { Shield, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface InviteWorkspaceMemberProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

interface FormData {
  email: string;
  role: string;
  expires_at?: Date;
}

const InviteWorkspaceMember: React.FC<InviteWorkspaceMemberProps> = ({
  isOpen,
  onClose,
  workspaceId,
}) => {
  const { mutateAsync: inviteUser, isPending: loading } = useInviteUser();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      role: "member", // Default role
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Format date to ISO string if it exists, otherwise undefined (backend handles default 7 days)
      const formattedData = {
        ...data,
        expires_at: data.expires_at ? data.expires_at.toISOString() : null,
      };

      await inviteUser({
        inviteData: formattedData,
        workspaceId,
      });

      toast.success(`Invitation sent to ${data.email}`);
      reset();
      onClose();
    } catch (error) {
      // Error is handled by the mutation hook or global handler usually
      console.error("Failed to invite:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Invite Member</DialogTitle>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <FormInput
            register={register}
            name="email"
            placeholder="user@example.com"
            required
            errors={errors}
            type="email"
            label="User Email"
          />

          {/* Role Selection */}
          <FormInput
            name="role"
            label="Role"
            field="select"
            register={register}
            icon={Shield}
            errors={errors} // Fixed prop name from 'error' to 'errors'
            placeholder="Select role"
            options={[
              { value: "admin", label: "Admin" },
              { value: "member", label: "Member" },
              { value: "guest", label: "Guest" },
            ]}
            validation={{ required: "Role is required" }}
          />

          {/* Expiration Date Picker (Optional) */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Invitation Deadline (Optional)
            </label>
            <Controller
              control={control}
              name="expires_at"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal h-11 border-border bg-muted/30",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date (Default: 7 days)</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={
                        (date) => date < new Date() // Disable past dates
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            <p className="text-[0.8rem] text-muted-foreground">
              If left blank, the invitation will expire in 7 days.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteWorkspaceMember;
