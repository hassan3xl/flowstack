"use client";

import React, { useState } from "react";
import { X, Users, Hash, Link, Globe } from "lucide-react";

import { Button } from "../ui/button";
import BaseModal from "../modals/BaseModal";
import { InputField } from "../input/InputField";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormInput } from "../input/formInput";
import { useCreateServer } from "@/lib/hooks/server.hooks";
import { toast } from "sonner";

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  server_type: "public" | "private";
}

const AddServerModal = ({ isOpen, onClose }: AddServerModalProps) => {
  const [view, setView] = useState("main");
  const [inviteLink, setInviteLink] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutateAsync: createServer, isPending } = useCreateServer();

  const onSubmit = async (data: FormData) => {
    try {
      await createServer(data);
      toast.success("Server created successfully");
      onClose();
    } catch (error) {}
  };

  const handleJoinServer = () => {
    console.log("Joining server with link:", inviteLink);
    // Add your join server logic here
  };

  const handleBrowsePublicServers = () => {
    onClose();
    router.push("/communities/explore/");
  };

  const renderMainView = () => (
    <div className="space-y-4">
      <p className="text-secondary-foreground text-center mb-6">
        Choose how you'd like to get started
      </p>
      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setView("create")}
          className="group p-6 rounded-lg border-2 border-border transition-all duration-200 text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-900 transition-colors">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-1">
                Create My Server
              </h3>
              <p className="text-sm text-secondary-foreground">
                Start your own community and invite friends
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setView("join")}
          className="group p-6 rounded-lg border-2 border-border transition-all duration-200 text-left"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 group-hover:bg-green-200 dark:group-hover:bg-green-900 transition-colors">
              <Link className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary mb-1">Join a Server</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter an invite link or browse public servers
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderCreateView = () => (
    <div className="space-y-6">
      <button
        onClick={() => setView("main")}
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/50">
            <Hash className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <FormInput
          name="name"
          label="Server Name"
          register={register}
          placeholder="Enter a name for your server"
          errors={errors}
          type="text"
        />

        <FormInput
          name="description"
          field="textarea"
          label="Server Description (Optional)"
          placeholder="Enter a description for your server"
          register={register}
          errors={errors}
          type="text"
        />

        <div>
          <label className="block mb-2 font-medium">Server Type</label>
          <select
            {...register("server_type", {
              required: "Server type is required",
            })}
            className="w-full bg-neutral-800 border border-neutral-600 rounded-lg p-2"
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>

          {errors.server_type && (
            <p className="text-red-500 text-sm">{errors.server_type.message}</p>
          )}
        </div>

        <div className="pt-4 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setView("main")}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? "Creating..." : "Create Server"}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderJoinView = () => (
    <div className="space-y-6">
      <button
        onClick={() => setView("main")}
        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      <div className="space-y-4">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/50">
            <Link className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <InputField
          label="Invite Link"
          placeholder=""
          value={inviteLink}
          onChange={(e) => setInviteLink(e.target.value)}
        />

        <div className="pt-4 flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setView("main")}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleJoinServer}
            className="flex-1"
            disabled={!inviteLink.trim()}
          >
            Join Server
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
              or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleBrowsePublicServers}
          className="w-full"
        >
          <Globe className="w-5 h-5" />
          Browse Public Servers
        </Button>
      </div>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        view === "main"
          ? "Add Server"
          : view === "create"
          ? "Create Server"
          : "Join Server"
      }
      size="md"
    >
      {view === "main" && renderMainView()}
      {view === "create" && renderCreateView()}
      {view === "join" && renderJoinView()}
    </BaseModal>
  );
};

export default AddServerModal;
