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
import FeedsCard from "./FeedsCard";
import { FeedType } from "@/lib/types/feed.types";

export default function CommunityFeeds() {
  const { data: feeds } = useGetFeed();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto ">
        <div className="flex flex-col gap-4">
          {feeds?.map((post: any) => (
            <FeedsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
