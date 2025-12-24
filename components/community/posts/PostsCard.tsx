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
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { PostType } from "@/lib/types/post.types";

interface PostCardProps {
  post: PostType;
}

const PostsCard = ({ post }: PostCardProps) => {
  return (
    <div>
      <div className="bg-card border border-border rounded-2xl p-6 mt-2 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10 rounded-full">
              <AvatarImage src={post?.author?.avatar} />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-bold">
                {post.author?.username || post.author?.email}
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">
          {post.content}
        </p>
        <div className="h-64 bg-muted rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800"
            className="w-full h-full object-cover"
            alt="post"
          />
        </div>
        <div className="flex items-center gap-6 pt-2 border-t border-border">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
            <MessageSquare className="w-4 h-4" /> 24 Comments
          </button>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors">
            <Share2 className="w-4 h-4" /> 5 Shares
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
