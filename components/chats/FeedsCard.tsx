"use client";

import React, { useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetFeed } from "@/lib/hooks/feed.hook";
import { FeedType } from "@/lib/types/feed.types";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface FeedsCardProps {
  post: FeedType;
}

const FeedsCard = ({ post }: FeedsCardProps) => {
  return (
    <Card key={post.id} className="hover:border-muted transition-colors">
      <div className="flex gap-2 p-3">
        {/* Vote Section */}

        <div className="flex-1 min-w-0">
          {/* Post Header */}
          <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 mb-2">
            <Link
              href={`/server/${post.server_id}`}
              className="font-bold text-zinc-900 dark:text-white hover:underline cursor-pointer"
            >
              <div className="flex ">
                <p className="text-muted-foreground">C/</p>
                <p>{post.server}</p>
              </div>
            </Link>
            <span>•</span>
            <span>Posted by u/{post.author}</span>
            <span>•</span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          {/* Post Content */}
          <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 line-clamp-3">
            {post.content}
          </p>

          {/* Post Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              {post.comment_count} Comments
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Bookmark className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeedsCard;
