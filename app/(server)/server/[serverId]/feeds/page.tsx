"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateFeed, useGetServerFeeds } from "@/lib/hooks/feed.hook";
import FeedsCard from "@/components/chats/FeedsCard";
import { useServer } from "@/contexts/ServerContext";
import BaseModal from "@/components/modals/BaseModal";
import { FormInput } from "@/components/input/formInput";
import { useForm } from "react-hook-form";

interface ServerFeedsProps {}

interface FeedFormData {
  content: string;
}

export default function ServerFeeds({}: ServerFeedsProps) {
  const { serverId } = useServer();
  const { data: feeds } = useGetServerFeeds(serverId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const createFeed = useCreateFeed();
  const { mutateAsync: createFeed, isPending } = useCreateFeed();

  const { register, handleSubmit, reset, watch } = useForm<FeedFormData>();

  const content = watch("content") || "";

  const onSubmit = async (data: FeedFormData) => {
    if (!data.content.trim()) return;
    console.log("FORM DATA:", data);

    await createFeed({
      serverId,
      feedData: {
        content: data.content,
      },
    });

    reset();
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          {feeds?.map((post: any) => (
            <FeedsCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Floating Add Feed Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="
          fixed bottom-6 right-6
          h-14 w-14 rounded-full
          bg-blue-500 hover:bg-blue-600
          shadow-lg
          flex items-center justify-center
          transition-transform active:scale-95
          z-50
        "
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>

      {/* Create Feed Modal */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create post"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            field="textarea"
            placeholder="What’s happening?"
            name="content"
            register={register}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {content.length}/280
            </span>

            <Button type="submit" disabled={isPending || !content.trim()}>
              {isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </BaseModal>
    </div>
  );
}
