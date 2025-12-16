"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Share2,
  MoreHorizontal,
  Pin,
  Heart,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FeedType } from "@/lib/types/feed.types";
import { formatDate } from "@/lib/utils";

interface FeedsCardProps {
  post: FeedType;
}

const FeedsCard = ({ post }: FeedsCardProps) => {
  // Generate a fallback initial for the avatar based on username string
  console.log("post", post);

  return (
    <div
      key={post.id}
      className="group bg-card rounded-xl border border-border hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-sm"
    >
      {/* Pinned Post Indicator (Optional - assuming data might have isPinned) */}
      {post?.isPinned && (
        <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-1.5 flex items-center gap-2">
          <Pin className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
          <span className="text-[11px] uppercase tracking-wide text-blue-400 font-bold">
            Pinned
          </span>
        </div>
      )}

      <div className="p-4 flex gap-3">
        {/* Left Side: Avatar */}
        <div className="flex-shrink-0">
          <Avatar className="w-10 h-10 ring-2 ring-transparent group-hover:ring-border transition-all cursor-pointer">
            {/* If you have an image URL in the future, use AvatarImage. For now, using Fallback with string author */}
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
              {post.author.username?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 min-w-0">
          {/* Header: Server Name & Meta Data */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-sm">
            {/* Server Badge Style */}
            <Link
              href={`/server/${post.server_id}`}
              className="flex items-center gap-1 group/link"
            >
              <span className="font-bold text-foreground hover:underline decoration-blue-500 underline-offset-4">
                c/{post.server}
              </span>
            </Link>

            <span className="text-muted-foreground text-xs">•</span>

            {/* Author & Time */}
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <span className="hover:text-foreground transition-colors cursor-pointer">
                u/{post.author.username}
              </span>
              <span>•</span>
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>

          {/* Post Content */}
          <Link href={`/post/${post.id}`} className="block">
            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
              {post.content}
            </p>
          </Link>

          {/* Action Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-6">
              {/* Like / Vote (Combined visual) */}
              <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors group/like">
                <Heart className="w-4 h-4 group-hover/like:fill-red-500/10" />
                <span className="text-xs font-medium">
                  {/* Assuming you might want to show vote count here */}
                  {post.likes || 0}
                </span>
              </button>

              {/* Comments */}
              <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-400 transition-colors group/comment">
                <MessageCircle className="w-4 h-4 group-hover/comment:fill-blue-400/10" />
                <span className="text-xs font-medium">
                  {post.comment_count}
                </span>
              </button>

              {/* Share */}
              <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* More Options */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedsCard;
