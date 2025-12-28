"use client";

import React, { useState } from "react";
import {
  useAddTask,
  useGetProjectCollaborators,
} from "@/lib/hooks/project.hook";
import { useForm, Controller } from "react-hook-form"; // Added Controller
import {
  Calendar,
  Flag,
  ChevronDown,
  Plus,
  Check,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import BaseModal from "@/components/modals/BaseModal";
import { FormInput } from "@/components/input/formInput";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  workspaceId: string;
}

interface FormData {
  title: string;
  description: string;
  assign_user_id: string;
  priority: "high" | "medium" | "low";
  due_date?: string | null;
}

const AddTaskModal = ({
  isOpen,
  onClose,
  projectId,
  workspaceId,
}: AddTaskModalProps) => {
  const { mutateAsync: addTask, isPending: addingItem } = useAddTask();
  const [openCombobox, setOpenCombobox] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Fetch members
  const { data: members, isLoading: isLoadingMembers } =
    useGetProjectCollaborators(workspaceId, projectId);
  console.log("members", members);

  const onSubmit = async (data: FormData) => {
    const payload = { ...data };
    console.log("payload", payload);
    if (!payload.due_date) payload.due_date = null;

    try {
      await addTask({ projectData: payload, workspaceId, projectId });
      reset();
      onClose();
    } catch (error) {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogContent>
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

          {/* Priority and Due Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Flag className="w-3.5 h-3.5 text-muted-foreground" /> Priority
              </label>
              <div className="relative">
                <select
                  {...register("priority", { required: true })}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer hover:bg-accent/50 transition-colors"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Level
                  </option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
              </div>
              {errors.priority && (
                <p className="text-[0.8rem] font-medium text-destructive">
                  Required
                </p>
              )}
            </div>

            {/* Date Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Due
                Date
              </label>
              <input
                type="date"
                {...register("due_date")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wider text-muted-foreground focus:text-foreground"
              />
            </div>
          </div>

          {/* Description */}
          <FormInput
            register={register}
            name="description"
            label="Description"
            field="textarea"
            placeholder="Add notes..."
            required
            rows={3}
          />

          {/* RICH COLLABORATOR SELECT (Combobox) */}
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium">Assign to</label>
            <Controller
              name="assign_user_id"
              control={control}
              render={({ field }) => (
                <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="w-full justify-between font-normal text-muted-foreground hover:text-foreground"
                    >
                      {field.value
                        ? members?.find(
                            (member: any) => member.user.id === field.value
                          )?.user.username || "Select collaborator..."
                        : "Select collaborator..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search team members..." />
                      <CommandList>
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup>
                          {members?.map((member: any) => (
                            <CommandItem
                              key={member.id}
                              value={member.user?.username || member.user.email} // Helps with search filtering
                              onSelect={() => {
                                field.onChange(member.user.id); // Update RHF value
                                setOpenCombobox(false);
                              }}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              {/* Visual Avatar */}
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="text-[10px]">
                                  {member.user?.email[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                              </Avatar>

                              <span>{member.user.username}</span>
                              <span>{member.user.email}</span>
                              <span>{member.permission}</span>

                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === member.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={addingItem}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={addingItem}>
              {addingItem ? (
                "Adding..."
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
