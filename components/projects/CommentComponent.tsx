"use client";

import React from "react";
import { Button } from "../ui/button";
import { Edit3, Send, Trash2, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { useCommentTask } from "@/lib/hooks/project.hook";
import { FormInput } from "../input/formInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommentsType } from "@/lib/types/project.types";

type FormData = {
  content: string;
};

interface CommentComponentProps {
  onClose: () => void;
  comments: CommentsType[];
  isOpen: boolean;

  itemId: string;
  projectId: string;
  serverId: string;
}

const CommentComponent = ({
  comments,
  onClose,
  isOpen,
  itemId,
  projectId,
  serverId,
}: CommentComponentProps) => {
  // 1. Hook Integration
  const { mutateAsync: postComment, isPending } = useCommentTask();

  // 2. RHF Setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // Watch the comment field to disable button if empty
  const commentValue = watch("content");

  // 3. Submit Handler
  const onSubmit = async (data: FormData) => {
    try {
      await postComment({
        serverId,
        projectId,
        itemId,
        commentData: data,
      });
      toast.success("Comment added successfully");
      reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.detail || "Failed to add comment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ml-14 space-y-4">
      {/* 4. Form Section (Only wraps the input) */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <FormInput
          name="content"
          register={register}
          field="textarea"
          placeholder="Write a comment..."
          rows={3}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
          >
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>

          <Button type="submit" disabled={isPending || !commentValue?.trim()}>
            <Send className="w-4 h-4 mr-2" />
            {isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>

      {/* 5. Comments List Section (Outside the form) */}
      <div className="space-y-3">
        {comments.length > 0 &&
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-tertiary/50 rounded-xl border border-slate-700/50 p-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-white font-medium">
                    {comment.author.username}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mt-2">{comment.content}</p>

              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600/50 hover:border-slate-500 transition-all"
                >
                  <Edit3 className="w-3 h-3" />
                </Button>

                <Button
                  size="sm"
                  className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1 h-8"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentComponent;
