"use client";

import React, { useEffect, useState } from "react";
import { InputField } from "../input/InputField";
import { Button } from "../ui/button";
import { Edit3, Send, Trash2, X } from "lucide-react";
import { useToast } from "../providers/ToastProvider";
import { ProjectItem, Comments } from "@/lib/types";
import { apiService } from "@/services/apiService";
import { formatDate } from "@/lib/utils";

interface CommentComponentProps {
  itemId: string;
  comments: Comments[];
  onClose: () => void;
  onSucess?: () => void;
  isOpen: boolean;
  ProjectId: string;
}

const CommentComponent = ({
  comments,
  onClose,
  isOpen,
  itemId,
  ProjectId,
  onSucess,
}: CommentComponentProps) => {
  console.log("commentssmsmsms", comments);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const toast = useToast();
  console.log("ProjectId", ProjectId);
  console.log("itemId", itemId);

  const handleSubmit = async () => {
    if (!commentText.trim()) return;
    setLoading(true);

    try {
      const response = await apiService.post(
        // `api/projects/${ProjectId}/items/${itemId}/comments/`,
        `api/projects/${itemId}/comments/`,

        {
          content: commentText,
        }
      );
          if (onSucess) onSucess();
      onClose();
      setCommentText("");

    } catch (error: any) {
      console.error(error);
      toast.error(error?.detail || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ml-14 space-y-4">
      {/* Comment Input (always visible) */}
      <div className="flex flex-col">
        <InputField
          field="textarea"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          error={""}
          success={""}
          placeholder="Write a comment..."
          rows={3}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={onClose}>
            <X className="w-4 h-4" /> Cancel
          </Button>

          <Button
            disabled={loading || !commentText.trim()} // ✅ disable if loading or empty
            onClick={handleSubmit}
          >
            <Send className="w-4 h-4" /> Post
          </Button>
        </div>
      </div>

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
                    {comment.author.fullname}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {formatDate(comment.created_at)}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mt-2">{comment.content}</p>

              {/* ✅ Always show buttons under each comment */}
              <div className="mt-2 flex gap-2">
                <Button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600/50 hover:border-slate-500 transition-all">
                  <Edit3 className="w-4 h-4" />
                </Button>

                <Button className="bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentComponent;
